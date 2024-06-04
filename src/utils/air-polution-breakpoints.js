// Breakpoints for the varying levels of severity for each pollutant
// based on https://www.airnow.gov/sites/default/files/2020-05/aqi-teBPhniBPal-assistanBPe-doBPument-sept2018.pdf pg. 10
// to be used in the airQuality gauge component. Generated with help from CGPT.
/*
C => pollutant concentration value (provided by api fetch)
BP => pollutant concentration breakpoint
  BP_low -> BP_high = floor and ceiling of breakpoint threshold
I => pollution index
  I_low -> I_high = floor and ceiling of AQI value for breakpoint

1) Find BP_high and BP_low that C falls between.  
2) The Index is found according to the associated BP range.
*/

export const breakpoints = {
  pm2_5: [
    { BP_low: 0.0, BP_high: 12.0, I_low: 0, I_high: 50, grade: 1 }, // Good
    { BP_low: 12.1, BP_high: 35.4, I_low: 51, I_high: 100, grade: 2 }, // Moderate
    { BP_low: 35.5, BP_high: 55.4, I_low: 101, I_high: 150, grade: 3 }, // Unhealthy for Sensitive Groups
    { BP_low: 55.5, BP_high: 150.4, I_low: 151, I_high: 200, grade: 4 }, // Unhealthy
    { BP_low: 150.5, BP_high: 250.4, I_low: 201, I_high: 300, grade: 5 }, // Very unhealthy
    { BP_low: 250.5, BP_high: 350.4, I_low: 301, I_high: 400, grade: 6 }, // Hazardous
    { BP_low: 350.5, BP_high: 500.4, I_low: 401, I_high: 500, grade: 7 }, // Hazardous
  ],
  pm10: [
    { BP_low: 0, BP_high: 54, I_low: 0, I_high: 50, grade: 1 },
    { BP_low: 55, BP_high: 154, I_low: 51, I_high: 100, grade: 2 },
    { BP_low: 155, BP_high: 254, I_low: 101, I_high: 150, grade: 3 },
    { BP_low: 255, BP_high: 354, I_low: 151, I_high: 200, grade: 4 },
    { BP_low: 355, BP_high: 424, I_low: 201, I_high: 300, grade: 5 },
    { BP_low: 425, BP_high: 504, I_low: 301, I_high: 400, grade: 6 },
    { BP_low: 505, BP_high: 604, I_low: 401, I_high: 500, grade: 7 },
  ],
  co: [
    { BP_low: 0.0, BP_high: 4.4, I_low: 0, I_high: 50, grade: 1 },
    { BP_low: 4.5, BP_high: 9.4, I_low: 51, I_high: 100, grade: 2 },
    { BP_low: 9.5, BP_high: 12.4, I_low: 101, I_high: 150, grade: 3 },
    { BP_low: 12.5, BP_high: 15.4, I_low: 151, I_high: 200, grade: 4 },
    { BP_low: 15.5, BP_high: 30.4, I_low: 201, I_high: 300, grade: 5 },
    { BP_low: 30.5, BP_high: 40.4, I_low: 301, I_high: 400, grade: 6 },
    { BP_low: 40.5, BP_high: 50.4, I_low: 401, I_high: 500, grade: 7 },
  ],
  so2: [
    { BP_low: 0, BP_high: 35, I_low: 0, I_high: 50, grade: 1 },
    { BP_low: 36, BP_high: 75, I_low: 51, I_high: 100, grade: 2 },
    { BP_low: 76, BP_high: 185, I_low: 101, I_high: 150, grade: 3 },
    { BP_low: 186, BP_high: 304, I_low: 151, I_high: 200, grade: 4 },
    { BP_low: 305, BP_high: 604, I_low: 201, I_high: 300, grade: 5 },
    { BP_low: 605, BP_high: 804, I_low: 301, I_high: 400, grade: 6 },
    { BP_low: 805, BP_high: 1004, I_low: 401, I_high: 500, grade: 7 },
  ],
  no2: [
    { BP_low: 0, BP_high: 53, I_low: 0, I_high: 50, grade: 1 },
    { BP_low: 54, BP_high: 100, I_low: 51, I_high: 100, grade: 2 },
    { BP_low: 101, BP_high: 360, I_low: 101, I_high: 150, grade: 3 },
    { BP_low: 361, BP_high: 649, I_low: 151, I_high: 200, grade: 4 },
    { BP_low: 650, BP_high: 1249, I_low: 201, I_high: 300, grade: 5 },
    { BP_low: 1250, BP_high: 1649, I_low: 301, I_high: 400, grade: 6 },
    { BP_low: 1650, BP_high: 2049, I_low: 401, I_high: 500, grade: 7 },
  ],
  o3: [
    { BP_low: 0.0, BP_high: 0.054, I_low: 0, I_high: 50, grade: 1 },
    { BP_low: 0.055, BP_high: 0.07, I_low: 51, I_high: 100, grade: 2 },
    { BP_low: 0.071, BP_high: 0.085, I_low: 101, I_high: 150, grade: 3 },
    { BP_low: 0.086, BP_high: 0.105, I_low: 151, I_high: 200, grade: 4 },
    { BP_low: 0.106, BP_high: 0.2, I_low: 201, I_high: 300, grade: 5 },
    { BP_low: 0.201, BP_high: 0.3, I_low: 301, I_high: 400, grade: 6 },
    { BP_low: 0.301, BP_high: 0.5, I_low: 401, I_high: 500, grade: 7 },
  ],
};
