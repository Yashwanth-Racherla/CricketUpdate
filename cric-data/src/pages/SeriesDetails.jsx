import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import MatchCard from "../components/matchCard";
import { Link } from "react-router-dom";

const SeriesDetails = ({
  activeSeriesNum,
  cricSeriesData,
  showMatchData,
  closeSeriesData,
}) => {
  console.log(activeSeriesNum);
  return (
    <div className="show-popUp">
      <div className="show-popUp-data ">
        {/* ======= close the pop up button ====== */}
        <button className="close-popUp">
          <Link to="/">
            <FontAwesomeIcon icon={faXmark} onClick={() => closeSeriesData()} />
          </Link>
        </button>
        <div className="p-2 font-extrabold text-xl sm:text-3xl mt-6">
          <p className="text-center">
            {cricSeriesData[activeSeriesNum]?.data?.info?.name}
          </p>
        </div>
        {/* ======= Show All matches in a series ====== */}

        <div className="flex flex-wrap">
          {cricSeriesData[activeSeriesNum]?.data?.matchList
            ?.filter((cricMatch) => {
              return cricMatch.status !== "Match not started";
            })
            .map((cricMatch) => {
              return (
                <MatchCard
                  key={cricMatch?.id}
                  cricMatch={cricMatch}
                  className="h-auto w-full sm:w-[48%] lg:w-[30%] mx-auto my-2"
                  showMatchData={showMatchData}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
