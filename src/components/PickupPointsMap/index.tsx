import { Typography } from "@mui/material";
import { fitMapToPoints } from "@utils/map";
import { MapLayerMouseEvent, MapLibreEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import { Map, MapRef } from "react-map-gl/maplibre";
import { useConfig } from "src/context/config-context";
import { useTranslation } from "src/hook/useTranslation";
import { Coordinates, RaddOperator } from "src/model";
import ErrorBox from "../ErrorBox";
import Clusters from "./Clusters";
import MapControls from "./MapControls";
import UserPositionController from "./UserPositionController";
import { useIsMobile } from "src/hook/useIsMobile";

type Props = {
  points: Array<RaddOperator>;
  selectedPoint: RaddOperator | null;
  searchCoordinates: Coordinates | null;
  setSelectedPoint: (point: RaddOperator | null) => void;
  toggleDrawer: (open: boolean, pickupPoint: RaddOperator | null) => void;
};

const PickupPointsMap: React.FC<Props> = ({
  points,
  selectedPoint,
  searchCoordinates,
  setSelectedPoint,
  toggleDrawer,
}) => {
  const { t } = useTranslation(["pickup"]);
  const mapRef = useRef<MapRef>(null);
  const isMobile = useIsMobile();
  const [mapError, setMapError] = useState(false);
  const { CLOUDFRONT_MAP_URL } = useConfig();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleLoad = async (event: MapLibreEvent) => {
    const map = event.target;
    const baseMaker = await map.loadImage("/static/images/map/base-marker.png");
    const selectedMarker = await map.loadImage(
      "/static/images/map/selected-marker.png"
    );
    map.addImage("base-marker", baseMaker.data);
    map.addImage("selected-marker", selectedMarker.data);
    setImagesLoaded(true);
  };

  const handleMapClick = (event: MapLayerMouseEvent) => {
    if (event.features && event.features.length > 0) {
      const feature = event.features[0];
      const map = event.target;

      if (feature.layer.id === "unclustered-points") {
        const selectedPoint = JSON.parse(feature.properties.point);
        const geometry = feature.geometry as GeoJSON.Geometry & {
          coordinates: [number, number];
        };
        map.flyTo({
          center: geometry.coordinates,
          zoom: 15,
          duration: 1000,
        });
        setSelectedPoint(selectedPoint);
        toggleDrawer(true, selectedPoint);
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
    if (selectedPoint && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedPoint.longitude, selectedPoint.latitude],
        zoom: 17,
        essential: true,
      });
    }
  }, [selectedPoint, mapRef]);

  useEffect(() => {
    if (searchCoordinates && mapRef.current) {
      fitMapToPoints(searchCoordinates, points, mapRef.current);
    }
  }, [searchCoordinates]);

  const handleRetry = () => {
    setMapError(false);
  };

  if (mapError) {
    return (
      <ErrorBox handleRetry={handleRetry} retryLabel={t("retry-cta")}>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {t("map-loading-error-1")}
        </Typography>
        <Typography variant="body2" color="text.secondary" fontWeight={600}>
          {t("map-loading-error-2")}
        </Typography>
      </ErrorBox>
    );
  }

  return (
    <Map
      ref={mapRef}
      mapStyle={CLOUDFRONT_MAP_URL}
      initialViewState={{
        longitude: 12.482802,
        latitude: 41.895679,
        zoom: 10,
      }}
      minZoom={5}
      onError={() => setMapError(true)}
      interactiveLayerIds={["unclustered-points"]}
      onClick={handleMapClick}
      onLoad={handleLoad}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cooperativeGestures={!!isMobile}
      locale={{
        "CooperativeGesturesHandler.MobileHelpText": t("map-mobile-help-text"),
      }}
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <UserPositionController points={points} />
      <MapControls />
      {imagesLoaded && (
        <Clusters points={points} selectedPoint={selectedPoint} />
      )}
    </Map>
  );
};

export default PickupPointsMap;
