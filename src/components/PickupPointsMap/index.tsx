import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "react-map-gl/maplibre";
import { Coordinates, RaddOperator } from "src/model";
import MapControls from "./MapControls";
import UserPositionController from "./UserPositionController";

type Props = {
  points: Array<RaddOperator>;
  userPosition: Coordinates | null;
};

const PickupPointsMap: React.FC<Props> = ({ points, userPosition }) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  return (
    <Map
      mapStyle={`https://maps.geo.eu-central-1.amazonaws.com/v2/styles/Standard/descriptor?key=${API_KEY}`}
      initialViewState={{
        longitude: 12.482802,
        latitude: 41.895679,
        zoom: 10,
      }}
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <UserPositionController points={points} userPosition={userPosition} />

      <MapControls userPosition={userPosition} />
    </Map>
  );
};

export default PickupPointsMap;
