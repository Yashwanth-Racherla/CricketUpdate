import NavigationBar from "./navigationBar";
import MatchDetails from "../pages/MatchDetails";
import SeriesDetails from "../pages/SeriesDetails";
import "../css/App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const App = () => {
  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/seriesdetails/:id" element={<SeriesDetails />} />
        <Route path="/matchdetails/:id" element={<MatchDetails />} />
      </Routes>
    </>
  );
};

export default App;
