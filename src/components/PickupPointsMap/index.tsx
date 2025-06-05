import { MapLibreEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "react-map-gl/maplibre";
import { Coordinates, RaddOperator } from "src/model";
import MapControls from "./MapControls";
import UserPositionController from "./UserPositionController";
import Clusters from "./Clusters";

type Props = {
  points: Array<RaddOperator>;
  userPosition: Coordinates | null;
};

const PickupPointsMap: React.FC<Props> = ({ points, userPosition }) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const handleLoad = async (event: MapLibreEvent) => {
    const map = event.target;
    const response = await map.loadImage("/static/images/map/base-marker.png");
    map.addImage("base-marker", response.data);
  };

  return (
    <Map
      mapStyle={`https://maps.geo.eu-central-1.amazonaws.com/v2/styles/Standard/descriptor?key=${API_KEY}`}
      initialViewState={{
        longitude: 12.482802,
        latitude: 41.895679,
        zoom: 10,
      }}
      minZoom={5}
      onLoad={handleLoad}
      reuseMaps
      style={{ height: "100%", width: "100%", position: "relative" }}
    >
      <UserPositionController points={points} userPosition={userPosition} />
      <MapControls userPosition={userPosition} />
      <Clusters points={points} />
    </Map>
  );
};

export default PickupPointsMap;
