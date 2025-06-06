import { MapLibreEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { Map, MapRef } from "react-map-gl/maplibre";
import { Coordinates, RaddOperator } from "src/model";
import Clusters from "./Clusters";
import MapControls from "./MapControls";
import UserPositionController from "./UserPositionController";

type Props = {
  points: Array<RaddOperator>;
  userPosition: Coordinates | null;
  selectedPoint: RaddOperator | null;
};

const PickupPointsMap: React.FC<Props> = ({
  points,
  userPosition,
  selectedPoint,
}) => {
  const mapRef = useRef<MapRef>(null);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const handleLoad = async (event: MapLibreEvent) => {
    const map = event.target;
    const baseMaker = await map.loadImage("/static/images/map/base-marker.png");
    const selectedMarker = await map.loadImage(
      "/static/images/map/selected-marker.png"
    );
    map.addImage("base-marker", baseMaker.data);
    map.addImage("selected-marker", selectedMarker.data);
  };

  // useEffect(() => {
  //   if (selectedPoint && mapRef.current) {
  //     mapRef.current.flyTo({
  //       center: [selectedPoint.longitude, selectedPoint.latitude],
  //       zoom: 17,
  //       essential: true,
  //     });
  //   }
  // }, [selectedPoint, mapRef]);

  return (
    <Map
      ref={mapRef}
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
      <Clusters points={points} selectedPoint={selectedPoint} />
    </Map>
  );
};

export default PickupPointsMap;
