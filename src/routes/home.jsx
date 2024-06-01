import React from "react";
import Navbar from "../Components/navbar";
import QuoteDisplay from "../Components/quotes";
import Weather from "../Components/weather";

export function Home() {
  return (
    <>
      <body className="container-body">
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
        </main>
      </body>
    </>
  );
}
