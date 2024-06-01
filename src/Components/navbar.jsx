import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="container-fluid">
        <img
          src="/horizon_run.png"
          alt="A woman running in the sun on a trail."
        />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/home" id="home_button">
              <img src="/home_button.png" alt="A sun as the home button." />
            </a>
          </li>
          <div className="title">
            <h1>RunMate</h1>
            <h2>Every Step Counts</h2>
          </div>
          <div className="journal-button">
            <li className="nav-item">
              <a className="nav-link active " href="/journal">
                Journal <br /> Entry
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
}
