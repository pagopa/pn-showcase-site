import {
  OutlinedInputProps,
  SvgIconProps,
  SxProps,
  Theme,
} from "@mui/material";
import { ComponentType, ReactNode } from "react";
import { OptionType } from "src/model";

interface AutocompleteSlots {
  startIcon?: ComponentType<SvgIconProps>;
  endIcon?: ComponentType<SvgIconProps>;
  clearIcon?: ComponentType<SvgIconProps>;
  expandIcon?: ComponentType<SvgIconProps>;
  collapseIcon?: ComponentType<SvgIconProps>;
  emptyState?: ComponentType;
  loadingSkeleton?: ComponentType;
}

interface AutocompleteSlotProps {
  startIcon?: SvgIconProps;
  endIcon?: SvgIconProps;
  clearIcon?: SvgIconProps;
  expandIcon?: SvgIconProps;
  collapseIcon?: SvgIconProps;
  emptyState?: Record<string, any>;
  input?: Partial<OutlinedInputProps>;
  loadingSkeleton?: Record<string, any>;
}

export interface MuiItaliaAutocompleteProps {
  options: OptionType[];
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  hideArrow?: boolean;
  hasClearIcon?: boolean;
  avoidLocalFiltering?: boolean;
  noResultsText?: string;
  disabled?: boolean;
  required?: boolean;
  loading?: boolean;
  sx?: SxProps<Theme>;
  inputStyle?: SxProps<Theme>;
  slots?: AutocompleteSlots;
  slotProps?: AutocompleteSlotProps;
  overridenInputvalue?: string;
  renderOption?: (value: OptionType, index: number) => ReactNode;
  onInputChange?: (value: string) => void;
  onSelect?: (value: OptionType | OptionType[]) => void;
  setInputValueOnSelect?: (option: OptionType) => string | null;
}
