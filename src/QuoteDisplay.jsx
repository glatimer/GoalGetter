// QuoteDisplay.jsx
import React, { useState, useEffect } from 'react';
import './index.css';

function QuoteDisplay() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data.content);
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
      });
  };

  return (
    <div className="quote">
      <h3><b>Quote of the day!!</b></h3>
      <p>{quote}</p>
    </div>
  );
}

export default QuoteDisplay;
