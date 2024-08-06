// This file will contain the function to calculate air quality index for each pollutant
// using the breakpoints provided by https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf pg. 10: table 5
import { breakpoints } from "./air-polution-breakpoints";

// Air Quality Index (aqi) function using Equation 1 (pg. 9 of airnow.gov document)
export function aqiFunction(C, BP_hi, BP_lo, I_hi, I_lo) {
  const aqi = ((I_hi - I_lo) / (BP_hi - BP_lo)) * (C - BP_lo) + I_lo;
  return Math.round(aqi); // Round to nearest integer
}

// Calculate AQI for a pollutant
export function calculateAQI(C, pollutantName) {
  // Initialization
  let aqi = 0;
  let BP_hi = 0;
  let BP_lo = 0;
  let I_hi = 0;
  let I_lo = 0;
  let grade = 0;

  // Check breakpoints to find BP and I values
  breakpoints[pollutantName].forEach((element) => {
    // Find breakpoint range that C falls between, Set BP and I values
    if (C >= element.BP_low && C <= element.BP_high) {
      BP_lo = element.BP_low;
      BP_hi = element.BP_high;
      I_lo = element.I_low;
      I_hi = element.I_high;
      grade = element.grade;
    }
  });

  // Check for null and return AQI
  if ((aqi = aqiFunction(C, BP_hi, BP_lo, I_hi, I_lo))) {
    return [aqi, grade];
  } else {
    return [0, "Unknown"];
  }
}

// Academic references:
// truncate - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
// retrieve data from array of objects - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// round to integer - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round
