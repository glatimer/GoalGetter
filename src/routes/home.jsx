import React from "react";
import Navbar from "../Components/navbar";
import QuoteDisplay from "../Components/quotes";
import Weather from "../Components/weather"

export function Home() {
  return (
    <>
      <div id="home">
        <Navbar />
        <QuoteDisplay />
        <Weather />
      </div>
    </>
  );
}
