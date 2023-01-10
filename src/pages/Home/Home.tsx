import Counter from "../../components/Counter/Counter";
import reactLogo from "./react.svg";
import "./Home.css";

export default Home;

function Home() {
  return (
    <div className="Home">
      <div>
        <img src="/vite.svg" className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Vite + React + TS + SSR</h1>
      <Counter />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}
