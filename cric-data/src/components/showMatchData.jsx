import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import MatchScorecard from "./matchScorecard";
import { Link } from "react-router-dom";

const ShowMatchData = ({
  closeMatchData,
  cricMatchData,
  cricMatchScoreCard,
  activeInningsNum,
  setActiveInningsNum,
}) => {
  return (
    <div className="show-popUp">
      <div className="show-popUp-data max-w-3xl">
        {/* ======= close the pop up button ====== */}
        <button className="close-popUp">
          <Link to="/">
            <FontAwesomeIcon icon={faXmark} onClick={() => closeMatchData()} />
          </Link>
        </button>
        {/* ======= Match Status ======  */}
        <h2 className="font-bold py-4 text-lg sm:text-xl">
          {cricMatchData.status}
        </h2>
        {/* ===== Team Names ====== */}
        <div className="flex flex-wrap">
          {cricMatchScoreCard?.scorecard?.map((teamScoreCard, index) => {
            return (
              <button
                key={teamScoreCard.inning}
                className="w-1/2 btn flex flex-col items-center justify-between font-bold sm:text-base"
                onClick={() => setActiveInningsNum(index)}
              >
                <span>{teamScoreCard.inning.replace("Inning 1", "")}</span>
                <span>
                  {`${teamScoreCard.totals?.R}/${teamScoreCard.totals?.W}
                      (${teamScoreCard.totals?.O})`}
                </span>
              </button>
            );
          })}
        </div>
        {/* ====== Match Scorecard Component ===== */}
        <MatchScorecard
          scoreCardData={cricMatchScoreCard?.scorecard[activeInningsNum]}
        />

        {/* ======= Match Details ====== */}
        <div className="pt-8 sm:text-lg">
          <div className="font-semibold">
            <div className="flex">
              <p className="shrink-0">{`Match : `}</p>
              <p>{cricMatchData.name}</p>
            </div>
            <div className="flex">
              <p className="shrink-0">{`Date : `}</p>
              <p>{new Date(cricMatchData.dateTimeGMT).toDateString()}</p>
            </div>
            <div className="flex">
              <p className="shrink-0">{`Venue : `}</p>
              <p>{cricMatchData.venue}</p>
            </div>
            <div className="flex ">
              <p className="shrink-0">{`Toss : `}</p>
              <p>{`${cricMatchData.tossWinner} won the toss and opted to ${cricMatchData.tossChoice} first`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMatchData;
