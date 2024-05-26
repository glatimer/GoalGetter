import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { polyline } from 'leaflet';

export default function App (){
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data');
        const coordinates = response.data.route.map(point => [point.lat, point.lng]);
        setRoute(coordinates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalMiles = (route) => {
    if (!route) return 0;
    const totalMeters = polyline(route).getDistance();
    return totalMeters / 1609.34; // Convert meters to miles
  };

  const totalMiles = calculateTotalMiles(route);

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {route && <Polyline positions={route} />}
      </MapContainer>
      <div>Total Miles: {totalMiles.toFixed(2)}</div>
    </div>
  );
};

