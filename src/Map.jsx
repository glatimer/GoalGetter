import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './App.css';

export default function App() {
  const [route, setRoute] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [sourceLocation, setSourceLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [sourceSearchInput, setSourceSearchInput] = useState('');
  const [destinationSearchInput, setDestinationSearchInput] = useState('');
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default center

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin={start-lat},{start-lng}&destination={end-lat},{end-lng}&key=YOUR_GOOGLE_MAPS_API_KEY`);
        const coordinates = response.data.features[0].geometry.coordinates.map(point => [point[1], point[0]]);
        setRoute(coordinates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLocation = async (coordinates, setLocation) => {
      if (coordinates) {
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${coordinates[0]}&lon=${coordinates[1]}&format=json`);
          setLocation(response.data.display_name);
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      }
    };

    fetchLocation(source, setSourceLocation);
    fetchLocation(destination, setDestinationLocation);
  }, [source, destination]);

  const calculateDistance = (point1, point2) => {
    if (!point1 || !point2) return 0;

    const lat1 = point1[0];
    const lon1 = point1[1];
    const lat2 = point2[0];
    const lon2 = point2[1];

    const R = 6371e3; 
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; 
    return distance / 1609.34; 
  };

  const totalMiles = calculateDistance(source, destination);

  function ClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (!source) {
          setSource([lat, lng]);
        } else if (!destination) {
          setDestination([lat, lng]);
        }
      }
    });
    return null;
  }

  const handleSourceSearch = async () => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${sourceSearchInput}`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setSource([parseFloat(lat), parseFloat(lon)]);
        setMapCenter([parseFloat(lat), parseFloat(lon)]); // Move map center to searched location
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handleDestinationSearch = async () => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${destinationSearchInput}`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setDestination([parseFloat(lat), parseFloat(lon)]);
        setMapCenter([parseFloat(lat), parseFloat(lon)]); // Move map center to searched location
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const handleSourceKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSourceSearch();
    }
  };

  const handleDestinationKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleDestinationSearch();
    }
  };

  function MapCenterUpdater() {
    const map = useMap();
    useEffect(() => {
      map.setView(mapCenter);
    }, [mapCenter]);
    return null;
  }

  return (
    <div className="container">
      <div className="map">
        <MapContainer center={mapCenter} zoom={13} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapCenterUpdater />
          <ClickHandler />
          {route && <Polyline positions={route} />}
          {source && Array.isArray(source) && source[0] && source[1] && (
            <Marker position={source}>
              <Popup>
                <div>
                  <strong>Source:</strong>
                </div>
                <div>
                  <strong>Location:</strong> {sourceLocation || 'Loading...'}
                </div>
                <div>
                  <strong>Latitude:</strong> {source[0].toFixed(4)}, <strong>Longitude:</strong> {source[1].toFixed(4)}
                </div>
              </Popup>
            </Marker>
          )}
          {destination && Array.isArray(destination) && destination[0] && destination[1] && (
            <Marker position={destination}>
              <Popup>
                <div>
                  <strong>Destination:</strong>
                </div>
                <div>
                  <strong>Location:</strong> {destinationLocation || 'Loading...'}
                </div>
                <div>
                  <strong>Latitude:</strong> {destination[0].toFixed(4)}, <strong>Longitude:</strong> {destination[1].toFixed(4)}
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <div className="sidebar">
        <div className="search-form">
          <input
            type="text"
            className="city-input"
            value={sourceSearchInput}
            onChange={(e) => setSourceSearchInput(e.target.value)}
            onKeyPress={handleSourceKeyPress}
            placeholder="Enter source location"
          />
          <button className="submit-button" onClick={handleSourceSearch}>Search Source</button>
        </div>
        <div className="search-form">
          <input
            type="text"
            className="city-input"
            value={destinationSearchInput}
            onChange={(e) => setDestinationSearchInput(e.target.value)}
            onKeyPress={handleDestinationKeyPress}
            placeholder="Enter destination location"
          />
          <button className="submit-button" onClick={handleDestinationSearch}>Search Destination</button>
        </div>
        <div>
          <strong>Source:</strong> {source ? `Latitude: ${source[0]?.toFixed(4)}, Longitude: ${source[1]?.toFixed(4)}` : 'Click on the map to set source'}
        </div>
        <div>
          <strong>Destination:</strong> {destination ? `Latitude: ${destination[0]?.toFixed(4)}, Longitude: ${destination[1]?.toFixed(4)}` : 'Click on the map to set destination'}
        </div>
        <div>
          <strong>Miles:</strong> {totalMiles.toFixed(2)}
        </div>
      </div>
    </div>
  );
}
