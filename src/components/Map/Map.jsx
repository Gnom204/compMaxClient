// components/Map/Map.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';

// Фикс для маркера
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({ isOpen, onClose, onConfirm }) => {
  const [address, setAddress] = useState('');
  const [position, setPosition] = useState([55.751244, 37.618423]); // Москва по умолчанию
  const [debounceTimer, setDebounceTimer] = useState(null);

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        {
          headers: {
            'User-Agent': 'Your App Name',
          },
        }
      );
      const data = await response.json();
      if (data.length > 0) {
        const newPos = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setPosition(newPos);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        {
          headers: {
            'User-Agent': 'Your App Name',
          },
        }
      );
      const data = await response.json();
      setAddress(data.display_name || '');
    } catch (error) {
      console.error('Reverse geocoding error:', error);
    }
  };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (debounceTimer) clearTimeout(debounceTimer);
    setDebounceTimer(setTimeout(() => geocodeAddress(value), 1000));
  };

  const MapEvents = () => {
    useMapEvents({
      moveend: (e) => {
        const center = e.target.getCenter();
        setPosition([center.lat, center.lng]);
        reverseGeocode(center.lat, center.lng);
      },
    });
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="map-modal">
      <div className="map-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Выберите адрес доставки</h2>
        <input
          type="text"
          className="address-input"
          value={address}
          onChange={handleAddressChange}
          placeholder="Введите адрес"
        />
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Адрес доставки</Popup>
          </Marker>
          <MapEvents />
        </MapContainer>
        <button className="confirm-button" onClick={() => onConfirm(position, address)}>
          Подтвердить адрес
        </button>
      </div>
    </div>
  );
};

export default Map;
