import React from "react";
import { Layer, Source } from "react-map-gl/maplibre";
import { RaddOperator } from "src/model";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";

interface RegionClusterProps {
  points: RaddOperator[];
}

const Clusters: React.FC<RegionClusterProps> = ({ points }) => {
  const geojsonData: GeoJSON.GeoJSON = {
    type: "FeatureCollection",
    features: points.map((point) => ({
      type: "Feature",
      properties: {
        name: point.denomination,
        address: point.address,
        region: point.region,
        province: point.province,
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
      clusterRadius={70}
    >
      <Layer {...clusterLayer} />
      <Layer {...clusterCountLayer} />
      <Layer {...unclusteredPointLayer} />
    </Source>
  );
};

export default Clusters;
