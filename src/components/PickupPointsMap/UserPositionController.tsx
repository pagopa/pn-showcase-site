import { fitMapToPoints } from "@utils/map";
import React, { useEffect } from "react";
import { Marker, useMap } from "react-map-gl/maplibre";
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
