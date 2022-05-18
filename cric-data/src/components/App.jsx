import "../css/App.css";
import MatchCard from "./matchCard";
import NavigationBar from "./navigationBar";

function App() {
  return (
    <>
      <NavigationBar />

      <div className="responsive-flex">
        <MatchCard />
      </div>
    </>
  );
}

export default App;
