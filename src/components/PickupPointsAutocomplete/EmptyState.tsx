import { LocationOff } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

const EmptyState = () => {
  return (
    <Stack
      spacing={1}
      direction="column"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={3}
      textAlign="center"
      width="100%"
      sx={{
        backgroundColor: "#F5F5F5",
      }}
    >
      <LocationOff sx={{ color: "text.secondary" }} />
      <Typography fontWeight={600} fontSize="18px" color="textSecondary">
        Nessuna corrispondenza trovata
      </Typography>
      <Typography
        color="textSecondary"
        variant="body1"
        fontSize="16px"
        fontWeight={400}
      >
        Prova a modificare la tua ricerca cambiando l’indirizzo o città.
      </Typography>
    </Stack>
  );
};

export default EmptyState;
