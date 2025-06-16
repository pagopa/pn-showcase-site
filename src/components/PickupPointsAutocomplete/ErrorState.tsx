import { WarningAmber } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";

const ErrorState = () => {
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
      <WarningAmber sx={{ color: "text.secondary" }} />
      <Typography
        color="textSecondary"
        variant="body1"
        fontSize="18px"
        fontWeight={600}
      >
        Si è verificato un problema durante il caricamento degli indirizzi.
      </Typography>
      <ButtonNaked color="primary">Prova di nuovo</ButtonNaked>
    </Stack>
  );
};

export default ErrorState;
