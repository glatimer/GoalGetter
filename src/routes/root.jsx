import Header from "../components/header";
import { FaPenToSquare } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";

export function Root() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/main">
              <IoHome />
            </a>
          </li>
          <div style={{ padding: `2em` }}>
            <h1 style={{ marginBottom: `0%` }}>RunMate</h1>
            <h2 style={{ marginTop: `0%`, fontSize: `18px` }}>
              Every Step Counts
            </h2>
          </div>

          <li>
            <a href="/journal">
              <FaPenToSquare />
            </a>
          </li>
        </ul>
      </nav>
      <Header />
    </div>
  );
}
