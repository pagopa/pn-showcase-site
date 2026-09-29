import CheckIcon from "@mui/icons-material/Check";
import { Box, SxProps, Theme } from "@mui/material";
import { dashboardColors } from "./colors";

/**
 * Shared styling for the dashboard filter `<Select>`s (tipologia ente, andamento notifiche, mappa). Fixes the accessibility issues reported on the "SEND in numeri" page (ticket A2-460 / WCAG 1.4.1, 1.4.3, 1.4.11):
 * - the resting outline of the field now has >= 3:1 contrast on white;
 * - the selected menu item is identified by a check icon + bold weight, not by
 *   a low-contrast translucent background alone.
 */

export const filterMenuProps = {
  autoFocus: false,
  disableAutoFocusItem: true,
  disableEnforceFocus: true,
  disableAutoFocus: true,
} as const;

export const filterSelectSx: SxProps<Theme> = {
  fontSize: 14,
  // The selected-option check is a cue for the open list only; hide it in the
  // closed field, where MUI echoes the selected `<MenuItem>`'s content.
  "& .MuiSelect-select [data-selected-check]": {
    display: "none",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: dashboardColors.get("grey-700"),
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: dashboardColors.get("blue-io"),
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: dashboardColors.get("blue-io"),
  },
};

export const filterMenuItemSx: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  "&.Mui-selected": {
    color: dashboardColors.get("blue-io"),
    fontWeight: 600,
    backgroundColor: dashboardColors.get("blue-io-50"),
  },
  "&.Mui-selected:hover": {
    backgroundColor: dashboardColors.get("blue-io-100"),
  },
};

/**
 * Non-colour cue for the selected option inside a filter dropdown. Render it as
 * the last child of a selected `<MenuItem>`. Decorative for screen readers: the
 * selected state is already exposed natively via `aria-selected`.
 */
export const SelectedCheck = () => (
  <Box
    component={CheckIcon}
    aria-hidden
    data-selected-check=""
    sx={{
      fontSize: 18,
      flexShrink: 0,
      color: dashboardColors.get("blue-io"),
    }}
  />
);
