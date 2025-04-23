import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapComponent() {
  return (
    <MapContainer
      center={[46.204391, 6.1431]}
      zoom={13}
      style={{ height: '400px', width: '100%', zIndex: '3' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />
      <Marker position={[46.176462, 6.127208]}>
        <Popup>Village du soir, bonsoir !</Popup>
      </Marker>
    </MapContainer>
  )
}
