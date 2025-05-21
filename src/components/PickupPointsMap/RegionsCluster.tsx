import React, { useEffect, useState } from "react";
import { RaddOperator } from "src/model";
import MarkerCluster, { CustomMarker } from "./ClusterMarker";
import { useMap } from "react-leaflet";

interface RegionClusterProps {
  points: RaddOperator[];
}

const Clusters: React.FC<RegionClusterProps> = ({ points }) => {
  const map = useMap();
  const [currentZoom, setCurrentZoom] = useState(map.getZoom());
  const PROVINCE_ZOOM_THRESHOLD = 8; // Show provinces when zoom level is >= this value

  // Group operators by province
  const groupByProvince = points.reduce((acc, operator) => {
    const province = operator.province;
    if (!province) return acc;
    if (!acc[province]) {
      acc[province] = [];
    }
    acc[province].push(operator);
    return acc;
  }, {} as Record<string, RaddOperator[]>);

  // Create province markers
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

  // Group operators by region
  const groupByRegion = points.reduce((acc, operator) => {
    const region = operator.region;
    if (!region) return acc;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(operator);
    return acc;
  }, {} as Record<string, RaddOperator[]>);

  // Create region markers
  const regionMarkers: Record<string, CustomMarker[]> = Object.entries(
    groupByRegion
  ).reduce((acc, [region, operators]) => {
    acc[region] = operators.map((operator) => ({
      position: {
        lat: operator.latitude || 0,
        lng: operator.longitude || 0,
      },
      text: `${operator.denomination} - ${operator.city} - ${operator.address}`,
    }));
    return acc;
  }, {} as Record<string, CustomMarker[]>);

  // Update zoom level on map zoom events
  useEffect(() => {
    const handleZoomEnd = () => {
      setCurrentZoom(map.getZoom());
    };

    map.on("zoomend", handleZoomEnd);

    return () => {
      map.off("zoomend", handleZoomEnd);
    };
  }, [map]);

  // Determine which markers to show based on zoom level
  const markersToRender =
    currentZoom >= PROVINCE_ZOOM_THRESHOLD ? provinceMarkers : regionMarkers;

  return (
    <>
      {Object.entries(markersToRender).map(([id, markers]) => (
        <MarkerCluster key={id} markers={markers} />
      ))}
    </>
  );
};

export default Clusters;
