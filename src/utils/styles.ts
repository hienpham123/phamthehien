// GPU optimization styles
export const gpuOptimized = {
  willChange: "transform" as const,
  transform: "translate3d(0, 0, 0)",
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
};

export const gpuOptimizedOpacity = {
  willChange: "transform, opacity" as const,
  transform: "translate3d(0, 0, 0)",
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const,
};

// Common container styles
export const containerStyles = {
  contain: "layout style paint" as const,
};

// Cursor component style
export const cursorStyle = {
  display: "inline-block",
  marginLeft: "2px",
  width: "2px",
  height: "1em",
  verticalAlign: "middle" as const,
};

