import React from "react";
import { RaddOperator } from "src/model";
import MarkerCluster, { CustomMarker } from "./ClusterMarker";

interface ProvinceClusterProps {
  points: RaddOperator[];
}

const ProvinceCluster: React.FC<ProvinceClusterProps> = ({ points }) => {
  const groupByProvince = points.reduce((acc, operator) => {
    const province = operator.province;
    if (!acc[province]) {
      acc[province] = [];
    }
    acc[province].push(operator);
    return acc;
  }, {} as Record<string, RaddOperator[]>);

  const provinceMarkers: Record<string, CustomMarker[]> = Object.entries(
    groupByProvince
  ).reduce((acc, [province, operators]) => {
    acc[province] = operators.map((operator) => ({
      position: {
        lat: operator.latitude || 0,
        lng: operator.longitude || 0,
      },
      text: `${operator.denomination} - ${operator.city} - ${operator.address}`,
    }));
    return acc;
  }, {} as Record<string, CustomMarker[]>);

  return (
    <>
      {Object.entries(provinceMarkers).map(([province, markers]) => (
        <MarkerCluster key={province} markers={markers} />
      ))}
    </>
  );
};

export default ProvinceCluster;
