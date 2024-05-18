import React, { useState, useEffect } from 'react';

const MapRun = () => {
  const [map, setMap] = useState(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    // Load Google Maps API script dynamically
    const script = document.createElement('script');
    script.src = `https://developers.google.com/maps`;
    script.async = true;
    document.body.appendChild(script);
    script.onload = initMap;

    return () => {
      // Clean up map when component unmounts
      if (map) {
        map.setMap(null);
      }
    };
  }, []);

  const initMap = () => {
    // Initialize map
    const google = window.google;
    const mapInstance = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 0, lng: 0 },
      zoom: 15,
    });
    setMap(mapInstance);

    // Add event listener for clicking on map to draw route
    mapInstance.addListener('click', addLatLng);
  };

  const addLatLng = (event) => {
    // Add a marker and path to map
    const google = window.google;
    const path = new google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });
    path.setMap(map);
    const latLng = event.latLng;
    path.getPath().push(latLng);

    // Calculate distance
    const newDistance = google.maps.geometry.spherical.computeLength(path.getPath()) / 1609.344; // Convert meters to miles
    setDistance(newDistance.toFixed(2));
  };

  return (
    <div className="map-run">
      <h2>Map a Run</h2>
      <div id="map" style={{ width: '100%', height: '400px', marginTop: '20px' }}></div>
      <p>Total Distance: {distance} miles</p>
    </div>
  );
};

export default MapRun;
