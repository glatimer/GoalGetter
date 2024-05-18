import React from "react";

export default function Header() {
  return (
    <div className="container">
      <img
        style={{ objectFit: `cover`, backgroundColor: `#1a0841` }}
        src="/horizon_run.png"
        alt="A runner conquering a horizon."
      />
    </div>
  );
}
