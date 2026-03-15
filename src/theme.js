// Theme utilities based on tweakcn design system

export const colors = {
  primary: "oklch(0.6083 0.0623 44.3588)",
  primaryForeground: "oklch(1.0000 0 0)",
  secondary: "oklch(0.7473 0.0387 80.5476)",
  secondaryForeground: "oklch(1.0000 0 0)",
  muted: "oklch(0.8502 0.0389 49.0874)",
  mutedForeground: "oklch(0.5416 0.0512 37.2132)",
  border: "oklch(0.7473 0.0387 80.5476)",
  destructive: "oklch(0.6875 0.1420 21.4566)",
  destructiveForeground: "oklch(0.2721 0.0141 48.1783)",
  background: "oklch(0.9529 0.0146 102.4597)",
  foreground: "oklch(0.4063 0.0255 40.3627)",
  card: "oklch(0.9529 0.0146 102.4597)",
  accent: "oklch(0.8502 0.0389 49.0874)",
  accentForeground: "oklch(0.4063 0.0255 40.3627)",
  warning: "oklch(0.7272 0.0539 52.3320)",
  success: "oklch(0.6083 0.0623 44.3588)",
};

export const shadows = {
  sm: "2px 2px 0px 0px hsl(20 18% 51% / 0.11), 2px 1px 2px -1px hsl(20 18% 51% / 0.11)",
  md: "2px 2px 0px 0px hsl(20 18% 51% / 0.11), 2px 2px 4px -1px hsl(20 18% 51% / 0.11)",
  lg: "2px 2px 0px 0px hsl(20 18% 51% / 0.11), 2px 4px 6px -1px hsl(20 18% 51% / 0.11)",
};

export const radius = {
  sm: "calc(0.5rem - 4px)",
  md: "calc(0.5rem - 2px)",
  lg: "0.5rem",
};

export const baseInput = {
  padding: "12px",
  border: `1px solid ${colors.border}`,
  borderRadius: radius.md,
  fontSize: "16px",
  backgroundColor: colors.card,
  color: colors.foreground,
  outline: "none",
  transition: "all 0.2s",
};

export const baseButton = {
  padding: "12px 24px",
  border: "none",
  borderRadius: radius.md,
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s",
  boxShadow: shadows.sm,
};

export const primaryButton = {
  ...baseButton,
  backgroundColor: colors.primary,
  color: colors.primaryForeground,
};

export const secondaryButton = {
  ...baseButton,
  backgroundColor: colors.secondary,
  color: colors.secondaryForeground,
};

export const destructiveButton = {
  ...baseButton,
  backgroundColor: colors.destructive,
  color: colors.destructiveForeground,
};

export const card = {
  backgroundColor: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: radius.lg,
  boxShadow: shadows.sm,
  padding: "16px",
};
