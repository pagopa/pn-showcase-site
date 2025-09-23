import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Search,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  OutlinedInputProps,
  Paper,
  Popper,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { ReactNode, useEffect, useRef, useState } from "react";
import { OptionType } from "src/model";
import { useTranslation } from "../../hook/useTranslation";
import AutocompleteContent from "./AutocompleteContent";
import MultiSelectChips from "./MultiSelectChips";

interface Props {
  options: Array<OptionType>;
  label?: string;
  placeholder?: string;
  noResultsText?: string;
  hideArrow?: boolean;
  hasClearIcon?: boolean;
  avoidLocalFiltering?: boolean;
  emptyState?: ReactNode;
  multiple?: boolean;
  sx?: SxProps<Theme>;
  inputStyle?: SxProps<Theme>;
  inputProps?: Partial<OutlinedInputProps>;
  overridenInputvalue?: string;
  renderOption?: (value: OptionType, index: number) => React.ReactNode;
  onInputChange?: (value: string) => void;
  onSelect?: (value: OptionType | OptionType[]) => void;
  setInputValueOnSelect?: (option: OptionType) => string | null;
}

function isIosDevice() {
  return (
    typeof navigator !== "undefined" &&
    !!(
      navigator.userAgent.match(/(iPod|iPhone|iPad)/g) &&
      navigator.userAgent.match(/AppleWebKit/g)
    )
  );
}

const MuiItaliaAutocomplete = ({
  options,
  label,
  placeholder,
  noResultsText = "Nessun risultato",
  hideArrow = false,
  hasClearIcon = false,
  avoidLocalFiltering = false,
  emptyState,
  multiple = false,
  sx,
  inputStyle,
  inputProps,
  overridenInputvalue,
  renderOption,
  onInputChange,
  onSelect,
  setInputValueOnSelect,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>(
    overridenInputvalue || ""
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const { t } = useTranslation(["common"]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const listboxId = "autocomplete-listbox";
  const inputId = "autocomplete-input";

  const filteredOptions =
    inputValue.trim() === "" || avoidLocalFiltering
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );

  const handleInputBlur = () => {
    const keepMenuOpen = isOpen && isIosDevice();
    if (!keepMenuOpen) {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
    onInputChange?.(e.target.value);
  };

  const handleOptionSelect = (option: OptionType) => {
    if (multiple) {
      const isAlreadySelected = selectedOptions.some(
        (selected) => selected.id === option.id
      );

      let newSelectedOptions: OptionType[];
      if (isAlreadySelected) {
        newSelectedOptions = selectedOptions.filter(
          (selected) => selected.id !== option.id
        );
      } else {
        newSelectedOptions = [...selectedOptions, option];
      }

      setSelectedOptions(newSelectedOptions);
      setInputValue("");
      setActiveIndex(-1);
      onSelect?.(newSelectedOptions);
    } else {
      setInputFocus(false);
      setActiveIndex(-1);
      onSelect?.(option);

      if (setInputValueOnSelect) {
        const newValue = setInputValueOnSelect(option);
        if (newValue !== null) {
          setInputValue(newValue);
        }
      } else {
        setInputValue(option.label);
      }
    }
  };

  const handleChipDelete = (optionToRemove: OptionType) => {
    const newSelectedOptions = selectedOptions.filter(
      (option) => option.id !== optionToRemove.id
    );
    setSelectedOptions(newSelectedOptions);
    onSelect?.(newSelectedOptions);
  };

  const setInputFocus = (open: boolean = true) => {
    inputRef.current?.focus();
    setIsOpen(open);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredOptions.length === 0) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;

      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && filteredOptions[activeIndex]) {
          handleOptionSelect(filteredOptions[activeIndex]);
        }
        break;

      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        break;

      default:
        break;
    }
  };

  const handleClearValue = () => {
    setInputValue("");
    if (multiple) {
      setSelectedOptions([]);
      onSelect?.([]);
    }
    setIsOpen(false);
    setActiveIndex(-1);
    onInputChange?.("");
  };

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const getStartInputAdornment = () => {
    return (
      <>
        <Search sx={{ color: "text.secondary" }} />
        {multiple && selectedOptions.length > 0 && (
          <MultiSelectChips
            selectedOptions={selectedOptions}
            handleChipDelete={handleChipDelete}
          />
        )}
      </>
    );
  };

  const getEndInputAdornment = () => {
    const showCloseIcon = hasClearIcon && inputValue;
    const showArrowIcon = !showCloseIcon && !hideArrow;

    return (
      <Box sx={{ gap: 1, cursor: "pointer" }}>
        {showCloseIcon && (
          <IconButton
            size="small"
            onClick={handleClearValue}
            onMouseDown={(e) => e.preventDefault()}
            aria-label={t("clear_text_aria_label")}
          >
            <Close fontSize="small" sx={{ color: "text.secondary" }} />
          </IconButton>
        )}
        {showArrowIcon && (
          <Box
            onClick={handleToggleOpen}
            aria-hidden="true"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </Box>
        )}
      </Box>
    );
  };

  useEffect(() => {
    if (isOpen && activeIndex >= 0 && listboxRef.current) {
      const optionElement = listboxRef.current.querySelector(
        `#${listboxId}-option-${activeIndex}`
      );
      optionElement?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, isOpen]);

  useEffect(() => {
    if (overridenInputvalue !== undefined) {
      setInputValue(overridenInputvalue);
    }
  }, [overridenInputvalue]);

  return (
    <Box position="relative" width="100%" ref={containerRef} sx={sx}>
      <TextField
        fullWidth
        inputRef={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => setInputFocus(true)}
        onKeyDown={handleKeyDown}
        onBlur={handleInputBlur}
        label={label}
        placeholder={multiple && selectedOptions.length > 0 ? "" : placeholder}
        variant="outlined"
        autoComplete="off"
        inputProps={{
          role: "combobox",
          id: inputId,
          "aria-expanded": isOpen,
          "aria-controls": listboxId,
          "aria-autocomplete": "list",
          "aria-activedescendant":
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined,
          "aria-haspopup": "listbox",
        }}
        InputProps={{
          startAdornment: getStartInputAdornment(),
          endAdornment: getEndInputAdornment(),
          ...inputProps,
        }}
        sx={{
          "& .MuiInputBase-root": {
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
            p: "12px",
            borderRadius: "8px",
            borderWidth: "2px",
          },
          "& .MuiInputBase-input": {
            flex: "1 1 60px",
            margin: "8px 0",
            minWidth: "30px",
            padding: 0,
            boxSizing: "border-box",
          },
          ...inputStyle,
        }}
      />

      <Box aria-live="polite" sx={visuallyHidden}>
        {selectedOptions.length > 0 &&
          `${selectedOptions.map((opt) => opt.label).join(", ")} selected`}
      </Box>

      <Popper
        open={isOpen}
        anchorEl={containerRef.current}
        keepMounted
        placement="bottom-start"
        modifiers={[
          {
            name: "sameWidth",
            enabled: true,
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn: ({ state }) => {
              state.styles.popper.width = `${state.rects.reference.width}px`;
            },
          },
        ]}
        style={{ zIndex: 1300 }}
        role="presentation"
      >
        <Paper
          elevation={4}
          variant="elevation"
          sx={{
            maxHeight: "240px",
            overflowY: "auto",
            my: 1,
          }}
        >
          {filteredOptions.length > 0 ? (
            <AutocompleteContent
              multiple={multiple}
              filteredOptions={filteredOptions}
              selectedOptions={selectedOptions}
              isOptionSelected={() => false}
              handleOptionSelect={handleOptionSelect}
              listboxId={listboxId}
              listboxRef={listboxRef}
              inputId={inputId}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              renderOption={renderOption}
            />
          ) : (
            <Box sx={{ p: 0 }}>
              {emptyState || (
                <Typography color="text.secondary">{noResultsText}</Typography>
              )}
            </Box>
          )}
        </Paper>
      </Popper>
    </Box>
  );
};

export default MuiItaliaAutocomplete;
