import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import MatchScorecard from "../components/matchScorecard";
import { Link, useParams } from "react-router-dom";
import { getApiKey } from "../helperData/commonData";

const MatchDetails = () => {
  const { id } = useParams();
  const apiKey = getApiKey();
  const [matchData, setMatchData] = useState(null);
  const [scoreCard, setScoreCard] = useState(null);

  const showMatchData = async () => {
    const getMatchData = await fetch(
      `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&offset=0&id=${id}`
    );
    const getScoreCard = await fetch(
      `https://api.cricapi.com/v1/match_scorecard?apikey=${apiKey}&offset=0&id=${id}`
    );
    await getMatchData.json().then((res) => {
      setMatchData(res.data);
    });
    await getScoreCard.json().then((res) => {
      setScoreCard(res.data);
    });
  };
  useEffect(() => {
    showMatchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="show-popUp">
      <div className="show-popUp-data">
        {/* ======= close the pop up button ====== */}
        <button className="close-popUp">
          <Link to="/">
            <FontAwesomeIcon icon={faXmark} />
          </Link>
        </button>
        {/* ======= Match Status ======  */}
        <h2 className="font-bold py-4 text-lg sm:text-xl">
          {matchData?.status}
        </h2>
        {/* ===== Team Names ====== */}
        <div className="flex flex-wrap">
          {scoreCard?.scorecard?.map((teamScoreCard, index) => {
            return (
              <button
                key={teamScoreCard.inning}
                className="w-1/2 btn flex flex-col items-center justify-between font-bold sm:text-base"
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
        {scoreCard?.scorecard?.length > 0 && (
          <MatchScorecard scoreCardData={scoreCard?.scorecard[0]} />
        )}

        {/* ======= Match Details ====== */}
        {matchData !== null && (
          <div className="pt-8 sm:text-lg">
            <div className="font-semibold">
              <div className="flex">
                <p className="shrink-0">{`Match : `}</p>
                <p>{matchData.name}</p>
              </div>
              <div className="flex">
                <p className="shrink-0">{`Date : `}</p>
                <p>{new Date(matchData.dateTimeGMT).toDateString()}</p>
              </div>
              <div className="flex">
                <p className="shrink-0">{`Venue : `}</p>
                <p>{matchData.venue}</p>
              </div>
              <div className="flex ">
                <p className="shrink-0">{`Toss : `}</p>
                <p>{`${matchData.tossWinner} won the toss and opted to ${matchData.tossChoice} first`}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;
