import { fitMapToPoints } from "@utils/map";
import React, { useEffect } from "react";
import { Marker, useMap } from "react-map-gl/maplibre";
import useCurrentPosition from "src/hook/useCurrentPosition";
import { RaddOperator } from "src/model";

type Props = {
  points?: Array<RaddOperator>;
};

const UserPositionControl: React.FC<Props> = ({ points = [] }) => {
  const map = useMap();
  const { userPosition } = useCurrentPosition();

  useEffect(() => {
    if (!userPosition || !map.current) return;

    fitMapToPoints(userPosition, points, map.current);
  }, [map, userPosition]);

  if (userPosition) {
    return (
      <Marker
        longitude={userPosition.longitude}
        latitude={userPosition.latitude}
        anchor="bottom"
      >
        <img
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
