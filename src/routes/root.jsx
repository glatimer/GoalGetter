import Header from "../components/header";
import { FaPenToSquare } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";

export function Root() {
  return (
    <div>
      <Header />
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
    </div>
  );
}
