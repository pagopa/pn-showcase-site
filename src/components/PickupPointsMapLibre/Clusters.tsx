// Clusters.tsx
import React from "react";
import { Layer, Source, useMap } from "react-map-gl/maplibre";
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
  const map = useMap();
  const zoom = map.current?.getZoom() || 10;

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

  const getCluserRadius = (zoom: number): number => {
    if (zoom < 8) return 20;
    if (zoom < 10) return 30;
    return 50;
  };

  return (
    <Source
      id="points"
      type="geojson"
      data={geojsonData}
      cluster={true}
      clusterMaxZoom={12}
      clusterRadius={getCluserRadius(zoom)}
    >
      <Layer {...clusterLayer} />
      <Layer {...clusterCountLayer} />
      <Layer {...unclusteredPointLayer} />
    </Source>
  );
};

export default Clusters;
