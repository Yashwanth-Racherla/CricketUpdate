import React, { useEffect, useState } from "react";
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
    <div className="text-sm">
      {/* ======= close button ====== */}
      <button className="close-button " onClick={() => navigate(-1)}>
        <ion-icon class="w-9 h-9" name="close-outline"></ion-icon>
      </button>
      {/* ======= Match Status ======  */}
      <div className="px-2 pt-16">
        <h2 className="font-bold py-4 text-lg sm:text-xl">
          {matchInfo?.status}
        </h2>
        {/* ===== Team Names ====== */}
        <div className="grid grid-cols-2 gap-2">
          {matchScoreCard?.scorecard?.map((teamScoreCard, index) => {
            return (
              <button
                key={teamScoreCard.inning}
                className="button flex flex-col items-center justify-between font-bold sm:text-base"
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
          <MatchScorecard
            scoreCardData={matchScoreCard?.scorecard[inningsNum]}
          />
        )}
        {/* ======= Match Details ====== */}
        {matchInfo !== null && (
          <div className="py-8 sm:text-lg">
            <div className="font-semibold">
              <div className="flex">
                <p className="shrink-0">{`Match : `}</p>
                <p>{matchInfo?.name}</p>
              </div>
              <div className="flex">
                <p className="shrink-0">{`Date : `}</p>
                <p>{new Date(matchInfo?.dateTimeGMT).toDateString()}</p>
              </div>
              <div className="flex">
                <p className="shrink-0">{`Venue : `}</p>
                <p>{matchInfo?.venue}</p>
              </div>
              <div className="flex ">
                <p className="shrink-0">{`Toss : `}</p>
                <p>{`${matchInfo?.tossWinner} won the toss and opted to ${matchInfo?.tossChoice} first`}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;
