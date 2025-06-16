import { MapLibreEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Map } from "react-map-gl/maplibre";
import { useConfig } from "src/context/config-context";
import { RaddOperator } from "src/model";
import MapControls from "./MapControls";
import UserPositionController from "./UserPositionController";
import Clusters from "./Clusters";

type Props = {
  points: Array<RaddOperator>;
};

const PickupPointsMap: React.FC<Props> = ({ points }) => {
  const { CLOUDFRONT_MAP_URL } = useConfig();

  const handleLoad = async (event: MapLibreEvent) => {
    const map = event.target;
    const response = await map.loadImage("/static/images/map/base-marker.png");
    map.addImage("base-marker", response.data);
  };

  return (
    <Map
      mapStyle={CLOUDFRONT_MAP_URL}
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
      <UserPositionController points={points} />
      <MapControls />
      <Clusters points={points} />
    </Map>
  );
};

export default PickupPointsMap;
