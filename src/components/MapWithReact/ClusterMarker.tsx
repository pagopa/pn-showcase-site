import * as L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
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

  useEffect(() => {
    if (!map) return;

    const mcg = L.markerClusterGroup({
      showCoverageOnHover: false,
    });

    markers.forEach(({ position, text }) =>
      L.marker([position.lat, position.lng], {
        icon: L.icon({
          iconUrl: "/static/images/pointer.svg",
          iconSize: [56, 74],
          iconAnchor: [28, 74], // Il primo elemento deve essere la metà dell'iconSize
        }),
      })
        .addTo(mcg)
        .bindPopup(text)
    );

    map.addLayer(mcg);

    return () => {
      map.removeLayer(mcg);
    };
  }, [markers, map]);

  return null;
};

export default MarkerCluster;
