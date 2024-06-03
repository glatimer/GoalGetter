// airQulaity.jsx is a child component of weather.jsx that recieves data from the same fetch
// I only want to grab the data for TODAY and display it in a gauge
import { calculatePM2_5 } from "../utils/calculate-aqi";
import { aqiColors } from "../utils/air-polution-colors";

export default function AirQuality({ aqiData }) {
  const { co, no2, o3, so2, pm2_5, pm10 } = aqiData;
  if (!aqiData) {
    return <div>Air quality data not found.</div>;
  }

  // for testing
  console.log("co = ", co);
  console.log("no2 = ", no2);
  console.log("Po3 = ", o3);
  console.log("so2 = ", so2);
  console.log("PM2.5 = ", pm2_5);
  console.log("PM10 = ", pm10);

  // find the highest count of all the pollutants
  const pm2_5AQI = calculatePM2_5(pm2_5);
  console.log("pm2.5 AQI = ", pm2_5AQI);

  // calculate air quality based on highest pollutant
  const aqi = 0;

  // create gauge using D3.js
}
