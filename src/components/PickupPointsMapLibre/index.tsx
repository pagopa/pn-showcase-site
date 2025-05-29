import "maplibre-gl/dist/maplibre-gl.css";
import * as React from "react";
import { useState } from "react";
import MapLibreMap from "react-map-gl/maplibre";

import { GeolocateControl, NavigationControl } from "react-map-gl/maplibre";
import { RaddOperator } from "src/model";
import Clusters from "./Clusters";

type Props = {
  points: Array<RaddOperator>;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  mapRef?: React.MutableRefObject<any>;
};

type ClusterData = {
  id: string;
  name: string;
  count: number;
  latitude: number;
  longitude: number;
  type: "region" | "province";
};

const PickupPointsMapLibre: React.FC<Props> = ({
  points,
  userLocation,
  mapRef,
}) => {
  const [zoom, setZoom] = useState(userLocation ? 12 : 10);

  const validPoints = points.filter(
    (point) => point.latitude && point.longitude
  );

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  return (
    <MapLibreMap
      ref={mapRef}
      initialViewState={{
        longitude: userLocation ? userLocation.longitude : 12.482802,
        latitude: userLocation ? userLocation.latitude : 41.895679,
        zoom: userLocation ? 12 : 10,
      }}
      minZoom={5.5}
      style={{ height: "100%", width: "100%" }}
      mapStyle={`https://maps.geo.eu-central-1.amazonaws.com/v2/styles/Standard/descriptor?key=${API_KEY}`}
      onZoom={(evt) => setZoom(evt.viewState.zoom)}
    >
      <NavigationControl showCompass={false} />
      <GeolocateControl />

      <Clusters points={validPoints} />
    </MapLibreMap>
  );
};

export default PickupPointsMapLibre;
