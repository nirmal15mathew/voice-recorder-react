import { useRef, useEffect, useCallback } from 'react';

export function useLongPress(
  callback: () => void,
  ms: number = 500
): {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
} {
  const timerRef = useRef<number | null>(null);

  const clear = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const start = useCallback(() => {
    clear();
    timerRef.current = window.setTimeout(() => {
      callback();
    }, ms);
  }, [callback, ms]);

  useEffect(() => clear, []);

  return {
    onMouseDown: start,
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchStart: start,
    onTouchEnd: clear,
  };
}
