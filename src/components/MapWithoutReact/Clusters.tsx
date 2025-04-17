import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

type MarkerData = {
  position: { lat: number; lng: number };
  text: string;
  iconUrl?: string;
};

let currentCluster: L.MarkerClusterGroup | null = null;

export const createMarkerCluster = (map: L.Map, markers: MarkerData[]) => {
  if (currentCluster) {
    map.removeLayer(currentCluster);
  }

  currentCluster = L.markerClusterGroup({
    chunkedLoading: true,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
  });

  markers.forEach((marker) => {
    const { position, text, iconUrl } = marker;

    const markerOptions: L.MarkerOptions = {};

    if (iconUrl) {
      markerOptions.icon = L.icon({
        iconUrl,
        iconSize: [56, 74],
        iconAnchor: [28, 74],
      });
    }

    const leafletMarker = L.marker(
      [position.lat, position.lng],
      markerOptions
    ).bindPopup(text);

    currentCluster?.addLayer(leafletMarker);
  });

  map.addLayer(currentCluster);

  return currentCluster;
};
