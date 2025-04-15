"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { RaddOperator } from "../model";
import MarkerCluster from "./Map/ClusterMarker";

type Props = {
  points: Array<RaddOperator>;
};

function MapController({
  userLocation,
}: {
  userLocation: { latitude: number; longitude: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.flyTo([userLocation.latitude, userLocation.longitude], 10);
    }
  }, [userLocation, map]);

  return null;
}

const getIcon = (iconUrl: string) => {
  return L.icon({
    iconUrl,
    iconSize: [56, 74],
    iconAnchor: [28, 74], // Il primo elemento deve essere la metà dell'iconSize
  });
};

const PickupPointsMap: React.FC<Props> = ({ points }) => {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const getUserLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Got coordinates", latitude, longitude);
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const validPoints = points.filter(
    (point) => point.latitude && point.longitude
  );

  const markers = validPoints.map((p) => ({
    position: { lat: p.latitude || 0, lng: p.longitude || 0 },
    text: p.address,
  }));

  return (
    <MapContainer
      center={[41.8719, 12.5674]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <MapController userLocation={userLocation} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.length > 0 && <MarkerCluster markers={markers} />}
    </MapContainer>
  );
};

export default PickupPointsMap;
