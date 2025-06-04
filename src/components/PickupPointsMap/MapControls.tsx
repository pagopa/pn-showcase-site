import { Add, GpsFixed, Remove } from "@mui/icons-material";
import { Button, ButtonGroup, Paper, Stack } from "@mui/material";
import { useMap } from "react-map-gl/maplibre";
import useCurrentPosition from "src/hook/useCurrentPosition";
import { Coordinates } from "src/model";

type Props = {
  userPosition: Coordinates | null;
};

const MapControls: React.FC<Props> = ({ userPosition }) => {
  const map = useMap();
  const { askGeolocationPermission } = useCurrentPosition();

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

    try {
      const result = await navigator.permissions.query({ name: "geolocation" });

      if (result.state === "denied") {
        // todo
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{ position: "absolute", top: 24, right: 24 }}
    >
      <Paper elevation={4}>
        <Button onClick={onGeolocateUser} sx={{ width: "48px" }}>
          <GpsFixed color="primary" fontSize="small" />
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
  );
};

export default MapControls;
