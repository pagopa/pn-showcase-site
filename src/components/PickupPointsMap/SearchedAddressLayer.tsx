import React from "react";
import { Layer, Marker, Source } from "react-map-gl/maplibre";
import { Coordinates } from "src/model";

type Props = {
  searchCoordinates: Coordinates | null;
};

const SearchedAddressLayer: React.FC<Props> = ({ searchCoordinates }) => {
  if (!searchCoordinates) return null;

  const geojsonData = {
    type: "FeatureCollection" as const,
    features: [
      {
        type: "Feature" as const,
        geometry: {
          type: "Point" as const,
          coordinates: [
            searchCoordinates.longitude,
            searchCoordinates.latitude,
          ],
        },
        properties: {
          coordinates: [
            searchCoordinates.longitude,
            searchCoordinates.latitude,
          ],
        },
      },
    ],
  };

  return (
    <Source id="searched-address" type="geojson" data={geojsonData}>
      <Layer
        id="searched-address-layer"
        type="symbol"
        layout={{
          "icon-image": "searched-marker",
          "icon-size": ["interpolate", ["linear"], ["zoom"], 10, 0.8, 15, 1],
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
        }}
        paint={{
          "icon-translate": [0, -24],
        }}
      />
    </Source>
  );
};

export default SearchedAddressLayer;
