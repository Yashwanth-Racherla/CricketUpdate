import "../css/App.css";
import MatchCards from "./matchCards";
import NavigationBar from "./navigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <div className="md:flex md:justify-center md:flex-wrap">
        <MatchCards />
      </div>
    </>
  );
}

export default App;
