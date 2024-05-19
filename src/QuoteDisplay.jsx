// QuoteDisplay.jsx
import React, { useState, useEffect } from 'react';

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
    <div>
      <h3>Random Quote Generation</h3>
      <p>{quote}</p>
    </div>
  );
}

export default QuoteDisplay;
