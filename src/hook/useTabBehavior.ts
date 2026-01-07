import { Breakpoint, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useCallback, useRef, useState } from "react";

export const useTabBehavior = (
  initialTab = 0,
  breakpoint: Breakpoint = "lg",
  onTabChange?: (index: number) => void
) => {
  const [currentTab, setCurrentTab] = useState(initialTab);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(breakpoint));

  const handleChangeTab = useCallback(
    (newValue: number) => {
      setCurrentTab(newValue);
      setDropdownOpen(false);
      onTabChange?.(newValue);
      return newValue;
    },
    [onTabChange]
  );

  const handleToggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const handleCloseDropdown = useCallback((event: Event) => {
    if (anchorRef.current?.contains(event.target as HTMLElement)) {
      return;
    }
    setDropdownOpen(false);
  }, []);

  return {
    currentTab,
    dropdownOpen,
    anchorRef,
    isMobile,
    handleChangeTab,
    handleToggleDropdown,
    handleCloseDropdown,
  };
};
