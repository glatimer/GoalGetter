// Child component of Weather.jsx
// Air quality component developed to fit government standards for ratings and colors

import React from "react";
import { calculateAQI } from "../utils/calculate-aqi";
import { aqiColors } from "../utils/air-polution-colors";
import GaugeComponent from "react-gauge-component";

export default function AirQuality({ aqiData }) {
  if (!aqiData) {
    return <div>Air quality data not found.</div>;
  }

  let { co, no2, o3, so2, pm2_5, pm10, "us-epa-index": epa } = aqiData;

  let response = "";

  // Decipher air quality value for response message
  if (epa === 1) {
    response = "Good";
  } else if (epa === 2) {
    response = "Moderate";
  } else if (epa === 3) {
    response = "Unhealthy for Sensitive Groups";
  } else if (epa === 4) {
    response = "Unhealthy";
  } else if (epa === 5) {
    response = "Very Unhealthy";
  } else if (epa === 6) {
    response = "Hazardous";
  } else {
    response = "undefined";
  }

  // Prep each value for AQI calculation
  pm2_5 = Number.parseFloat(pm2_5).toFixed(1);
  pm10 = Math.round(pm10);
  co = co * 0.873;
  co = (co * 24.45) / 28; // needs conversion to ppm
  co = Number.parseFloat(co).toFixed(1);
  so2 = ((so2 * 24.45) / 64) * 1000; // needs conversion to ppb
  so2 = Math.round(so2);
  no2 = ((no2 * 24.45) / 46) * 1000; // needs conversion to ppb
  no2 = Math.round(no2);
  o3 = (o3 * 24.45) / 48; // needs conversion to ppm
  o3 = Number.parseFloat(o3).toFixed(3);

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
    if (element.aqi >= finalAQI) {
      finalAQI = element.aqi;
      finalName = element.name;
      finalGrade = element.grade;
    }
  });

  // create gauge using GaugeComponent
  return (
    <>
      <div>
        <h3 style={{ color: `#e4e932` }}>Air Quality Index</h3>
        <GaugeComponent
          value={epa}
          minValue={0}
          maxValue={6}
          type="radial"
          labels={{
            tickLabels: {
              type: "inner",
              ticks: [
                { value: 1 },
                { value: 2 },
                { value: 3 },
                { value: 4 },
                { value: 5 },
                { value: 6 },
              ],
            },
          }}
          arc={{
            colorArray: aqiColors,
            subArcs: [
              { limit: 1 },
              { limit: 2 },
              { limit: 3 },
              { limit: 4 },
              { limit: 5 },
              { limit: 6 },
            ],
            padding: 0.02,
            width: 0.3,
          }}
          pointer={{
            elastic: true,
            animationDelay: 0,
          }}
        />
      </div>
      <div>
        <p style={{ color: `white`, fontWeight: `bold`, fontSize: `20px` }}>
          {response}
        </p>
      </div>
    </>
  );
}
