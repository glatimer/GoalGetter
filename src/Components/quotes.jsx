// QuoteDisplay.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function QuoteDisplay() {
  const [quote, setQuote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/random");
      setQuote(response.data.content);
    } catch (error) {
      setError("Error fetching quote: " + error.message);
    }
  };

  return (
    <div className="container">
      {error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="quote">
          <p>{quote}</p>
        </div>
      )}
    </div>
  );
}
