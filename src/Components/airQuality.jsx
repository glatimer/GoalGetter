// airQulaity.jsx is a child component of weather.jsx that recieves data from the same fetch
// I only want to grab the data for TODAY and display it in a gauge
import { calculateAQI } from "../utils/calculate-aqi";
import { aqiColors } from "../utils/air-polution-colors";

export default function AirQuality({ aqiData }) {
  let { co, no2, o3, so2, pm2_5, pm10 } = aqiData;
  if (!aqiData) {
    return <div>Air quality data not found.</div>;
  }

  // for testing
  console.log("PM2.5 = ", pm2_5);
  console.log("PM10 = ", pm10);
  console.log("co = ", co);
  console.log("so2 = ", so2);
  console.log("no2 = ", no2);
  console.log("o3 = ", o3);

  // Truncate each pollutant to prep for AQI calculation
  pm2_5 = Number.parseFloat(pm2_5).toFixed(1);
  pm10 = Math.round(pm10);
  co = Number.parseFloat(co).toFixed(1);
  so2 = Math.round(so2);
  no2 = Math.round(no2);
  o3 = Number.parseFloat(o3).toFixed(3);
  // for testing
  console.log("PM2.5 = ", pm2_5);
  console.log("PM10 = ", pm10);
  console.log("co = ", co);
  console.log("so2 = ", so2);
  console.log("no2 = ", no2);
  console.log("o3 = ", o3);

  // find the highest count of all the pollutants
  const pm2_5AQI = calculateAQI(pm2_5, "pm2_5");
  const pm10AQI = calculateAQI(pm10, "pm10");
  const coAQI = calculateAQI(co, "co");
  const so2AQI = calculateAQI(so2, "so2");
  const no2AQI = calculateAQI(no2, "no2");
  const o3AQI = calculateAQI(o3, "o3");

  const pollutantValues = [];

  console.log(
    "AQI",
    "pm2.5:",
    pm2_5AQI,
    "pm10:",
    pm10AQI,
    "co:",
    coAQI,
    "so2:",
    so2AQI,
    "no2:",
    no2AQI,
    "o3:",
    o3AQI
  );

  // calculate air quality based on highest pollutant
  const aqi = 0;

  // create gauge using D3.js
}
