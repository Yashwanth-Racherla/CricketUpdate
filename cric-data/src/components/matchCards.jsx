import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import MatchScorecard from "./matchScorecard";
import MatchCard from "./matchCard";

const MatchCards = () => {
  const [cricSeriesData, setCricSeriesData] = useState([]);
  const [cricMatchData, setcricMatchData] = useState(null);
  const [cricMatchScoreCard, setCricMatchScoreCard] = useState(null);
  const [showMatchDataPopup, setShowMatchDataPopup] = useState(false);
  const [inningsNumber, setInningsNumber] = useState(0);

  // const apiKey = "2f0d633d-aed1-474b-9fa4-8bb1af008ca9";
  // const apiKey = "8474bb0f-cb30-48bc-8272-1cc7a31e3dee";
  // const apiKey = "af3ef40f-1364-4e71-9ae1-dc153e43f49d";
  const apiKey = "ce2ea15b-deaf-491b-a809-7367ab6d9024";
  // const apiKey = "6e9c3ee5-acbb-4168-906b-dda3fb5b4acd";

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
  //  =================================
  //  Multiple Series Fetching Api
  //  =================================
  const seriesList = [
    {
      id: "47b54677-34de-4378-9019-154e82b9cc1a",
      name: "IPL",
    },
    {
      id: "b5108aba-0694-42c4-b9eb-8f5eda5a41c7",
      name: "BangladeshVsSrilanka",
    },
    {
      id: "17976dfb-1371-488c-b420-c7d2e2cd7d14",
      name: "UgandaVsNepal",
    },
  ];

  const moreMatches = 1;
  const initialMatches = 3;
  const [numOfMatchesToShow, setNumOfMatchesToShow] = useState([]);

  const getSeriesData = async () => {
    const tempSeriesArr = [];

    for (const series of seriesList) {
      const seriesApiData = await fetch(
        `https://api.cricapi.com/v1/series_info?apikey=${apiKey}&offset=0&id=${series.id}`
      );

      await seriesApiData.json().then((res) => {
        res.data?.matchList?.sort(byDate);
        tempSeriesArr.push(res);

        setNumOfMatchesToShow((prevState) => [...prevState, initialMatches]);
        // setCricSeriesData((prevState) => [...prevState, initialMatches])
        setCricSeriesData(tempSeriesArr);
      });
    }
  };

  useEffect(() => {
    getSeriesData();
  }, []);

  //  ====================================================================
  //  showMatchData() function called on jsx button element ( Match Details )
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
    });
  };

  //  ====================================================================
  //  closeMatchData() function called on jsx button element( X Button)
  //  ====================================================================
  const closeMatchData = () => {
    setShowMatchDataPopup(false);
    setInningsNumber(0);
  };
  //  ====================================================================
  //  showMoreMatches function called on jsx button element (More Matches)
  //  ====================================================================

  const showMoreMatches = (index) => {
    setNumOfMatchesToShow((prevState) => [
      ...prevState,
      (prevState[index] += moreMatches),
    ]);
  };

  return (
    <>
      {cricSeriesData.map((series, index) => {
        return (
          <React.Fragment key={`series-${index}`}>
            <div className="p-2 font-extrabold text-xl sm:text-3xl">
              <p>{series?.data?.info?.name}</p>
            </div>
            <div className="md:flex md:justify-center md:flex-wrap">
              {series?.data?.matchList
                ?.filter((cricMatch) => {
                  return cricMatch.status !== "Match not started";
                })
                .slice(0, numOfMatchesToShow[index])
                .map((cricMatch) => {
                  return (
                    <MatchCard
                      key={cricMatch?.id}
                      cricMatch={cricMatch}
                      showMatchData={showMatchData}
                    />
                  );
                })}
            </div>

            {numOfMatchesToShow[index] <
              series?.data?.matchList.filter((cricMatch) => {
                return cricMatch.status !== "Match not started";
              }).length && (
              <button
                className="btn p-2 m-2 text-blue-600 font-bold text-xl"
                onClick={() => showMoreMatches(index)}
              >
                More matches
              </button>
            )}
          </React.Fragment>
        );
      })}

      {showMatchDataPopup && (
        <div className="show-popUp">
          <div className="show-popUp-data">
            {/* ======= close the pop up button ====== */}
            <button className="close-popUp">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => closeMatchData()}
              />
            </button>
            {/* ======= Match Status ======  */}
            <h2 className="font-bold py-4 text-lg sm:text-xl">
              {cricMatchData.status}
            </h2>
            {/* ===== Team Names ====== */}
            <div className="flex">
              {cricMatchScoreCard?.scorecard?.map((teamScoreCard, index) => {
                return (
                  <button
                    className="w-1/2 btn flex flex-col items-center font-bold sm:text-base"
                    onClick={() => setInningsNumber(index)}
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
              scoreCardData={cricMatchScoreCard?.scorecard[inningsNumber]}
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
      )}
    </>
  );
};

export default MatchCards;
