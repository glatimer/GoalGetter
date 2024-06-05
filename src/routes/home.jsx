import React from "react";
import Navbar from "../Components/navbar";
import QuoteDisplay from "../Components/quotes";
import Weather from "../Components/weather";
import Maps from "../Components/map";
import AirQuality from "../Components/airQuality";
import UVIndex from "../Components/uvIndex";


export function Home() {
  return (
    <>
      <section className="container-body">
        <main className="home">
          <div className="navbar">
            <Navbar />
          </div>
          <div className="quote">
            <QuoteDisplay />
          </div>
          <div className="weather">
            <Weather />
          </div>
          <div className="aqi">
            <AirQuality />
          </div>
          <div className="map">
            <Maps />
          </div>
        </main>
      </section>
    </>
  );
}
