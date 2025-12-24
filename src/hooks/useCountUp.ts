import { useState, useEffect, useRef } from "react";

interface UseCountUpOptions {
  duration?: number;
  start?: number;
  end: number;
  suffix?: string;
  enabled?: boolean;
}

export function useCountUp({
  duration = 2000,
  start = 0,
  end,
  suffix = "",
  enabled = true,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isCounting, setIsCounting] = useState(false);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    if (!enabled) {
      setCount(end);
      return;
    }

    setIsCounting(true);
    startTimeRef.current = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - (startTimeRef.current || now);
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(start + (end - start) * easeOut);

      setCount(currentCount);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setIsCounting(false);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [enabled, start, end, duration]);

  return `${count}${suffix}`;
}

