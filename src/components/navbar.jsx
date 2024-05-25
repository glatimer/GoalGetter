import React from "react";

export default function Navbar() {
  return (
    // <div className="container-fluid img-container d-flex  justify-content-center">
    //   <img src="/horizon_run.png" alt="A runner conquering a horizon." />
    // </div>
    <nav>
      <ul className="nav_list">
        <li className="nav_item">
          <a href="/main" id="home_button">
            <img src="/home_button.png" alt="A sun as the home button." />
          </a>
        </li>
        <div style={{ padding: `2rem` }}>
          <h1 style={{ marginBottom: `0%` }}>RunMate</h1>
          <h2 style={{ marginTop: `0%`, fontSize: `18px` }}>
            Every Step Counts
          </h2>
        </div>
        <div className="nav justify-content-right">
          <li className="nav-item">
            <a
              className="nav-link active "
              href="/journal"
              style={{
                fontFamily: `monospace`,
                fontSize: `20px`,
                textAlign: `center`,
              }}
            >
              Journal <br /> Entry
            </a>
          </li>
        </div>
      </ul>
    </nav>
  );
}
