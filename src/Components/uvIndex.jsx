// Child component of Weather.jsx
//Create a UV Index guage based on government standards
// https://www.epa.gov/sunsafety/uv-index-scale-0
import React from "react";
import GaugeComponent from "react-gauge-component";
import { uvColors } from "../utils/uv-colors";

export default function UVIndex({ uvData }) {
  if (!uvData) {
    return <div style={{ color: `red` }}>UV data not found.</div>;
  }

  let uvi = uvData;
  let advice = "";

  if (uvi >= 1 && uvi <= 2) {
    advice = "Low: No protection needed";
  } else if (uvi > 2 && uvi <= 7) {
    advice = "Moderate: Protection needed";
  } else if (uvi >= 8) {
    advice = "Extra protection needed. Be careful outside.";
  } else {
    advice = "undefined";
  }

  return (
    <>
      <div>
        <h3 style={{ color: `#e4e932` }}>UV Index</h3>
        <GaugeComponent
          value={uvi}
          minValue={0}
          maxValue={11}
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
                { value: 7 },
                { value: 8 },
                { value: 9 },
                { value: 10 },
                { value: 11 },
              ],
            },
          }}
          arc={{
            colorArray: uvColors,
            subArcs: [
              { limit: 2 },
              { limit: 5 },
              { limit: 7 },
              { limit: 9 },
              { limit: 10 },
              { limit: 11 },
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
      <div className="uv-index-text">
        <p style={{ color: `white`, fontWeight: `bold`, fontSize: `20px` }}>
          {advice}
        </p>
      </div>
    </>
  );
}
