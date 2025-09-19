import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { OptionType } from "src/model";

interface Props {
  selectedOptions: OptionType[];
  handleChipDelete: (option: OptionType) => void;
}

const MultiSelectChips: React.FC<Props> = ({
  selectedOptions,
  handleChipDelete,
}) => {
  // Qui abbiamo bisogno di un Box con display "contents" per fare in modo che i bottoni
  // vengano renderizzati come se fossero figli diretti del Box contenitore.
  // In questo modo, i bottoni si dispongono correttamente all'interno del TextField.
  return (
    <Box
      component="span"
      role="group"
      aria-label="Selected options"
      sx={{ display: "contents" }}
    >
      {selectedOptions.map((option) => (
        <Button
          key={option.id}
          variant="contained"
          size="small"
          endIcon={<CloseIcon sx={{ color: "action.main" }} />}
          onClick={() => handleChipDelete(option)}
          sx={{
            borderRadius: 8,
            alignItems: "center",
            backgroundColor: "#E8EBF1",
            color: "text.primary",
            height: 24,
            px: 1,
            "&:hover": {
              backgroundColor: "#D1D7E0",
            },
          }}
        >
          {option.label}
        </Button>
      ))}
    </Box>
  );
};

export default MultiSelectChips;
