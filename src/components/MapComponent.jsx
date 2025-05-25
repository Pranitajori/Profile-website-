import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import '../styles/MapComponent.css';

function ChangeMapCenter({ center }) {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.flyTo(center, 12, {
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [center, map]);
  return null;
}

const MapComponent = ({ profile }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (!profile) return;

    // Wait a tick so marker is rendered
    setTimeout(() => {
      // Find marker icon element inside the map container
      const mapEl = mapRef.current;
      if (!mapEl) return;

      // Leaflet marker icons have class 'leaflet-marker-icon'
      const markerEl = mapEl.querySelector('.leaflet-marker-icon');
      if (markerEl) {
        markerEl.classList.add('bounce');

        // Remove the class after animation ends so it can be re-applied next time
        setTimeout(() => markerEl.classList.remove('bounce'), 1000);
      }
    }, 100);
  }, [profile]);

  if (!profile || profile.latitude == null || profile.longitude == null) {
  return <div className="map">Select a profile with location to view map.</div>;
}

  const position = [profile.latitude, profile.longitude];

  const purpleMarkerSvg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 25 41" fill="none">
      <path fill="#6E59B8" stroke="#4B3F72" stroke-width="2" d="M12.5 0C5.6 0 0 5.6 0 12.5 0 22.1 12.5 41 12.5 41S25 22.1 25 12.5C25 5.6 19.4 0 12.5 0z"/>
      <circle cx="12.5" cy="12.5" r="6" fill="#fff"/>
    </svg>
  `);

  const customIcon = new L.Icon({
    iconUrl: `data:image/svg+xml,${purpleMarkerSvg}`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  return (
    <div className="map" ref={mapRef}>
      <MapContainer center={position} zoom={10} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
        <ChangeMapCenter center={position} />
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>{profile.name}'s Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
