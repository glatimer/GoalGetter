import Header from "../components/header";

export function Root() {
  return (
    <div>
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

          <li>
            <a href="/journal">
              <img
                id="journal"
                src="/journal_button.png"
                alt="A pen as the journal button"
              />
            </a>
          </li>
        </ul>
      </nav>
      <Header />
    </div>
  );
}
