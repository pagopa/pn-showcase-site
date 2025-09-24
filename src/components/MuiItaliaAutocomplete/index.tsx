import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Search,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { useEffect, useRef, useState } from "react";
import { OptionType } from "src/model";
import { useTranslation } from "../../hook/useTranslation";
import AutocompleteContent from "./AutocompleteContent";
import MultiSelectChips from "./MultiSelectChips";
import { MuiItaliaAutocompleteProps } from "./types";
import { isIosDevice } from "./utils";

const MuiItaliaAutocomplete = ({
  options,
  label,
  placeholder,
  multiple = false,
  hideArrow = false,
  hasClearIcon = false,
  avoidLocalFiltering = false,
  noResultsText = "Nessun risultato",
  sx,
  inputStyle,
  slots = {},
  slotProps = {},
  overridenInputvalue,
  renderOption,
  onInputChange,
  onSelect,
  setInputValueOnSelect,
}: MuiItaliaAutocompleteProps) => {
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

  const {
    startIcon: StartIcon = Search,
    clearIcon: ClearIcon = Close,
    expandIcon: ExpandIcon = KeyboardArrowDown,
    collapseIcon: CollapseIcon = KeyboardArrowUp,
    emptyState: EmptyState,
  } = slots;

  const {
    startIcon: startIconProps = {},
    clearIcon: clearIconProps = {},
    expandIcon: expandIconProps = {},
    collapseIcon: collapseIconProps = {},
    emptyState: emptyStateProps = {},
    input: inputProps = {},
  } = slotProps;

  const filteredOptions =
    inputValue.trim() === "" || avoidLocalFiltering
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        );

  const handleInputBlur = () => {
    const focusingAnOption = activeIndex !== -1;
    const keepMenuOpen = isOpen && isIosDevice();
    if (!focusingAnOption && !keepMenuOpen) {
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

  const handleToggleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const getStartInputAdornment = () => {
    return (
      <>
        <StartIcon
          sx={{ color: "text.secondary", ...startIconProps.sx }}
          {...startIconProps}
        />
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
      <Box
        sx={{
          cursor: "pointer",
          position: "absolute",
          right: 12,
          top: 12,
        }}
      >
        {showCloseIcon && (
          <IconButton
            size="small"
            onClick={handleClearValue}
            onMouseDown={(e) => e.preventDefault()}
            aria-label={t("clear_text_aria_label")}
          >
            <ClearIcon
              fontSize="small"
              sx={{ color: "text.secondary", ...clearIconProps.sx }}
              {...clearIconProps}
            />
          </IconButton>
        )}
        {showArrowIcon && (
          <IconButton
            size="small"
            onClick={handleToggleOpen}
            aria-hidden="true"
            sx={{ padding: 0.5, color: "text.secondary" }}
          >
            {isOpen ? (
              <CollapseIcon {...collapseIconProps} />
            ) : (
              <ExpandIcon {...expandIconProps} />
            )}
          </IconButton>
        )}
      </Box>
    );
  };

  const renderEmptyState = () => {
    if (EmptyState) {
      return <EmptyState {...emptyStateProps} />;
    }
    return (
      <Box sx={{ p: 2 }}>
        <Typography color="text.secondary">{noResultsText}</Typography>
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
            paddingRight: hasClearIcon || !hideArrow ? "50px" : "12px",
            borderRadius: "8px",
            borderWidth: "2px",
            position: "relative",
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
            renderEmptyState()
          )}
        </Paper>
      </Popper>
    </Box>
  );
};

export default MuiItaliaAutocomplete;
