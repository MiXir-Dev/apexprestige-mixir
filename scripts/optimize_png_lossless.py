"""Recursively replace raster images in ``public`` with lossless WebP files.

The original image is removed only after cwebp successfully creates and the
script validates its replacement. SVG, ICO, GIF, and existing WebP files are
intentionally left unchanged.
"""

from __future__ import annotations

import argparse
from dataclasses import dataclass
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import time


SUPPORTED_EXTENSIONS = {".jpeg", ".jpg", ".png", ".tif", ".tiff"}
REPO_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_ROOT = REPO_ROOT / "public"


@dataclass(frozen=True)
class ConversionResult:
  source: Path
  destination: Path
  before_size: int
  after_size: int
  converted: bool
  error: str | None = None


def find_images(root: Path) -> list[Path]:
  """Return supported raster images below root in a stable order."""
  return sorted(
    path
    for path in root.rglob("*")
    if path.is_file() and path.suffix.lower() in SUPPORTED_EXTENSIONS
  )


def build_conversion_plan(images: list[Path]) -> tuple[dict[Path, Path], list[str]]:
  """Choose non-overwriting output names and report any remaining conflicts."""
  default_destinations: dict[Path, list[Path]] = {}
  for source in images:
    destination = source.with_suffix(".webp")
    default_destinations.setdefault(destination, []).append(source)

  plan: dict[Path, Path] = {}
  conflicts: list[str] = []
  reserved = {path for path in PUBLIC_ROOT.rglob("*.webp") if path.is_file()}

  for default_destination, sources in default_destinations.items():
    use_disambiguated_names = len(sources) > 1 or default_destination in reserved
    for source in sources:
      if use_disambiguated_names:
        extension = source.suffix.lower().removeprefix(".")
        destination = source.with_name(f"{source.stem}-{extension}.webp")
      else:
        destination = default_destination

      if destination in reserved:
        conflicts.append(
          f"{source} cannot become {destination}: destination already exists"
        )
        continue

      plan[source] = destination
      reserved.add(destination)

  return plan, conflicts


def is_webp(path: Path) -> bool:
  """Check the WebP RIFF signature without relying on the file extension."""
  with path.open("rb") as image_file:
    header = image_file.read(12)
  return (
    len(header) == 12
    and header[:4] == b"RIFF"
    and header[8:12] == b"WEBP"
  )


def describe_size_change(before_size: int, after_size: int) -> str:
  if before_size == 0 or before_size == after_size:
    return "same size"

  percentage = abs(before_size - after_size) / before_size * 100
  direction = "smaller" if after_size < before_size else "larger"
  return f"{percentage:.2f}% {direction}"


def convert_image(
  source: Path,
  destination: Path,
  cwebp: str,
  dry_run: bool,
) -> ConversionResult:
  before_size = source.stat().st_size
  temp_path: Path | None = None

  try:
    with tempfile.NamedTemporaryFile(
      dir=source.parent,
      prefix=f".{source.stem}-",
      suffix=".webp.tmp",
      delete=False,
    ) as temp_file:
      temp_path = Path(temp_file.name)

    process = subprocess.run(
      [
        cwebp,
        "-lossless",
        "-z",
        "9",
        "-exact",
        "-metadata",
        "all",
        "-quiet",
        str(source),
        "-o",
        str(temp_path),
      ],
      check=False,
      capture_output=True,
      text=True,
    )
    if process.returncode != 0:
      message = process.stderr.strip() or process.stdout.strip() or "cwebp failed"
      raise RuntimeError(message)

    if temp_path.stat().st_size == 0 or not is_webp(temp_path):
      raise RuntimeError("cwebp produced an invalid WebP file")

    after_size = temp_path.stat().st_size
    if dry_run:
      return ConversionResult(
        source=source,
        destination=destination,
        before_size=before_size,
        after_size=after_size,
        converted=True,
      )

    os.replace(temp_path, destination)
    temp_path = None
    source.unlink()
    return ConversionResult(
      source=source,
      destination=destination,
      before_size=before_size,
      after_size=after_size,
      converted=True,
    )
  except (OSError, RuntimeError) as exc:
    return ConversionResult(
      source=source,
      destination=destination,
      before_size=before_size,
      after_size=before_size,
      converted=False,
      error=str(exc),
    )
  finally:
    if temp_path is not None:
      temp_path.unlink(missing_ok=True)


def main() -> int:
  parser = argparse.ArgumentParser(
    description=(
      "Recursively replace supported images in public/ with lossless WebP files."
    )
  )
  parser.add_argument(
    "--dry-run",
    action="store_true",
    help="Encode and validate every image without changing public/.",
  )
  args = parser.parse_args()

  if not PUBLIC_ROOT.is_dir():
    print(f"Error: public directory does not exist: {PUBLIC_ROOT}", file=sys.stderr)
    return 1

  cwebp = shutil.which("cwebp")
  if cwebp is None:
    print(
      "Error: cwebp is required but was not found in PATH. "
      "Install the WebP command-line tools first.",
      file=sys.stderr,
    )
    return 1

  images = find_images(PUBLIC_ROOT)
  if not images:
    print(f"No convertible images found in {PUBLIC_ROOT}")
    return 0

  plan, conflicts = build_conversion_plan(images)
  if conflicts:
    print("Error: no files were changed because output names conflict:", file=sys.stderr)
    for conflict in conflicts:
      print(f"  - {conflict}", file=sys.stderr)
    print(
      "Rename or remove the conflicting source files, then run the script again.",
      file=sys.stderr,
    )
    return 1

  total_before = 0
  total_after = 0
  converted_count = 0
  error_count = 0

  for index, source in enumerate(images, start=1):
    relative_source = source.relative_to(REPO_ROOT)
    destination = plan[source]
    relative_destination = destination.relative_to(REPO_ROOT)
    print(f"[{index}/{len(images)}] {relative_source} -> {relative_destination}", flush=True)
    started = time.perf_counter()
    result = convert_image(
      source,
      destination=destination,
      cwebp=cwebp,
      dry_run=args.dry_run,
    )
    elapsed = time.perf_counter() - started
    total_before += result.before_size
    total_after += result.after_size

    if result.error:
      error_count += 1
      print(f"  ERROR: {result.error} ({elapsed:.2f}s)")
      continue

    converted_count += 1
    action = "WOULD CONVERT" if args.dry_run else "CONVERTED"
    print(
      f"  {action}: {result.before_size} -> {result.after_size} bytes "
      f"({describe_size_change(result.before_size, result.after_size)}) "
      f"({elapsed:.2f}s)"
    )

  mode = "DRY RUN" if args.dry_run else "DONE"
  print()
  print(
    f"{mode}: scanned={len(images)}, converted={converted_count}, "
    f"errors={error_count}"
  )
  print(
    f"Total bytes: {total_before} -> {total_after} "
    f"({describe_size_change(total_before, total_after)})"
  )

  return 1 if error_count else 0


if __name__ == "__main__":
  raise SystemExit(main())
