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

// Calculate the Air Quality Index (aqi) using Equation 1 on pg. 9
function aqiFunction(C, BP_hi, BP_lo, I_hi, I_lo) {
  aqi = ((I_hi - I_lo) / (BP_hi - BP_lo)) * (C - BP_lo) + I_lo;
  return Math.round(aqi); // Round to nearest integer
}

/* ---------------- Small Particulate Matter (< 2.5 micrometers) Index Calulation ---------------- */
function calculatePM2_5(pm2_5Value) {
  // Truncate to one decimal place
  const pm2_5Concentration = Number.parseFloat(pm2_5Value).toFixed(1);

  // Check breakpoints to find BP and I values
  breakpoints.pm2_5.forEach((element) => {
    // Find breakpoint range that C falls between, Set BP and I values
    if (
      pm2_5Concentration >= element.BP_low &&
      pm2_5Concentration <= element.BP_high
    ) {
      BP_lo = element.BP_low;
      BP_hi = element.BP_high;
      I_lo = element.I_low;
      I_hi = element.I_high;

      console.log(
        "C:",
        pm2_5Concentration,
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

  if ((aqi = aqiFunction(pm2_5Concentration, BP_hi, BP_lo, I_hi, I_lo))) {
    return aqi;
  } else {
    return 0;
  }
}

// carbon monoxide index calculation
function calculateCo(coValue) {
  // truncate to one decimal place
  const coConcentration = Number.parseFloat(coValue).toFixed(1);

  //
}

export { calculatePM2_5, calculateCo };

// Academic references:
// truncate - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
// retrieve data from array of objects - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values
