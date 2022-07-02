import "../css/App.css";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../pages/Home";
import MatchDetails from "../pages/MatchDetails";
import SeriesDetails from "../pages/SeriesDetails";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seriesdetails/:id" element={<SeriesDetails />} />
        <Route path="/matchdetails/:id" element={<MatchDetails />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
