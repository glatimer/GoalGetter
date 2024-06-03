// airQulaity.jsx is a child component of weather.jsx that recieves data from the same fetch

export default function AirQuality({ aqiData }) {
  const { pm2_5, pm10 } = aqiData;

  console.log("PM2.5 = ", pm2_5);
  console.log("PM10 = ", pm10);

  // calculate air quality

  return (
    <div className="air-quality">
      <h3 style={{ fontSize: `12px` }}>Air Qaulity</h3>
      <p>pm 2.5 = {pm2_5}</p>
    </div>
  );
}
