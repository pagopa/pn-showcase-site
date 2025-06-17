import { LocationOff } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "src/hook/useTranslation";

const EmptyState = () => {
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
      <LocationOff sx={{ color: "text.secondary" }} />
      <Typography fontWeight={600} fontSize="18px" color="textSecondary">
        {t("autocomplete.empty-state-title")}
      </Typography>
      <Typography
        color="textSecondary"
        variant="body1"
        fontSize="16px"
        fontWeight={400}
      >
        {t("autocomplete.empty-state-description")}
      </Typography>
    </Stack>
  );
};

export default EmptyState;
