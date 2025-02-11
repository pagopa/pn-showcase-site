"use client";

import L from "leaflet";
import React, { Fragment } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { RaddOperator } from "../model";
import MarkerCluster from "./Map/ClusterMarker";

type Props = {
  points: Array<RaddOperator>;
};

const getIcon = (iconUrl: string) => {
  return L.icon({
    iconUrl,
    iconSize: [56, 74],
    iconAnchor: [28, 74], // Il primo elemento deve essere la metà dell'iconSize
  });
};

const PickupPointsMap: React.FC<Props> = ({ points }) => {
  return (
    <MapContainer
      center={[41.8719, 12.5674]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((point) => {
        if (point.latitude && point.longitude) {
          return (
            <Fragment key={`${point.denomination}-${point.address}`}>
              {/* <Marker
                position={[point.latitude, point.longitude]}
                icon={getIcon("/static/images/pointer.svg")}
              >
                <Popup closeButton={true}>{point.address}</Popup>
              </Marker> */}
              <MarkerCluster
                markers={points.map((p) => {
                  return {
                    position: { lat: p.latitude || 0, lng: p.longitude || 0 },
                    text: p.address,
                  };
                })}
              />
            </Fragment>
          );
        }
      })}
    </MapContainer>
  );
};

export default PickupPointsMap;
