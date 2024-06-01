import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap, useMapEvents, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './App.css';

// Custom icons
const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
  shadowSize: [41, 41]
});

export default function App() {
  const [route, setRoute] = useState(null);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [sourceLocation, setSourceLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [sourceSearchInput, setSourceSearchInput] = useState('');
  const [destinationSearchInput, setDestinationSearchInput] = useState('');
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default center
  const [travelMode, setTravelMode] = useState('bike');

  const travelSpeeds = {
    bike: 12.5, // average speed in mph
    cycle: 15, // average speed in mph
    walk: 3, // average speed in mph
    jogging: 6 // average speed in mph
  };

  useEffect(() => {
    const fetchRoute = async () => {
      if (source && destination) {
        try {
          const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${source[0]},${source[1]}&destination=${destination[0]},${destination[1]}&key=YOUR_GOOGLE_MAPS_API_KEY`);
          const points = response.data.routes[0].overview_polyline.points;
          const coordinates = decodePolyline(points);
          setRoute(coordinates);
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      }
    };

    fetchRoute();
  }, [source, destination]);

  const decodePolyline = (polyline) => {
    let current = 0;
    let next;
    let lat = 0;
    let lng = 0;
    const coordinates = [];

    while (current < polyline.length) {
      let shift = 0;
      let result = 0;

      do {
        next = polyline.charCodeAt(current++) - 63;
        result |= (next & 0x1f) << shift;
        shift += 5;
      } while (next >= 0x20);

      const deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += deltaLat;

      shift = 0;
      result = 0;

      do {
        next = polyline.charCodeAt(current++) - 63;
        result |= (next & 0x1f) << shift;
        shift += 5;
      } while (next >= 0x20);

      const deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += deltaLng;

      coordinates.push([lat / 1e5, lng / 1e5]);
    }

    return coordinates;
  };

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

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in metres
    return distance / 1609.34; // in miles
  };

  const totalMiles = calculateDistance(source, destination);

  const calculateTravelTime = (miles, mode) => {
    if (!miles || !mode || !travelSpeeds[mode]) return 0;
    return miles / travelSpeeds[mode];
  };

  const travelTime = calculateTravelTime(totalMiles, travelMode);

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

  const handleTravelModeChange = (event) => {
    setTravelMode(event.target.value);
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
          {route && <Polyline positions={route} color="red" />} {/* Route highlighted in red */}
          {source && Array.isArray(source) && source[0] && source[1] && (
            <Marker position={source} icon={greenIcon}>
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
            <Marker position={destination} icon={redIcon}>
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
        <div>
          <strong>Travel Mode:</strong>
          <div>
            <label>
              <input
                type="radio"
                value="bike"
                checked={travelMode === 'bike'}
                onChange={handleTravelModeChange}
              />
              Bike
            </label>
            <label>
              <input
                type="radio"
                value="cycle"
                checked={travelMode === 'cycle'}
                onChange={handleTravelModeChange}
              />
              Cycle
            </label>
            <label>
              <input
                type="radio"
                value="walk"
                checked={travelMode === 'walk'}
                onChange={handleTravelModeChange}
              />
              Walk
            </label>
            <label>
              <input
                type="radio"
                value="jogging"
                checked={travelMode === 'jogging'}
                onChange={handleTravelModeChange}
              />
              Jogging
            </label>
          </div>
        </div>
        <div>
          <strong>Estimated Time:</strong> {travelTime.toFixed(2)} hours
        </div>
      </div>
    </div>
  );
}
