import React from 'react';
import MapRun from './MapRun';
import Weather from './Weather';


const App = () => {
  return (
    <div className="App">
      <h1>Running Dashboard</h1>
      <MapRun />
      <Weather />
    </div>
  );
};

export default App;
