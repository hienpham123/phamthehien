// Color constants
export const COLORS = {
  primary: "#00ff00",
  primaryGreen: "#B3F1AA",
  lightGreen: "#B9F7A5",
  darkGreen: "#004400",
  black: "#000000",
  white: "#FFFFFF",
  offWhite: "#E8E8E5",
  gray: {
    50: "#F5F5F5",
    100: "#E8E8E8",
    200: "#D8D8D8",
    300: "#C0C0C0",
    400: "#A0A0A0",
    500: "#808080",
    600: "#606060",
    700: "#404040",
    800: "#202020",
    900: "#101010",
  },
} as const;

// Animation durations
export const DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  verySlow: 1.2,
} as const;

// Easing functions
export const EASINGS = {
  smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  easeInOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

