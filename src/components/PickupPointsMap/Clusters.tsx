import React from "react";
import { Layer, Source } from "react-map-gl/maplibre";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers";
import { RaddOperator } from "src/model";

interface RegionClusterProps {
  points: Array<RaddOperator>;
  selectedPoint: RaddOperator | null;
}

const Clusters: React.FC<RegionClusterProps> = ({ points, selectedPoint }) => {
  const geojsonData: GeoJSON.GeoJSON = {
    type: "FeatureCollection",
    features: points.map((point) => ({
      type: "Feature",
      properties: {
        point,
        isSelected: selectedPoint?.locationId === point.locationId,
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
