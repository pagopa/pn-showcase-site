import { useEffect } from "react";
import { useMap } from "react-leaflet";
import * as L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";

interface Marker {
  position: {
    lat: number;
    lng: number;
  };
  text: string;
}

interface MarkerClusterProps {
  markers: Marker[];
}

const MarkerCluster: React.FC<MarkerClusterProps> = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const mcg = L.markerClusterGroup({ showCoverageOnHover: false });

    // Add markers to the cluster group
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

    // Add the cluster group to the map
    map.addLayer(mcg);

    // Cleanup function to remove the cluster group when the component unmounts
    return () => {
      map.removeLayer(mcg);
    };
  }, [markers, map]);

  return null;
};

export default MarkerCluster;
