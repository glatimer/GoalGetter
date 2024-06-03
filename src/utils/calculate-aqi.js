// This file will contain all functions to calculate air quality index for each pollutant
// using the breakpoints provided by https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf pg. 10: table 5
// Pollutants calculated => co, no2, o3, so2, pm2_5, pm10
// Note to dev: At some point come back and make this more modular/less redundant

import { breakpoints } from "./air-polution-breakpoints";

// Initialization Setup
let aqi = 0;
let BP_hi = 0;
let BP_lo = 0;
let I_hi = 0;
let I_lo = 0;

// // Map the pollutant name to number of decimals for truncation
// const polNames = [
//   { name: "pm2_5", decimal: 1 },
//   { name: "pm10", decimal: 0 },
//   { name: "co", decimal: 1 },
//   { name: "so2", decimal: 0 },
//   { name: "no2", decimal: 0 },
//   { name: "o3", decimal: 3 },
// ];

// Air Quality Index (aqi) function using Equation 1 on pg. 9 of airnow.gov document
export function aqiFunction(C, BP_hi, BP_lo, I_hi, I_lo) {
  aqi = ((I_hi - I_lo) / (BP_hi - BP_lo)) * (C - BP_lo) + I_lo;
  return Math.round(aqi); // Round to nearest integer
}

// Calculate AQI for any pollutant => co, no2, o3, so2, pm2_5, pm10
export function calculateAQI(C, pollutantName) {
  //   // How many decimals to truncate for this pollutant?
  //   let dec = 0;
  //   polNames.forEach((element) => {
  //     if (pollutantName === element.name) {
  //       dec = element.decimal;
  //     }
  //   });
  //   if (dec === undefined) {
  //     return -1;
  //   }

  // Truncate pollutant value accordingly
  //   const C = Number.parseFloat(pollutantValue).toFixed(dec);

  // Check breakpoints to find BP and I values
  breakpoints[pollutantName].forEach((element) => {
    // Find breakpoint range that C falls between, Set BP and I values
    if (C >= element.BP_low && C <= element.BP_high) {
      BP_lo = element.BP_low;
      BP_hi = element.BP_high;
      I_lo = element.I_low;
      I_hi = element.I_high;

      console.log(
        "C:",
        C,
        "bpLO:",
        BP_lo,
        "bpHI:",
        BP_hi,
        "Ilo:",
        I_lo,
        "Ihi:",
        I_hi
      );
    }
  });

  // Check for null and return AQI
  if ((aqi = aqiFunction(C, BP_hi, BP_lo, I_hi, I_lo))) {
    return aqi;
  } else {
    return 0;
  }
}

// // carbon monoxide index calculation
// export function calculateCo(coValue) {
//   // truncate to one decimal place
//   const coConcentration = Number.parseFloat(coValue).toFixed(1);

//   //
// }

// export { calculatePM2_5, calculateCo };

// Academic references:
// truncate - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
// retrieve data from array of objects - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// round to integer - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
