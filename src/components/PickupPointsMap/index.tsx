import { MapLayerMouseEvent, MapLibreEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { Map, MapRef } from "react-map-gl/maplibre";
import { useConfig } from "src/context/config-context";
import { useIsMobile } from "src/hook/useIsMobile";
import { RaddOperator } from "src/model";
import Clusters from "./Clusters";
import MapControls from "./MapControls";
import UserPositionController from "./UserPositionController";

type Props = {
  points: Array<RaddOperator>;
  selectedPoint: RaddOperator | null;
  setSelectedPoint: (point: RaddOperator | null) => void;
  toggleDrawer: (open: boolean, pickupPoint: RaddOperator | null) => void;
};

const PickupPointsMap: React.FC<Props> = ({
  points,
  selectedPoint,
  setSelectedPoint,
  toggleDrawer,
}) => {
  const mapRef = useRef<MapRef>(null);
  const isMobile = useIsMobile();
  const { CLOUDFRONT_MAP_URL } = useConfig();

  const handleLoad = async (event: MapLibreEvent) => {
    const map = event.target;
    const baseMaker = await map.loadImage("/static/images/map/base-marker.png");
    const selectedMarker = await map.loadImage(
      "/static/images/map/selected-marker.png"
    );
    map.addImage("base-marker", baseMaker.data);
    map.addImage("selected-marker", selectedMarker.data);
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
        if (isMobile) {
          toggleDrawer(true, selectedPoint);
        }
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
      interactiveLayerIds={["unclustered-points"]}
      onClick={handleMapClick}
      onLoad={handleLoad}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <UserPositionController points={points} />
      <MapControls />
      <Clusters points={points} selectedPoint={selectedPoint} />
    </Map>
  );
};

export default PickupPointsMap;
