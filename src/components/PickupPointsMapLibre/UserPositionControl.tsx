import React, { useEffect } from "react";
import { useMap } from "react-map-gl/maplibre";

type Props = {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
};

const UserPositionControl: React.FC<Props> = ({ userLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (!userLocation || !map.current) return;

    const { latitude, longitude } = userLocation;

    map.current.flyTo({
      center: [longitude || 0, latitude || 0],
      zoom: 12,
    });
  }, [map, userLocation]);

  return null;
};

export default UserPositionControl;
