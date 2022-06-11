import "../css/App.css";
import NavigationBar from "./navigationBar";
import Home from "../pages/Home";
import MatchDetails from "../pages/MatchDetails";
import SeriesDetails from "../pages/SeriesDetails";
import { Routes, Route } from "react-router-dom";

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
