import React from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";

export function Root() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/main">
            <IoHome />
          </a>
        </li>
        <h1>RunMate</h1>
        <h2>Every Step Counts</h2>
        <li>
          <a href="/journal">
            <FaPenToSquare />
          </a>
        </li>
      </ul>
    </nav>
  );
}
