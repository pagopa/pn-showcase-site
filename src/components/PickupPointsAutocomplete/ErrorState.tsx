import { WarningAmber } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "src/hook/useTranslation";

const ErrorState: React.FC = () => {
  const { t } = useTranslation(["pickup"]);

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
        {t("autocomplete.fetch-error")}
      </Typography>
    </Stack>
  );
};

export default ErrorState;
