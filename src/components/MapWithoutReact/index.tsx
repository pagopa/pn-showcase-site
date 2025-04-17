"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";

import { RaddOperator } from "src/model";
import { createMarkerCluster } from "./Clusters";

type Props = {
  points: Array<RaddOperator>;
};

const PickupPointsMap: React.FC<Props> = ({ points }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [41.8719, 12.5674],
        6
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);
    }

    if (navigator.geolocation && mapInstanceRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Got coordinates", latitude, longitude);

          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([latitude, longitude], 13);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const validPoints = points.filter(
      (point) => point.latitude && point.longitude
    );

    const markers = validPoints.map((p) => ({
      position: { lat: p.latitude || 0, lng: p.longitude || 0 },
      text: p.address,
      iconUrl: "/static/images/pointer.svg",
    }));

    if (markers.length > 0) {
      createMarkerCluster(mapInstanceRef.current, markers);
    }
  }, [points]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }} />;
};

export default PickupPointsMap;
