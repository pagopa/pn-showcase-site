import {
  ArrowDropDown,
  ArrowDropUp,
  Cancel,
  Search,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  Paper,
  Popper,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  options: string[];
  label?: string;
  placeholder?: string;
  noResultsText?: string;
  hideArrow?: boolean;
  hasClearIcon?: boolean;
  avoidLocalFiltering?: boolean;
  emptyState?: ReactNode;
  sx?: SxProps<Theme>;
  renderValue?: (value: string, index: number) => React.ReactNode;
  onInputChange?: (value: string) => void;
  onSelect?: (value: string) => void;
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
  label = "Cerca Indirizzo",
  placeholder,
  noResultsText = "Nessun risultato",
  hideArrow = false,
  hasClearIcon = false,
  avoidLocalFiltering = false,
  emptyState,
  sx,
  renderValue,
  onInputChange,
  onSelect,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const listboxId = "autocomplete-listbox";
  const inputId = "autocomplete-input";

  const popperOpen = isOpen && !!inputValue;
  const filteredOptions =
    inputValue.trim() === "" || avoidLocalFiltering
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(inputValue.toLowerCase())
        );

  const handleInputBlur = () => {
    const focusingAnOption = activeIndex !== -1;
    const keepMenuOpen = isOpen && isIosDevice();
    if (!focusingAnOption && !keepMenuOpen) {
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    setActiveIndex(-1);
    onInputChange?.(e.target.value);
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
    onSelect?.(option);
  };

  const handleOptionMouseDown = (event: MouseEvent<HTMLLIElement>) => {
    // Safari triggers focusOut before click, but if you
    // preventDefault on mouseDown, you can stop that from happening.
    // If this is removed, clicking on an option in Safari will trigger
    // `handleOptionBlur`, which closes the menu, and the click will
    // trigger on the element underneath instead.
    // See: http://stackoverflow.com/questions/7621711/how-to-prevent-blur-running-when-clicking-a-link-in-jquery
    event.preventDefault();
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
    setIsOpen(false);
    setActiveIndex(-1);
    onInputChange?.("");
  };

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const getEndInputAdornment = () => {
    const showCloseIcon = hasClearIcon && inputValue;
    const showArrowIcon = inputValue && !hideArrow;

    return (
      <Box sx={{ gap: 1, cursor: "pointer" }}>
        {showCloseIcon && (
          <Box
            onClick={handleClearValue}
            onMouseDown={(e) => e.preventDefault()}
            aria-hidden="true"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Cancel fontSize="small" sx={{ color: "text.secondary" }} />
          </Box>
        )}
        {showArrowIcon && (
          <Box
            onClick={handleToggleOpen}
            aria-hidden="true"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
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

  return (
    <Box position="relative" width="100%" ref={containerRef} sx={sx}>
      <TextField
        fullWidth
        inputRef={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleInputBlur}
        label={label}
        placeholder={placeholder}
        variant="outlined"
        autoComplete="off"
        inputProps={{
          role: "combobox",
          id: inputId,
          "aria-expanded": popperOpen,
          "aria-controls": listboxId,
          "aria-autocomplete": "list",
          "aria-activedescendant":
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined,
        }}
        InputProps={{
          startAdornment: <Search />,
          endAdornment: getEndInputAdornment(),
        }}
      />

      <Popper
        open={!!(isOpen && inputValue)}
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
          <List
            id={listboxId}
            ref={listboxRef}
            role="listbox"
            aria-labelledby={inputId}
            sx={{ p: 0 }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <ListItem
                  key={index}
                  id={`${listboxId}-option-${index}`}
                  role="option"
                  tabIndex={-1}
                  aria-selected={index === activeIndex}
                  onClick={() => handleOptionSelect(option)}
                  onMouseOver={() => setActiveIndex(index)}
                  onMouseDown={handleOptionMouseDown}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      index === activeIndex
                        ? "rgba(0, 0, 0, 0.08)"
                        : "transparent",
                  }}
                  aria-posinset={index + 1}
                  aria-setsize={filteredOptions.length}
                >
                  {renderValue ? renderValue(option, index) : option}
                </ListItem>
              ))
            ) : (
              <ListItem role="option" sx={{ p: 0 }}>
                {emptyState || (
                  <Typography color="text.secondary">
                    {noResultsText}
                  </Typography>
                )}
              </ListItem>
            )}
          </List>
        </Paper>
      </Popper>
    </Box>
  );
};

export default MuiItaliaAutocomplete;
