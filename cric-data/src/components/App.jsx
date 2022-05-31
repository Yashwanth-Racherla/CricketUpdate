import NavigationBar from "./navigationBar";
// import MatchDetails from "../pages/MatchDetails";
import SeriesDetails from "../pages/SeriesDetails";
import "../css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";

const App = () => {
  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/seriesdetails/:id" element={<SeriesDetails />} />
        {/*<Route
          path="/MatchDetails"
          exact
          element={
            <MatchDetails
              closeMatchData={closeMatchData}
              cricMatchData={cricMatchData}
              cricMatchScoreCard={cricMatchScoreCard}
              activeInningsNum={activeInningsNum}
              setActiveInningsNum={setActiveInningsNum}
            />
          }
        /> */}
      </Routes>
    </>
  );
};

export default App;
