import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

/**
 * Checks if we are on a mobile device
 */
export const useIsMobile = (breakpoint: Breakpoint | number = 'lg') => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
};