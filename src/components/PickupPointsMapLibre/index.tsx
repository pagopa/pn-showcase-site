import "maplibre-gl/dist/maplibre-gl.css";
import * as React from "react";
import {
  GeolocateControl,
  Map,
  MapLayerMouseEvent,
  NavigationControl,
} from "react-map-gl/maplibre";
import { RaddOperator } from "src/model";
import { MapLibreEvent } from "maplibre-gl";
import Clusters from "./Clusters";
import UserPositionControl from "./UserPositionControl";
import { useEffect } from "react";

type Props = {
  points: Array<RaddOperator>;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  mapRef?: React.MutableRefObject<any>;
  toggleDrawer?: (open: boolean, pickupPoint: RaddOperator | null) => void;
};

const PickupPointsMapLibre: React.FC<Props> = ({
  points,
  userLocation,
  mapRef,
  toggleDrawer,
}) => {
  const validPoints = points.filter(
    (point) => point.latitude && point.longitude
  );

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const handleMapClick = (event: MapLayerMouseEvent) => {
    if (event.features && event.features.length > 0) {
      const feature = event.features[0];
      const map = event.target;

      if (feature.layer.id === "unclustered-points") {
        const geometry = feature.geometry as GeoJSON.Geometry & {
          coordinates: [number, number];
        };
        map.flyTo({
          center: geometry.coordinates,
          zoom: 15,
          duration: 1000,
        });
        if (toggleDrawer) {
          const selectedPoint = validPoints.find(
            (point) =>
              point.address === feature.properties.address &&
              point.denomination === feature.properties.name
          );
          toggleDrawer(true, selectedPoint || null);
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

  const handleLoad = async (event: MapLibreEvent) => {
    const map = event.target;
    const response = await map.loadImage("/static/images/base-marker.png");
    map.addImage("base-marker", response.data);
  };

  useEffect(() => {
    if (userLocation && mapRef?.current) {
      const map = mapRef.current;
      if (map.flyTo) {
        map.flyTo({
          center: [userLocation.longitude, userLocation.latitude],
          zoom: 12,
        });
      }
    }
  }, [userLocation, mapRef]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 12.482802,
        latitude: 41.895679,
        zoom: 10,
      }}
      minZoom={5}
      style={{ height: "100%", width: "100%" }}
      interactiveLayerIds={["unclustered-points"]}
      onClick={handleMapClick}
      onLoad={handleLoad}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      mapStyle={`https://maps.geo.eu-central-1.amazonaws.com/v2/styles/Standard/descriptor?key=${API_KEY}`}
      reuseMaps
    >
      <UserPositionControl userLocation={userLocation} points={points} />
      <NavigationControl showCompass={false} />
      <GeolocateControl />
      <Clusters points={validPoints} />
    </Map>
  );
};

export default PickupPointsMapLibre;
