import type { LayerProps } from "react-map-gl/maplibre";

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "points",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#0d3ee3",
      100,
      "#0d3ee3",
      750,
      "#0d3ee3",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 20, 750, 20],
  },
};

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "points",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-size": 12,
  },
  paint: {
    "text-color": "#fff",
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "symbol",
  source: "points",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "icon-image": "base-marker",
    "icon-size": 1,
  },
  paint: {
    "icon-translate": [0, -24],
  },
};
