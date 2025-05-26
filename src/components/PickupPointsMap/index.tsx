import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { RaddOperator } from "src/model";

type Props = {
  points: Array<RaddOperator>;
};

const PickupPointsMap: React.FC<Props> = ({ points }) => {
  return (
    <MapContainer
      center={[41.895679, 12.482802]}
      zoom={10}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default PickupPointsMap;
