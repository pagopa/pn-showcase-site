import { Add, GpsFixed, GpsOff, Remove } from "@mui/icons-material";
import { Button, ButtonGroup, Paper, Stack, Typography } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/maplibre";
import useCurrentPosition from "src/hook/useCurrentPosition";
import { useTranslation } from "src/hook/useTranslation";
import SnackBar from "../SnackBar/SnackBar";
import { useConfig } from "src/context/config-context";

const MapControls: React.FC = () => {
  const map = useMap();
  const { t } = useTranslation(["pickup"]);
  const { GEOLOCATION_ASSISTANCE_URL } = useConfig();
  const { deniedAccess, geocodingError, userPosition } = useCurrentPosition();
  const [showErrorSnackBar, setShowErrorSnackBar] = useState(false);

  const hasError = deniedAccess || geocodingError;

  const onClickZoomIn = () => {
    map.current?.zoomIn();
  };

  const onClickZoomOut = () => {
    map.current?.zoomOut();
  };

  const onGeolocateUser = async () => {
    if (userPosition) {
      map.current?.flyTo({
        center: [userPosition.longitude, userPosition.latitude],
        zoom: 15,
        essential: true,
      });
      return;
    }

    if (hasError) {
      setShowErrorSnackBar(true);
      return;
    }
  };

  const getGpsIcon = () => {
    return hasError ? (
      <GpsOff color="disabled" fontSize="small" />
    ) : (
      <GpsFixed color="primary" fontSize="small" />
    );
  };

  const navigateToAssistancePage = () => {
    window.open(GEOLOCATION_ASSISTANCE_URL, "_blank");
  };

  const getErrorMessage = () => {
    if (deniedAccess) {
      return (
        <Stack direction="column" justifyContent="start" spacing={1}>
          <Typography variant="body2">{t("geolocation-denied")}</Typography>
          <ButtonNaked
            color="primary"
            sx={{ fontSize: "16px", justifyContent: "flex-start" }}
            onClick={() => navigateToAssistancePage()}
          >
            {t("geolocation-denied-cta")}
          </ButtonNaked>
        </Stack>
      );
    }

    if (geocodingError) {
      return <Typography variant="body2">{t(`${geocodingError}`)}</Typography>;
    }
  };

  useEffect(() => {
    if (!showErrorSnackBar && hasError) {
      setShowErrorSnackBar(true);
    }
  }, [geocodingError, deniedAccess]);

  return (
    <>
      <Stack
        direction="column"
        spacing={4}
        sx={{ position: "absolute", top: 24, right: 24 }}
      >
        <Paper elevation={4}>
          <Button onClick={onGeolocateUser} sx={{ width: "48px" }}>
            {getGpsIcon()}
          </Button>
        </Paper>

        <Paper elevation={4}>
          <ButtonGroup
            orientation="vertical"
            variant="text"
            sx={{
              backgroundColor: "white",
              borderColor: "white",
              width: "48px",
              borderRadius: 4,
            }}
          >
            <Button onClick={onClickZoomIn}>
              <Add color="primary" fontSize="small" />
            </Button>
            <Button onClick={onClickZoomOut}>
              <Remove color="primary" fontSize="small" />
            </Button>
          </ButtonGroup>
        </Paper>
      </Stack>

      <SnackBar
        open={showErrorSnackBar}
        alertSeverity={deniedAccess ? "warning" : "error"}
        message={getErrorMessage()}
        onClose={() => setShowErrorSnackBar(false)}
        snackBarPosition={{ vertical: "bottom", horizontal: "right" }}
      />
    </>
  );
};

export default MapControls;
