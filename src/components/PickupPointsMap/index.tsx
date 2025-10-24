import { CircularProgress, Stack, Typography } from "@mui/material";
import { MAP_MARKERS } from "@utils/constants";
import { fitMapToPoints } from "@utils/map";
import { GeoJSONSource, MapLayerMouseEvent, MapLibreEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";
import { Map, MapRef } from "react-map-gl/maplibre";
import { useIsMobile } from "src/hook/useIsMobile";
import { useTranslation } from "src/hook/useTranslation";
import { Coordinates, RaddOperator } from "src/model";
import useLocalizedStyleDescriptor from "../../hook/useLocalizedStyleDescriptor";
import ErrorBox from "../ErrorBox";
import Clusters from "./Clusters";
import MapControls from "./MapControls";
import SearchedAddressLayer from "./SearchedAddressLayer";
import UserPositionController from "./UserPositionController";

type Props = {
  mapRef?: React.RefObject<MapRef>;
  points: Array<RaddOperator>;
  selectedPoint: RaddOperator | null;
  searchCoordinates: Coordinates | null;
  setSelectedPoint: (point: RaddOperator | null) => void;
  setSearchCoordinates: (coordinates: Coordinates) => void;
  toggleDialog: (open: boolean, pickupPoint: RaddOperator | null) => void;
};

const PickupPointsMap: React.FC<Props> = ({
  mapRef,
  points,
  selectedPoint,
  searchCoordinates,
  setSelectedPoint,
  setSearchCoordinates,
  toggleDialog,
}) => {
  const { t } = useTranslation(["pickup"]);

  const isMobile = useIsMobile();
  const [mapError, setMapError] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const styleDescriptor = useLocalizedStyleDescriptor({
    language: "it",
    setMapError,
  });

  const handleLoad = async (event: MapLibreEvent) => {
    const map = event.target;

    try {
      const imagePromises = MAP_MARKERS.map(({ path }) => map.loadImage(path));
      const loadedImages = await Promise.all(imagePromises);

      MAP_MARKERS.forEach(({ id }, index) => {
        map.addImage(id, loadedImages[index].data);
      });

      setImagesLoaded(true);
    } catch (error) {
      console.error("Failed to load map images:", error);
      setMapError(true);
    }
  };

  const handleMapClick = async (event: MapLayerMouseEvent) => {
    if (event.features && event.features.length > 0) {
      const feature = event.features[0];
      const map = event.target;
      const geometry = feature.geometry as GeoJSON.Geometry & {
        coordinates: [number, number];
      };

      if (feature.layer.id === "unclustered-points") {
        const selectedPoint: RaddOperator = JSON.parse(
          feature.properties.point
        );
        map.flyTo({
          center: geometry.coordinates,
          zoom: 15,
          duration: 1000,
        });
        setSelectedPoint(selectedPoint);
        toggleDialog(true, selectedPoint);
      }

      if (feature.layer.id === "cluster-points" && feature.properties.cluster) {
        const clusterId = feature.properties.cluster_id;
        const source: GeoJSONSource | undefined = map.getSource("stores");
        const zoom = await source?.getClusterExpansionZoom(clusterId);
        map.easeTo({
          center: geometry.coordinates,
          zoom,
        });
      }
    }
  };

  const handleMouseEnter = (event: MapLayerMouseEvent) => {
    if (event.features && event.features.length > 0) {
      const map = event.target;
      map.getCanvas().style.cursor = "pointer";
    }
  };

  const handleMouseLeave = (event: MapLayerMouseEvent) => {
    const map = event.target;
    map.getCanvas().style.cursor = "";
  };

  useEffect(() => {
    if (selectedPoint && mapRef?.current) {
      mapRef.current.flyTo({
        center: [selectedPoint.longitude, selectedPoint.latitude],
        zoom: 17,
        essential: true,
      });
    }
  }, [selectedPoint, mapRef]);

  useEffect(() => {
    if (searchCoordinates && mapRef?.current) {
      fitMapToPoints(searchCoordinates, points, mapRef.current);
      setSelectedPoint(null);
    }
  }, [searchCoordinates, points, mapRef]);

  const handleRetry = () => {
    setMapError(false);
  };

  if (mapError) {
    return (
      <ErrorBox
        handleRetry={handleRetry}
        retryLabel={t("retry-cta")}
        sx={{ px: { xs: 2, md: 4 } }}
      >
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {t("map-loading-error-1")}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {t("map-loading-error-2")}
        </Typography>
      </ErrorBox>
    );
  }

  if (!styleDescriptor) {
    return (
      <Stack
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
          backgroundColor: "#F5F5F5",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Map
      ref={mapRef}
      mapStyle={styleDescriptor}
      initialViewState={{
        longitude: 12.482802,
        latitude: 41.895679,
        zoom: 10,
      }}
      minZoom={5}
      onError={() => setMapError(true)}
      interactiveLayerIds={["unclustered-points", "cluster-points"]}
      onClick={handleMapClick}
      onLoad={handleLoad}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cooperativeGestures={!!isMobile}
      locale={{
        "CooperativeGesturesHandler.MobileHelpText": t("map-mobile-help-text"),
      }}
      style={{ height: "100%", width: "100%" }}
    >
      <UserPositionController points={points} />
      <MapControls
        points={points}
        searchCoordinates={searchCoordinates}
        setSearchCoordinates={setSearchCoordinates}
      />
      {imagesLoaded && (
        <>
          <Clusters points={points} selectedPoint={selectedPoint} />
          <SearchedAddressLayer searchCoordinates={searchCoordinates} />
        </>
      )}
    </Map>
  );
};

export default PickupPointsMap;
