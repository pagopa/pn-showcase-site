import { Add, GpsFixed, GpsOff, Remove } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl/maplibre";
import { useConfig } from "src/context/config-context";
import useCurrentPosition from "src/hook/useCurrentPosition";
import { useTranslation } from "src/hook/useTranslation";
import { Coordinates } from "src/model";
import SnackBar from "../SnackBar/SnackBar";

type Props = {
  setSearchCoordinates: (coordinates: Coordinates) => void;
};

const MapControls: React.FC<Props> = ({ setSearchCoordinates }) => {
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
      setSearchCoordinates(userPosition);
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

  const getErrorMessage = () => {
    if (deniedAccess) {
      return (
        <Stack direction="column" justifyContent="start" spacing={1}>
          <Typography variant="body2">{t("geolocation-denied")}</Typography>
          <Link
            color="primary"
            href={GEOLOCATION_ASSISTANCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontSize: "16px", fontWeight: 700, textDecoration: "none" }}
          >
            {t("geolocation-denied-cta")}
          </Link>
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
          <Button
            onClick={onGeolocateUser}
            sx={{ width: "48px" }}
            tabIndex={-1}
            aria-hidden="true"
          >
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
            <Button onClick={onClickZoomIn} tabIndex={-1} aria-hidden="true">
              <Add color="primary" fontSize="small" />
            </Button>
            <Button onClick={onClickZoomOut} tabIndex={-1} aria-hidden="true">
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
        snackBarPosition={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default MapControls;
