import { ArrowDropDown, ArrowDropUp, Search } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface Props {
  options: string[];
  label?: string;
  placeholder?: string;
  noResultsText?: string;
  renderValue?: (value: string) => React.ReactNode;
  hideArrow?: boolean;
  sx?: {
    [key: string]: any;
  };
}

const MuiItaliaAutocomplete = ({
  options,
  label = "Cerca Indirizzo",
  placeholder = "Cerca un indirizzo",
  noResultsText = "Nessun risultato",
  renderValue,
  hideArrow = false,
  sx,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const listboxId = "autocomplete-listbox";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsOpen(true);
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredOptions.length === 0) return;

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

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredOptions([]);
      return;
    }

    const filtered = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);

    setActiveIndex(-1);
  }, [inputValue, options]);

  useEffect(() => {
    if (isOpen && activeIndex >= 0 && listboxRef.current) {
      const optionElement = listboxRef.current.querySelector(
        `#option-${activeIndex}`
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
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        label={label}
        placeholder={placeholder}
        variant="outlined"
        autoComplete="off"
        inputProps={{
          role: "combobox",
          id: "autocomplete-input",
          "aria-expanded": isOpen ? "true" : "false",
          "aria-controls": listboxId,
          "aria-autocomplete": "list",
        }}
        InputProps={{
          startAdornment: <Search />,
          endAdornment: inputValue && !hideArrow && (
            <Box
              onClick={() => setIsOpen((prev) => !prev)}
              sx={{ cursor: "pointer" }}
              aria-hidden="true"
            >
              {isOpen ? <ArrowDropUp /> : <ArrowDropDown />}
            </Box>
          ),
        }}
      />

      <Popper
        open={!!(isOpen && inputValue)}
        anchorEl={containerRef.current}
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
        style={{
          zIndex: 1300,
        }}
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
            aria-labelledby="autocomplete-input"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <ListItem
                  key={index}
                  id={`option-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={() => handleOptionSelect(option)}
                  onMouseOver={() => setActiveIndex(index)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      index === activeIndex
                        ? "rgba(0, 0, 0, 0.04)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                    },
                  }}
                  aria-posinset={index + 1}
                  aria-setsize={filteredOptions.length}
                >
                  {renderValue ? (
                    renderValue(option)
                  ) : (
                    <Typography variant="body2">{option}</Typography>
                  )}
                </ListItem>
              ))
            ) : (
              <ListItem>
                <Typography color="text.secondary">{noResultsText}</Typography>
              </ListItem>
            )}
          </List>
        </Paper>
      </Popper>
    </Box>
  );
};

export default MuiItaliaAutocomplete;
