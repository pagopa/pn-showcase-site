import type { LayerProps } from "react-map-gl/maplibre";

export const clusterLayer: LayerProps = {
  id: "cluster-points",
  type: "circle",
  source: "stores",
  filter: ["==", "cluster", true],
  paint: {
    "circle-color": "#0d3ee3",
    "circle-radius": 18,
  },
};

export const clusterCountLayer: LayerProps = {
  id: "count",
  type: "symbol",
  source: "stores",
  filter: ["==", "cluster", true],
  layout: {
    "text-field": "{point_count}",
    "text-size": 12,
  },
  paint: {
    "text-color": "#fff",
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-points",
  type: "symbol",
  source: "stores",
  filter: ["!=", "cluster", true],
  layout: {
    "icon-image": [
      "case",
      ["get", "isSelected"],
      "selected-marker",
      "base-marker",
    ],
    "icon-size": ["interpolate", ["linear"], ["zoom"], 10, 0.8, 15, 1],
    "icon-allow-overlap": true,
    "icon-ignore-placement": true,
  },
  paint: {
    "icon-translate": [0, -24],
  },
};
