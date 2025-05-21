"use client";

import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { RaddOperator } from "../../model";
import Clusters from "./RegionsCluster";

type Props = {
  points: Array<RaddOperator>;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  mapRef?: React.MutableRefObject<any>;
};

function MapController({
  userLocation,
  mapRef,
}: {
  userLocation: { latitude: number; longitude: number } | null;
  mapRef?: React.MutableRefObject<any>;
}) {
  const map = useMap();

  map.setMinZoom(5);
  map.zoomControl.setPosition("topright");

  if (mapRef) {
    mapRef.current = map;
  }

  useEffect(() => {
    if (userLocation) {
      map.flyTo([userLocation.latitude, userLocation.longitude], 13);
    }
  }, [userLocation, map]);

  return null;
}

const PickupPointsMap: React.FC<Props> = ({ points, userLocation, mapRef }) => {
  const validPoints = points.filter(
    (point) => point.latitude && point.longitude
  );

  return (
    <MapContainer
      center={[41.8719, 12.5674]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <MapController userLocation={userLocation} mapRef={mapRef} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Clusters points={validPoints} />
    </MapContainer>
  );
};

export default PickupPointsMap;
