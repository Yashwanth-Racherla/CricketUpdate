import React, { useEffect, useState } from "react";
import MatchScorecard from "../components/MatchScorecard";
import { useNavigate, useParams } from "react-router-dom";
import { getApiKey } from "../helperData/commonData";
import Loading from "../components/Loading";

const MatchDetails = () => {
  const { matchId } = useParams();
  const apiKey = getApiKey();
  const navigate = useNavigate();
  const [matchInfo, setMatchInfo] = useState(null);
  const [matchScoreCard, setMatchScoreCard] = useState(null);
  const [inningsNum, setInningsNum] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const showMatchData = async () => {
    const getMatchInfo = await fetch(
      `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&offset=0&id=${matchId}`
    );
    const getMatchScoreCard = await fetch(
      `https://api.cricapi.com/v1/match_scorecard?apikey=${apiKey}&offset=0&id=${matchId}`
    );
    await getMatchInfo.json().then((res) => {
      setMatchInfo(res.data);
    });
    await getMatchScoreCard.json().then((res) => {
      setMatchScoreCard(res.data);
    });
    setIsLoading(false);
  };
  useEffect(() => {
    showMatchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showScoreCard = (id) => {
    setInningsNum(id);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="text-sm">
      {/* ======= close button ====== */}
      <div className="fixed top-16 text-right h-12 md:h-14 left-0 w-full px-[2%] pt-2 bg-[#FFF2F0]">
        <button className="close-button " onClick={() => navigate(-1)}>
          <ion-icon
            class=" w-5 h-5 md:w-9 md:h-9"
            name="close-outline"
          ></ion-icon>
        </button>
      </div>
      {/* ======= Match Status ======  */}
      <div className="px-2 pt-14 md:pt-20">
        <h2 className="font-bold py-4 text-lg sm:text-xl">
          {matchInfo?.status}
        </h2>
        {/* ===== Team Names ====== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {matchScoreCard?.scorecard?.map((teamScoreCard, index) => {
            return (
              <button
                key={teamScoreCard.inning}
                className={`button button-scorecard ${
                  inningsNum === index && "active"
                }`}
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
                <p>
                  {matchInfo?.tossWinner !== undefined
                    ? `${matchInfo?.tossWinner} won the toss and opted to ${matchInfo?.tossChoice} first`
                    : "Match not started"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchDetails;
