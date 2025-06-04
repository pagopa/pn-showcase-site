import type { LayerProps } from "react-map-gl/maplibre";

export const clusterLayer: LayerProps = {
  id: "points",
  type: "circle",
  source: "stores",
  filter: ["==", "cluster", true],
  paint: {
    "circle-color": "#0d3ee3",
    "circle-radius": 20,
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
    "icon-image": "base-marker",
    "icon-size": 1,
  },
  paint: {
    "icon-translate": [0, -24],
  },
};
