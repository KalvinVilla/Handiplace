import { useRef, useCallback } from "react";

export function useHoverTimeout(callback: () => void, delay: number = 300) {
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = useCallback(() => {
    timeoutRef.current = window.setTimeout(callback, delay);
  }, [callback, delay]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return { handleMouseEnter, handleMouseLeave };
}
