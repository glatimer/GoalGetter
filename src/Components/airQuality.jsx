// airQulaity.jsx is a child component of weather.jsx that recieves data from the same fetch
// I only want to grab the data for TODAY and display it in a gauge
import { calculateAQI } from "../utils/calculate-aqi";
import { aqiColors } from "../utils/air-polution-colors";

export default function AirQuality({ aqiData }) {
  let { co, no2, o3, so2, pm2_5, pm10 } = aqiData;
  if (!aqiData) {
    return <div>Air quality data not found.</div>;
  }

  // Prep each value for AQI calculation
  pm2_5 = Number.parseFloat(pm2_5).toFixed(1);
  pm10 = Math.round(pm10);
  co = (co * 24.45) / 28; // needs conversion to ppm
  co = Number.parseFloat(co).toFixed(1);
  so2 = ((so2 * 24.45) / 64) * 1000; // needs conversion to ppb
  so2 = Math.round(so2);
  no2 = ((no2 * 24.45) / 46) * 1000; // needs conversion to ppb
  no2 = Math.round(no2);
  o3 = (o3 * 24.45) / 48; // needs conversion to ppm
  o3 = Number.parseFloat(o3).toFixed(3);

  // for testing
  console.log("PM2.5 = ", pm2_5);
  console.log("PM10 = ", pm10);
  console.log("co = ", co);
  console.log("so2 = ", so2);
  console.log("no2 = ", no2);
  console.log("o3 = ", o3);

  // Calculate and store current AQIs
  const [pm2_5AQI, pm2_5grade] = calculateAQI(pm2_5, "pm2_5");
  const [pm10AQI, pm10grade] = calculateAQI(pm10, "pm10");
  const [coAQI, co_grade] = calculateAQI(co, "co");
  const [so2AQI, so_grade] = calculateAQI(so2, "so2");
  const [no2AQI, no2_grade] = calculateAQI(no2, "no2");
  const [o3AQI, o3_grade] = calculateAQI(o3, "o3");

  const aqiValues = [
    { name: "pm2_5", aqi: pm2_5AQI, grade: pm2_5grade },
    { name: "pm10", aqi: pm10AQI, grade: pm10grade },
    { name: "co", aqi: coAQI, grade: co_grade },
    { name: "so2", aqi: so2AQI, grade: so_grade },
    { name: "no2", aqi: no2AQI, grade: no2_grade },
    { name: "o3", aqi: o3AQI, grade: o3_grade },
  ];

  // Find the highest AQI of the pollutants
  let finalAQI = 0;
  let finalName = "";
  let finalGrade = 0;
  aqiValues.forEach((element) => {
    console.log(element);
    if (element.aqi >= finalAQI) {
      finalAQI = element.aqi;
      finalName = element.name;
      finalGrade = element.grade;
    }
  });

  // calculate air quality based on highest pollutant
  const index = 0;
  if (finalName === "pm2_5") {
  }
  console.log(
    "Name: ",
    finalName,
    "largest: ",
    finalAQI,
    "Grade: ",
    finalGrade
  );

  // create gauge using D3.js
}
