"""Lossless PNG optimizer for recursively compressing files in place."""

from __future__ import annotations

import argparse
import binascii
import os
from dataclasses import dataclass
from pathlib import Path
import struct
import sys
import tempfile
import time
import zlib

PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"
IDAT = b"IDAT"
IEND = b"IEND"


@dataclass
class OptimizeResult:
  path: Path
  before_size: int
  after_size: int
  changed: bool
  error: str | None = None


def parse_chunks(png_bytes: bytes) -> list[tuple[bytes, bytes]]:
  if not png_bytes.startswith(PNG_SIGNATURE):
    raise ValueError("Not a PNG file (invalid signature).")

  offset = len(PNG_SIGNATURE)
  chunks: list[tuple[bytes, bytes]] = []

  while offset < len(png_bytes):
    if offset + 8 > len(png_bytes):
      raise ValueError("Corrupt PNG: truncated chunk header.")

    length = struct.unpack(">I", png_bytes[offset : offset + 4])[0]
    chunk_type = png_bytes[offset + 4 : offset + 8]
    data_start = offset + 8
    data_end = data_start + length
    crc_start = data_end
    crc_end = crc_start + 4

    if crc_end > len(png_bytes):
      raise ValueError("Corrupt PNG: truncated chunk data.")

    payload = png_bytes[data_start:data_end]
    expected_crc = struct.unpack(">I", png_bytes[crc_start:crc_end])[0]
    actual_crc = binascii.crc32(chunk_type)
    actual_crc = binascii.crc32(payload, actual_crc) & 0xFFFFFFFF

    if expected_crc != actual_crc:
      raise ValueError(f"Corrupt PNG: CRC mismatch in chunk {chunk_type!r}.")

    chunks.append((chunk_type, payload))
    offset = crc_end

    if chunk_type == IEND:
      break

  if not chunks or chunks[-1][0] != IEND:
    raise ValueError("Corrupt PNG: missing IEND chunk.")

  return chunks


def encode_chunks(chunks: list[tuple[bytes, bytes]]) -> bytes:
  out = bytearray(PNG_SIGNATURE)
  for chunk_type, payload in chunks:
    out.extend(struct.pack(">I", len(payload)))
    out.extend(chunk_type)
    out.extend(payload)
    crc = binascii.crc32(chunk_type)
    crc = binascii.crc32(payload, crc) & 0xFFFFFFFF
    out.extend(struct.pack(">I", crc))
  return bytes(out)


def recompress_idat(idat_data: bytes, thorough: bool) -> bytes:
  raw_data = zlib.decompress(idat_data)
  best = idat_data

  passes: list[tuple[int, int]] = [
    (9, zlib.Z_DEFAULT_STRATEGY),
    (9, zlib.Z_FILTERED),
  ]
  if thorough:
    passes.extend(
      [
        (8, zlib.Z_DEFAULT_STRATEGY),
        (8, zlib.Z_FILTERED),
        (9, zlib.Z_HUFFMAN_ONLY),
        (9, zlib.Z_RLE),
      ]
    )

  for mem_level, strategy in passes:
    compressor = zlib.compressobj(
      level=zlib.Z_BEST_COMPRESSION,
      method=zlib.DEFLATED,
      wbits=15,
      memLevel=mem_level,
      strategy=strategy,
    )
    candidate = compressor.compress(raw_data) + compressor.flush()
    if len(candidate) < len(best):
      best = candidate

  return best


def optimize_png(path: Path, dry_run: bool, thorough: bool) -> OptimizeResult:
  original = path.read_bytes()
  before_size = len(original)

  try:
    chunks = parse_chunks(original)
    idat_payload = b"".join(payload for chunk_type, payload in chunks if chunk_type == IDAT)
    if not idat_payload:
      raise ValueError("PNG has no IDAT chunk.")

    optimized_idat = recompress_idat(idat_payload, thorough=thorough)
    if len(optimized_idat) >= len(idat_payload):
      return OptimizeResult(path=path, before_size=before_size, after_size=before_size, changed=False)

    new_chunks: list[tuple[bytes, bytes]] = []
    wrote_idat = False
    for chunk_type, payload in chunks:
      if chunk_type == IDAT:
        if not wrote_idat:
          new_chunks.append((IDAT, optimized_idat))
          wrote_idat = True
      else:
        new_chunks.append((chunk_type, payload))

    optimized = encode_chunks(new_chunks)
    after_size = len(optimized)
    if after_size >= before_size:
      return OptimizeResult(path=path, before_size=before_size, after_size=before_size, changed=False)

    if not dry_run:
      with tempfile.NamedTemporaryFile(dir=path.parent, delete=False, suffix=".png") as tmp:
        tmp.write(optimized)
        tmp_path = Path(tmp.name)
      os.replace(tmp_path, path)

    return OptimizeResult(path=path, before_size=before_size, after_size=after_size, changed=True)
  except Exception as exc:  # noqa: BLE001
    return OptimizeResult(
      path=path,
      before_size=before_size,
      after_size=before_size,
      changed=False,
      error=str(exc),
    )


def find_png_files(root: Path) -> list[Path]:
  return sorted(
    file_path
    for file_path in root.rglob("*")
    if file_path.is_file() and file_path.suffix.lower() == ".png"
  )


def main() -> int:
  parser = argparse.ArgumentParser(
    description="Recursively apply lossless PNG optimization in place."
  )
  parser.add_argument(
    "--root",
    default="public",
    help="Directory to scan recursively (default: public).",
  )
  parser.add_argument(
    "--dry-run",
    action="store_true",
    help="Show what would change without writing files.",
  )
  parser.add_argument(
    "--thorough",
    action="store_true",
    help="Try additional compression strategies (slower, sometimes smaller).",
  )
  args = parser.parse_args()

  requested_root = Path(args.root)
  if requested_root.is_absolute():
    root = requested_root
  else:
    cwd_root = (Path.cwd() / requested_root).resolve()
    repo_root = (Path(__file__).resolve().parent.parent / requested_root).resolve()
    root = cwd_root if cwd_root.exists() else repo_root

  if not root.exists() or not root.is_dir():
    print(f"Error: directory does not exist: {root}", file=sys.stderr)
    return 1

  png_files = find_png_files(root)
  if not png_files:
    print(f"No PNG files found in {root}")
    return 0

  total_before = 0
  total_after = 0
  changed_count = 0
  error_count = 0

  for index, png_file in enumerate(png_files, start=1):
    print(f"[{index}/{len(png_files)}] Processing {png_file}...", flush=True)
    started = time.perf_counter()
    result = optimize_png(png_file, dry_run=args.dry_run, thorough=args.thorough)
    elapsed = time.perf_counter() - started
    total_before += result.before_size
    total_after += result.after_size

    if result.error:
      error_count += 1
      print(f"ERROR  {png_file}: {result.error} ({elapsed:.2f}s)")
      continue

    if result.changed:
      changed_count += 1
      saved = result.before_size - result.after_size
      pct = (saved / result.before_size * 100) if result.before_size else 0.0
      action = "WOULD OPTIMIZE" if args.dry_run else "OPTIMIZED"
      print(f"{action}  {png_file}  -{saved} bytes ({pct:.2f}%) ({elapsed:.2f}s)")
    else:
      print(f"UNCHANGED  {png_file} ({elapsed:.2f}s)")

  total_saved = total_before - total_after
  total_pct = (total_saved / total_before * 100) if total_before else 0.0
  mode = "DRY RUN" if args.dry_run else "DONE"

  print()
  print(f"{mode}: scanned={len(png_files)}, optimized={changed_count}, errors={error_count}")
  print(f"Total bytes: {total_before} -> {total_after} (saved {total_saved}, {total_pct:.2f}%)")

  return 1 if error_count else 0


if __name__ == "__main__":
  raise SystemExit(main())
