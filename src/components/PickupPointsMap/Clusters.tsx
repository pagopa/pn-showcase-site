import React from "react";
import { Layer, Source } from "react-map-gl/maplibre";
import { RaddOperator } from "src/model";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";

interface RegionClusterProps {
  points: RaddOperator[];
  selectedPoint: RaddOperator | null;
}

const Clusters: React.FC<RegionClusterProps> = ({ points, selectedPoint }) => {
  const geojsonData: GeoJSON.GeoJSON = {
    type: "FeatureCollection",
    features: points.map((point) => ({
      type: "Feature",
      properties: {
        point,
        isSelected: selectedPoint?.id === point.id,
      },
      geometry: {
        type: "Point",
        coordinates: [point.longitude, point.latitude],
      },
    })),
  };

  return (
    <Source
      id="stores"
      type="geojson"
      data={geojsonData}
      cluster
      clusterMaxZoom={12}
      clusterRadius={50}
    >
      <Layer {...clusterLayer} />
      <Layer {...clusterCountLayer} />
      <Layer {...unclusteredPointLayer} />
    </Source>
  );
};

export default Clusters;
