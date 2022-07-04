import "../css/App.css";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../pages/Home";
import MatchDetails from "../pages/MatchDetails";
import SeriesDetails from "../pages/SeriesDetails";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-[#FFF2F0]">
      <Header />
      <div className="w-[90%] sm:w-4/5 max-w-[1200px] mx-auto ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seriesdetails/:seriesId" element={<SeriesDetails />} />
          <Route path="/matchdetails/:matchId" element={<MatchDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
