import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "../../../hook/useTranslation";

const DarkInfoblockAssistenza = () => {
  const { t } = useTranslation(["assistenza"]);
  return (
    <Box
      sx={{
        backgroundColor: "#0B3EE3",
        paddingTop: 8,
        paddingBottom: 8,
        width: "100%",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        maxWidth="sm"
        padding={4}
      >
        <Typography
          variant="h6"
          component="h2"
          color="white"
          marginBottom={2}
          gutterBottom
        >
          {t("tab.1.infoblock.title", { ns: "assistenza" })}
        </Typography>
        <Typography
          variant="body2"
          color="white"
          textAlign="center"
          marginBottom={2}
        >
          {t("tab.1.infoblock.description", { ns: "assistenza" })}
        </Typography>
      </Stack>
    </Box>
  );
};

export default DarkInfoblockAssistenza;
