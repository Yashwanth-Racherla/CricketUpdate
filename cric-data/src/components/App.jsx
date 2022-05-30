import NavigationBar from "./navigationBar";
import MatchDetails from "../pages/MatchDetails";
import SeriesDetails from "../pages/SeriesDetails";
import "../css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";
import Test from "../pages/test";

const App = () => {
  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/seriesdetails" element={<SeriesDetails />} />

        {/* <Route
          path="/seriesdetails"
          exact
          element={
            <SeriesDetails
              activeSeriesNum={activeSeriesNum}
              cricSeriesData={cricSeriesData}
              showMatchData={showMatchData}
              closeSeriesData={closeSeriesData}
            />
          }
        /> */}
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
