import { Add, CopyAll, GpsFixed, GpsOff, Remove } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Paper, Stack } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";
import { useState } from "react";
import { useMap } from "react-map-gl/maplibre";
import useCurrentPosition from "src/hook/useCurrentPosition";
import { useTranslation } from "src/hook/useTranslation";
import SnackBar from "../SnackBar/SnackBar";

const MapControls: React.FC = () => {
  const map = useMap();
  const { t } = useTranslation(["pickup"]);
  const { deniedAccess, userPosition } = useCurrentPosition();
  const [showDeniedSnackBar, setShowDeniedSnackBar] = useState(false);

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

    if (deniedAccess) {
      setShowDeniedSnackBar(true);
      return;
    }
  };

  const getGpsIcon = () => {
    return deniedAccess ? (
      <GpsOff color="disabled" fontSize="small" />
    ) : (
      <GpsFixed color="primary" fontSize="small" />
    );
  };

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
        open={showDeniedSnackBar}
        alertSeverity="warning"
        message={
          <Box display="flex" alignItems="center" gap={2}>
            {t("geolocation-denied")}
            <ButtonNaked
              color="primary"
              startIcon={<CopyAll />}
              sx={{ fontSize: "16px" }}
            >
              {t("geolocation-denied-cta")}
            </ButtonNaked>
          </Box>
        }
        onClose={() => setShowDeniedSnackBar(false)}
        snackBarPosition={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default MapControls;
