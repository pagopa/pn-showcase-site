import { sortPointsByDistance } from "@utils/map";
import Image from "next/image";
import React, { useEffect } from "react";
import { LngLatBoundsLike, Marker, useMap } from "react-map-gl/maplibre";
import { Coordinates, RaddOperator } from "src/model";

type Props = {
  userPosition: Coordinates | null;
  points?: Array<RaddOperator>;
};

const UserPositionControl: React.FC<Props> = ({
  userPosition,
  points = [],
}) => {
  const map = useMap();

  const fitMapToPoints = (userPosition: {
    latitude: number;
    longitude: number;
  }) => {
    const sortedPoints = sortPointsByDistance(points, userPosition);

    const targetPoints = sortedPoints.slice(0, 5);

    const allCoordinates = [
      [userPosition.longitude, userPosition.latitude],
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
      center: [userPosition.longitude, userPosition.latitude],
    });
  };

  useEffect(() => {
    if (!userPosition || !map.current) return;

    fitMapToPoints(userPosition);
  }, [map, userPosition]);

  if (userPosition) {
    return (
      <Marker
        longitude={userPosition.longitude}
        latitude={userPosition.latitude}
        anchor="bottom"
      >
        <Image
          src="/static/images/map/userLocationMarker.svg"
          alt="User position marker"
          width={24}
          height={24}
        />
      </Marker>
    );
  }

  return null;
};

export default UserPositionControl;
