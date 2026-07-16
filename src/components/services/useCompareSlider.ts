import type React from "react";
import { useEffect, useRef, useState } from "react";

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
};

export const useCompareSlider = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number, shouldDrag: boolean) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const newValue = clamp((offsetX / rect.width) * 100, 0, 100);

    setSliderValue(newValue);
    setIsDragging(shouldDrag);
  };

  const handleInteractionStart = (clientX: number) =>
    updateFromClientX(clientX, true);
  const handleInteractionMove = (clientX: number) => {
    if (!isDragging) return;
    updateFromClientX(clientX, true);
  };
  const handleInteractionEnd = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (event: MouseEvent) =>
      handleInteractionMove(event.clientX);
    const handleTouchMove = (event: TouchEvent) =>
      handleInteractionMove(event.touches[0].clientX);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleInteractionEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleInteractionEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleInteractionEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleInteractionEnd);
    };
  }, [isDragging]);

  return {
    containerRef,
    sliderValue,
    isDragging,
    handleMouseDown: (event: React.MouseEvent) =>
      handleInteractionStart(event.clientX),
    handleTouchStart: (event: React.TouchEvent) =>
      handleInteractionStart(event.touches[0].clientX),
  };
};
