import React from "react";
import Navbar from "../Components/navbar";
import QuoteDisplay from "../Components/quotes";

export function Home() {
  return (
    <>
      <div id="home">
        <Navbar />
        <QuoteDisplay />
      </div>
    </>
  );
}
