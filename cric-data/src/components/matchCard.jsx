import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import MatchScorecard from "./matchScorecard";

const MatchCard = () => {
  const [cricSeriesData, setCricSeriesData] = useState({});
  const [cricMatchData, setcricMatchData] = useState(null);
  const [cricMatchScoreCard, setCricMatchScoreCard] = useState(null);
  const [showMatchDataPopup, setShowMatchDataPopup] = useState(false);
  const [inningsNumber, setInningsNumber] = useState(0);

  // const apiKey = "2f0d633d-aed1-474b-9fa4-8bb1af008ca9";
  // const apiKey = "8474bb0f-cb30-48bc-8272-1cc7a31e3dee";
  // const apiKey = "af3ef40f-1364-4e71-9ae1-dc153e43f49d";
  // const apiKey = "ce2ea15b-deaf-491b-a809-7367ab6d9024";
  const apiKey = "6e9c3ee5-acbb-4168-906b-dda3fb5b4acd";

  const byDate = (a, b) => {
    if (new Date(a.dateTimeGMT).valueOf() > new Date(b.dateTimeGMT).valueOf()) {
      return -1;
    } else if (
      new Date(b.dateTimeGMT).valueOf() > new Date(a.dateTimeGMT).valueOf()
    ) {
      return 1;
    } else {
      return 0;
    }
  };

  const getSeriesData = async () => {
    const seriesApiData = await fetch(
      `https://api.cricapi.com/v1/series_info?apikey=${apiKey}&offset=0&id=47b54677-34de-4378-9019-154e82b9cc1a`
    );

    await seriesApiData.json().then((res) => {
      res.data?.matchList?.sort(byDate);
      setCricSeriesData(res);
    });
  };

  useEffect(() => {
    getSeriesData();
  }, []);

  //  ====================================================================
  //  showMatchData() function called on jsx button element
  //  ====================================================================

  const showMatchData = async (id) => {
    const matchApiData = await fetch(
      `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&offset=0&id=${id}`
    );
    const matchScoreCardApiData = await fetch(
      `https://api.cricapi.com/v1/match_scorecard?apikey=${apiKey}&offset=0&id=${id}`
    );
    await matchApiData.json().then((res) => {
      setcricMatchData(res.data);
    });
    await matchScoreCardApiData.json().then((res) => {
      setCricMatchScoreCard(res.data);
      setShowMatchDataPopup(true);
      // console.log(res.data);
    });
  };

  //  ====================================================================
  //  closeMatchData() function called on jsx button element
  //  ====================================================================
  const closeMatchData = () => {
    setShowMatchDataPopup(false);
    setInningsNumber(0);
  };

  return (
    <>
      {showMatchDataPopup && (
        <div className="show-popUp">
          <div className="show-popUp-data">
            {/* <h2 className="text-center text-2xl font-bold pt-6">
              {cricSeriesData.data.info.name}
            </h2> */}
            {/* <div className=" py-10 font-semibold">
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

            <div className="flex justify-center">
              <div className="btn mx-2">
                <p>{cricMatchData.score[0]?.inning?.replace("Inning 1", "")}</p>
                <p>
                  {`${cricMatchData.score[0]?.r}/${cricMatchData.score[0]?.w}
                  (${cricMatchData.score[0]?.o})`}
                </p>
              </div>
              <div className="btn mx-2">
                <p>{cricMatchData.score[1]?.inning?.replace("Inning 1", "")}</p>
                <p>
                  {`${cricMatchData.score[1]?.r}/${cricMatchData.score[1]?.w}
                  (${cricMatchData.score[1]?.o})`}
                </p>
              </div>
            </div>
            <div className="text-center text-[#FFC371] font-bold sm:text-xl p-4">
              {cricMatchData.status}
            </div> */}
            <div className="font-bold sm:text-xl p-4">
              {cricMatchData.status}
            </div>

            <div className="flex">
              {cricMatchScoreCard?.scorecard?.map((teamScoreCard, index) => {
                return (
                  <button
                    className="w-1/2 btn"
                    onClick={() => setInningsNumber(index)}
                  >
                    {teamScoreCard.inning.replace("Inning 1", "")}
                  </button>
                );
              })}
            </div>

            <MatchScorecard
              scoreCardData={cricMatchScoreCard?.scorecard[inningsNumber]}
            />

            <button className="close-popUp">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => closeMatchData()}
              />
            </button>
          </div>
        </div>
      )}

      {cricSeriesData?.data?.matchList
        ?.filter((cricMatch) => {
          return cricMatch.status !== "Match not started";
        })
        .map((cricMatch) => {
          return (
            <div key={cricMatch?.id} className="match-data">
              {cricMatch?.teamInfo?.length > 1 ? (
                <div className="flex justify-center h-2/3 ">
                  <div className="team-vs-team w-2/5">
                    <img
                      className="w-20"
                      src={cricMatch?.teamInfo[0]?.img}
                      alt="Team 1 logo"
                    />
                    <p> {cricMatch?.teamInfo[0]?.name} </p>
                  </div>
                  <div className="team-vs-team w-1/5">
                    <img className="w-16" src="./vs image.jpg" alt="vs logo" />
                  </div>
                  <div className="team-vs-team w-2/5">
                    <img
                      className="w-20"
                      src={cricMatch?.teamInfo[1]?.img}
                      alt="Team 1 logo"
                    />
                    <p> {cricMatch?.teamInfo[1]?.name} </p>
                  </div>
                </div>
              ) : (
                "Team 1 vs Team 2"
              )}

              <div>
                <p>{new Date(cricMatch.dateTimeGMT).toDateString()}</p>

                <button
                  className="btn"
                  onClick={() => showMatchData(cricMatch.id)}
                >
                  Show Match Details
                </button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default MatchCard;
