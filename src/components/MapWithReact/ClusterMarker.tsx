import * as L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

export interface CustomMarker {
  position: {
    lat: number;
    lng: number;
  };
  text: string;
}

interface MarkerClusterProps {
  markers: CustomMarker[];
}

const MarkerCluster: React.FC<MarkerClusterProps> = ({ markers }) => {
  const map = useMap();
  const clusterLayerRef = useRef<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (!map) return;

    // Clean up previous layer if it exists
    if (clusterLayerRef.current) {
      map.removeLayer(clusterLayerRef.current);
    }

    // Create new marker cluster group
    const mcg = L.markerClusterGroup({
      spiderfyOnMaxZoom: false,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      maxClusterRadius: 120,
    });

    // Add markers to the cluster group
    markers.forEach(({ position, text }) =>
      L.marker([position.lat, position.lng], {
        icon: L.icon({
          iconUrl: "/static/images/pointer.svg",
          iconSize: [56, 74],
          iconAnchor: [28, 74],
        }),
      })
        .addTo(mcg)
        .bindPopup(text)
    );

    map.addLayer(mcg);
    clusterLayerRef.current = mcg;

    // Clean up on unmount
    return () => {
      if (clusterLayerRef.current) {
        map.removeLayer(clusterLayerRef.current);
      }
    };
  }, [markers, map]);

  return null;
};

export default MarkerCluster;
