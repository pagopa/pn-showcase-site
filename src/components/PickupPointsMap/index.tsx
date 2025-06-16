import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "react-map-gl/maplibre";
import { useConfig } from "src/context/config-context";
import { RaddOperator } from "src/model";
import MapControls from "./MapControls";
import UserPositionController from "./UserPositionController";

type Props = {
  points: Array<RaddOperator>;
};

const PickupPointsMap: React.FC<Props> = ({ points }) => {
  const { CLOUDFRONT_MAP_URL } = useConfig();

  return (
    <Map
      mapStyle={CLOUDFRONT_MAP_URL}
      initialViewState={{
        longitude: 12.482802,
        latitude: 41.895679,
        zoom: 10,
      }}
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <UserPositionController points={points} />

      <MapControls />
    </Map>
  );
};

export default PickupPointsMap;
