import React from "react";
import { FaPencilAlt } from "react-icons/fa";

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
        </ul>
        <div className="journal-button">
          <a className="nav-link" href="/journal">
            <FaPencilAlt style={{ color: `white`, margin: `0 10px 0 0` }} />
            Journal
          </a>
        </div>
      </nav>
    </>
  );
}
