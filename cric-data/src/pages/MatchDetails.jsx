import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import MatchScorecard from "../components/MatchScorecard";
import { useNavigate, useParams } from "react-router-dom";
import { getApiKey } from "../helperData/commonData";

const MatchDetails = () => {
  const { id } = useParams();
  const apiKey = getApiKey();
  const navigate = useNavigate();
  const [matchInfo, setMatchInfo] = useState(null);
  const [matchScoreCard, setMatchScoreCard] = useState(null);
  const [inningsNum, setInningsNum] = useState(0);

  const showMatchData = async () => {
    const getMatchInfo = await fetch(
      `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&offset=0&id=${id}`
    );
    const getMatchScoreCard = await fetch(
      `https://api.cricapi.com/v1/match_scorecard?apikey=${apiKey}&offset=0&id=${id}`
    );
    await getMatchInfo.json().then((res) => {
      setMatchInfo(res.data);
    });
    await getMatchScoreCard.json().then((res) => {
      setMatchScoreCard(res.data);
      // console.log(res);
    });
  };
  useEffect(() => {
    showMatchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showScoreCard = (id) => {
    setInningsNum(id);
  };

  return (
    <div className="p-2 text-sm ">
      {/* ======= close the pop up button ====== */}
      <button className="close-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {/* ======= Match Status ======  */}
      <h2 className="font-bold py-4 text-lg sm:text-xl">{matchInfo?.status}</h2>
      {/* ===== Team Names ====== */}
      <div className="flex flex-wrap">
        {matchScoreCard?.scorecard?.map((teamScoreCard, index) => {
          return (
            <button
              key={teamScoreCard.inning}
              className="w-1/2 button flex flex-col items-center justify-between font-bold sm:text-base"
              onClick={() => showScoreCard(index)}
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
      {matchScoreCard?.scorecard?.length > 0 && (
        <MatchScorecard scoreCardData={matchScoreCard?.scorecard[inningsNum]} />
      )}

      {/* ======= Match Details ====== */}
      {matchInfo !== null && (
        <div className="pt-8 sm:text-lg">
          <div className="font-semibold">
            <div className="flex">
              <p className="shrink-0">{`Match : `}</p>
              <p>{matchInfo.name}</p>
            </div>
            <div className="flex">
              <p className="shrink-0">{`Date : `}</p>
              <p>{new Date(matchInfo.dateTimeGMT).toDateString()}</p>
            </div>
            <div className="flex">
              <p className="shrink-0">{`Venue : `}</p>
              <p>{matchInfo.venue}</p>
            </div>
            <div className="flex ">
              <p className="shrink-0">{`Toss : `}</p>
              <p>{`${matchInfo.tossWinner} won the toss and opted to ${matchInfo.tossChoice} first`}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetails;
