import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import { Icon } from "leaflet";

export default function LeafletMap() {

    const customIcon = new Icon({
        iconUrl: "/svg/map-marker.svg",
        iconSize: [38, 38],
    });

    return (
        <MapContainer center={[56.40464943513625, 10.887165776612292]} zoom={15} className="w-full h-80">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[56.40464943513625, 10.887165776612292]} icon={customIcon}>
            </Marker>
        </MapContainer>
    )
};