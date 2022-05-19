import "../css/App.css";
import MatchCard from "./matchCard";
import NavigationBar from "./navigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <div className="md:flex md:justify-center md:flex-wrap">
        <MatchCard />
      </div>
    </>
  );
}

export default App;
