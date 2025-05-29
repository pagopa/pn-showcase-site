import "maplibre-gl/dist/maplibre-gl.css";
import * as React from "react";
import { useState, useMemo } from "react";
import MapLibreMap from "react-map-gl/maplibre";

import {
  GeolocateControl,
  NavigationControl,
  Marker,
} from "react-map-gl/maplibre";
import { RaddOperator } from "src/model";

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

  // Custom clustering logic based on zoom level
  const clusteredData = useMemo(() => {
    if (zoom >= 14) {
      // Show individual markers
      return { type: "markers" as const, data: validPoints };
    } else if (zoom >= 8 && zoom < 14) {
      // Cluster by province
      const provinceMap = new Map<string, RaddOperator[]>();

      validPoints.forEach((point) => {
        const province = point.province || "Unknown";
        if (!provinceMap.has(province)) {
          provinceMap.set(province, []);
        }
        provinceMap.get(province)!.push(point);
      });

      const clusters: ClusterData[] = Array.from(provinceMap.entries()).map(
        ([province, points]) => {
          // Calculate center point (you might want to use actual province coordinates)
          const avgLat =
            points.reduce((sum, p) => sum + p.latitude, 0) / points.length;
          const avgLng =
            points.reduce((sum, p) => sum + p.longitude, 0) / points.length;

          return {
            id: `province-${province}`,
            name: province,
            count: points.length,
            latitude: avgLat,
            longitude: avgLng,
            type: "province" as const,
          };
        }
      );

      return { type: "clusters" as const, data: clusters };
    } else {
      // Cluster by region (zoom 6-10)
      const regionMap = new Map<string, RaddOperator[]>();

      validPoints.forEach((point) => {
        const region = point.region || "Unknown";
        if (!regionMap.has(region)) {
          regionMap.set(region, []);
        }
        regionMap.get(region)!.push(point);
      });

      const clusters: ClusterData[] = Array.from(regionMap.entries()).map(
        ([region, points]) => {
          // Calculate center point (you might want to use actual region coordinates)
          const avgLat =
            points.reduce((sum, p) => sum + p.latitude, 0) / points.length;
          const avgLng =
            points.reduce((sum, p) => sum + p.longitude, 0) / points.length;

          return {
            id: `region-${region}`,
            name: region,
            count: points.length,
            latitude: avgLat,
            longitude: avgLng,
            type: "region" as const,
          };
        }
      );

      return { type: "clusters" as const, data: clusters };
    }
  }, [validPoints, zoom]);

  // Custom marker component for individual points
  const CustomMarker = ({ point }: { point: RaddOperator }) => (
    <div
      style={{
        width: "24px",
        height: "24px",
        backgroundColor: "#3b82f6",
        borderRadius: "50%",
        border: "2px solid white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        cursor: "pointer",
      }}
      title={`${point.denomination || "Pickup Point"}`}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          backgroundColor: "white",
          borderRadius: "50%",
        }}
      />
    </div>
  );

  // Cluster marker component
  const ClusterMarker = ({ cluster }: { cluster: ClusterData }) => {
    const size = Math.max(30, Math.min(40, 20 + cluster.count * 2)); // Dynamic size based on count

    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: "#1e40af",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
          cursor: "pointer",
          flexDirection: "column",
        }}
        title={`${cluster.name}: ${cluster.count} points`}
      >
        <div
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "12px",
            lineHeight: 1,
          }}
        >
          {cluster.count > 999 ? "999+" : cluster.count}
        </div>
      </div>
    );
  };

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

      {/* Render based on current clustering state */}
      {clusteredData.type === "markers"
        ? // Individual markers
          clusteredData.data.map((point, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={point.longitude}
              latitude={point.latitude}
              anchor="center"
            >
              <CustomMarker point={point} />
            </Marker>
          ))
        : // Cluster markers
          clusteredData.data.map((cluster) => (
            <Marker
              key={cluster.id}
              longitude={cluster.longitude}
              latitude={cluster.latitude}
              anchor="center"
            >
              <ClusterMarker cluster={cluster} />
            </Marker>
          ))}
    </MapLibreMap>
  );
};

export default PickupPointsMapLibre;
