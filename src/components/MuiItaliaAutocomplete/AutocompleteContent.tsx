import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import React, { MouseEvent } from "react";
import { OptionType } from "src/model";

type Props = {
  multiple: boolean;
  filteredOptions: OptionType[];
  selectedOptions?: OptionType[];
  inputValue?: string;
  isOptionSelected: (option: OptionType) => boolean;
  handleOptionSelect: (option: OptionType) => void;
  listboxId: string;
  listboxRef: React.RefObject<HTMLUListElement>;
  inputId: string;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  renderOption?: (option: OptionType, index: number) => React.ReactNode;
};

const AutocompleteContent: React.FC<Props> = ({
  multiple,
  filteredOptions,
  selectedOptions = [],
  inputValue = "",
  handleOptionSelect,
  listboxId,
  listboxRef,
  inputId,
  activeIndex,
  setActiveIndex,
  renderOption,
}) => {
  const handleOptionMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    // Safari triggers focusOut before click, but if you
    // preventDefault on mouseDown, you can stop that from happening.
    // If this is removed, clicking on an option in Safari will trigger
    // `handleOptionBlur`, which closes the menu, and the click will
    // trigger on the element underneath instead.
    // See: http://stackoverflow.com/questions/7621711/how-to-prevent-blur-running-when-clicking-a-link-in-jquery
    event.preventDefault();
  };

  const handleOptionClick = (
    event: MouseEvent<HTMLDivElement>,
    option: OptionType
  ) => {
    event.preventDefault();
    event.stopPropagation();
    handleOptionSelect(option);
  };

  const isOptionSelected = (option: OptionType) => {
    return multiple
      ? selectedOptions.some((selected) => selected.id === option.id)
      : inputValue === option.label;
  };

  return (
    <List
      id={listboxId}
      ref={listboxRef}
      role="listbox"
      aria-labelledby={inputId}
      sx={{ p: 0 }}
    >
      {filteredOptions.map((option, index) => (
        <ListItem
          key={option.id}
          disablePadding
          sx={{
            backgroundColor:
              index === activeIndex ? "rgba(0, 0, 0, 0.08)" : "transparent",
          }}
        >
          <ListItemButton
            id={`${listboxId}-option-${index}`}
            role="option"
            tabIndex={-1}
            aria-selected={isOptionSelected(option)}
            onClick={(event) => handleOptionClick(event, option)}
            onMouseOver={() => setActiveIndex(index)}
            onMouseDown={handleOptionMouseDown}
            aria-posinset={index + 1}
            aria-setsize={filteredOptions.length}
            sx={{
              py: 1,
              px: 2,
              cursor: "pointer",
              backgroundColor: isOptionSelected(option)
                ? "rgba(25, 118, 210, 0.08)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              ...(multiple && { pr: 6 }),
            }}
          >
            <ListItemText
              primary={
                renderOption ? renderOption(option, index) : option.label
              }
              sx={{ margin: 0 }}
            />
            {multiple && (
              <ListItemSecondaryAction>
                <Checkbox
                  checked={isOptionSelected(option)}
                  size="small"
                  sx={{ p: 0 }}
                />
              </ListItemSecondaryAction>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default AutocompleteContent;
