import { WarningAmber } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import React from "react";
import { useTranslation } from "src/hook/useTranslation";

type Props = {
  handleRetry: () => void;
};

const MapError: React.FC<Props> = ({ handleRetry }) => {
  const { t } = useTranslation(["pickup"]);

  return (
    <Stack
      direction="column"
      sx={{
        height: "100%",
        width: "100%",
        position: "relative",
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <WarningAmber sx={{ color: "text.secondary", mb: 1 }} />
      <Typography variant="body2" color="text.secondary" fontWeight={600}>
        {t("map-loading-error-1")}
      </Typography>
      <Typography variant="body2" color="text.secondary" fontWeight={600}>
        {t("map-loading-error-2")}
      </Typography>
      <ButtonNaked
        color="primary"
        sx={{ fontWeight: 700, fontSize: "16px", mt: 1 }}
        onClick={handleRetry}
      >
        {t("map-loading-error-cta")}
      </ButtonNaked>
    </Stack>
  );
};

export default MapError;
