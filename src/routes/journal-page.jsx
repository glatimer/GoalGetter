import React from "react";
import Navbar from "../Components/navbar";
import JournalEntry from "../Components/journalComponent";

export function Journal() {
  return (
    <>
      <Navbar />
      <section id="journal">
        <JournalEntry />
      </section>
    </>
  );
}
