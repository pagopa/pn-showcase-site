import { sortPointsByDistance } from "@utils/map";
import React, { useEffect } from "react";
import { LngLatBoundsLike, useMap } from "react-map-gl/maplibre";
import { RaddOperator } from "src/model";

type Props = {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  points?: Array<RaddOperator>;
};

const UserPositionControl: React.FC<Props> = ({
  userLocation,
  points = [],
}) => {
  const map = useMap();

  const fitMapToPoints = (userLocation: {
    latitude: number;
    longitude: number;
  }) => {
    const sortedPoints = sortPointsByDistance(points, userLocation);

    const targetPoints = sortedPoints.slice(0, 5);

    const allCoordinates = [
      [userLocation.longitude, userLocation.latitude],
      ...targetPoints.map((point) => [point.longitude!, point.latitude!]),
    ];

    const lngs = allCoordinates.map((coord) => coord[0]);
    const lats = allCoordinates.map((coord) => coord[1]);

    const bounds: LngLatBoundsLike = [
      [Math.min(...lngs), Math.min(...lats)],
      [Math.max(...lngs), Math.max(...lats)],
    ];

    map.current?.fitBounds(bounds, {
      padding: { top: 50, bottom: 50, left: 50, right: 50 },
      maxZoom: 15,
      duration: 1500,
    });
  };

  useEffect(() => {
    if (!userLocation || !map.current) return;

    fitMapToPoints(userLocation);
  }, [map, userLocation]);

  return null;
};

export default UserPositionControl;
