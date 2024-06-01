// QuoteDisplay.jsx
import React, { useState, useEffect } from "react";

export default function QuoteDisplay() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
      });
  };

  return (
    <div className="container">
      <div className="quote">
        <p>{quote}</p>
      </div>
    </div>
  );
}
