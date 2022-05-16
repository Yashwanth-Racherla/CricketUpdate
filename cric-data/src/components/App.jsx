import { useEffect, useState } from "react";
import "../css/App.css";
import MatchCard from "./matchCard";
import NavigationBar from "./navigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <div className="p-6">
        <MatchCard />
      </div>
    </>
  );
}

export default App;
