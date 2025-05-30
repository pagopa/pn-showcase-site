import "maplibre-gl/dist/maplibre-gl.css";
import * as React from "react";

import { useEffect } from "react";
import {
  GeolocateControl,
  Map,
  NavigationControl,
} from "react-map-gl/maplibre";
import { RaddOperator } from "src/model";
import Clusters from "./Clusters";

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

  const handleMapClick = (event: any) => {
    if (event.features && event.features.length > 0) {
      const feature = event.features[0];
      const map = event.target;

      if (feature.layer.id === "unclustered-point") {
        map.flyTo({
          center: feature.geometry.coordinates,
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

  const handleMouseEnter = (event: any) => {
    if (event.features && event.features.length > 0) {
      const map = event.target;
      map.getCanvas().style.cursor = "pointer";
    }
  };

  const handleMouseLeave = (event: any) => {
    const map = event.target;
    map.getCanvas().style.cursor = "";
  };

  useEffect(() => {
    if (userLocation) {
      const map = mapRef?.current;
      if (map && map.flyTo) {
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
        longitude: userLocation?.longitude || 12.482802,
        latitude: userLocation?.latitude || 41.895679,
        zoom: userLocation ? 12 : 10,
      }}
      minZoom={5.5}
      style={{ height: "100%", width: "100%" }}
      interactiveLayerIds={["unclustered-point"]}
      onClick={handleMapClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      mapStyle={`https://maps.geo.eu-central-1.amazonaws.com/v2/styles/Standard/descriptor?key=${API_KEY}`}
    >
      <NavigationControl showCompass={false} />
      <GeolocateControl />

      <Clusters points={validPoints} />
    </Map>
  );
};

export default PickupPointsMapLibre;
