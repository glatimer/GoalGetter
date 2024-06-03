// This file will contain all functions to calculate air quality index for each pollutant
// using the breakpoints provided by https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf pg. 10: table 5
// Pollutants calculated => co, no2, o3, so2, pm2_5, pm10
import { breakpoints } from "./air-polution-breakpoints";

// Initialization Setup
let aqi = 0;
let BP_hi = 0;
let BP_lo = 0;
let I_hi = 0;
let I_lo = 0;

// Air Quality Index (aqi) function using Equation 1 on pg. 9 of airnow.gov document
export function aqiFunction(C, BP_hi, BP_lo, I_hi, I_lo) {
  aqi = ((I_hi - I_lo) / (BP_hi - BP_lo)) * (C - BP_lo) + I_lo;
  return Math.round(aqi); // Round to nearest integer
}

// Calculate AQI for any pollutant => co, no2, o3, so2, pm2_5, pm10
export function calculateAQI(C, pollutantName) {
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

// Academic references:
// truncate - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
// retrieve data from array of objects - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// round to integer - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
