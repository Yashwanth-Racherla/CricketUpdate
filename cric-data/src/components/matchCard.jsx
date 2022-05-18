import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const MatchCard = () => {
  const [cricData, setCricData] = useState({});
  const [cricMatchDetails, setCricMatchDetails] = useState(null);
  const [showMatchDetailsPopup, setShowMatchDetailsPopup] = useState(false);

  // const apiKey = "2f0d633d-aed1-474b-9fa4-8bb1af008ca9";
  const apiKey = "8474bb0f-cb30-48bc-8272-1cc7a31e3dee";
  // const apiKey = "af3ef40f-1364-4e71-9ae1-dc153e43f49d";
  // const apiKey = "ce2ea15b-deaf-491b-a809-7367ab6d9024";
  // const apiKey = "6e9c3ee5-acbb-4168-906b-dda3fb5b4acd"

  const getCricketData = async () => {
    const seriesData = await fetch(
      `https://api.cricapi.com/v1/series_info?apikey=${apiKey}&offset=0&id=47b54677-34de-4378-9019-154e82b9cc1a`
    );

    const byDate = (a, b) => {
      if (
        new Date(a.dateTimeGMT).valueOf() > new Date(b.dateTimeGMT).valueOf()
      ) {
        return -1;
      } else if (
        new Date(b.dateTimeGMT).valueOf() > new Date(a.dateTimeGMT).valueOf()
      ) {
        return 1;
      } else {
        return 0;
      }
    };

    await seriesData.json().then((res) => {
      res.data?.matchList?.sort(byDate);
      setCricData(res);
    });
  };

  const getMatchData = async (id) => {
    const matchData = await fetch(
      `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&offset=0&id=${id}`
    );
    return await matchData.json();
  };

  const showMatchDetails = (id) => {
    getMatchData(id).then((res) => {
      setCricMatchDetails(res.data);
      setShowMatchDetailsPopup(true);
    });
  };

  const closeMatchDetails = () => {
    setShowMatchDetailsPopup(false);
  };

  useEffect(() => {
    getCricketData();
  }, []);

  return (
    <>
      {showMatchDetailsPopup && (
        <div className="show-match-details-popup">
          <div className="show-match-details">
            <h2 className="text-center text-2xl font-bold pt-6">
              {cricData.data.info.name}
            </h2>
            <div className=" py-10 font-semibold">
              <div className="flex">
                <p className="shrink-0">{`Match : `}</p>
                <p>{cricMatchDetails.name}</p>
              </div>
              <div className="flex">
                <p className="shrink-0">{`Date : `}</p>
                <p>{new Date(cricMatchDetails.dateTimeGMT).toDateString()}</p>
              </div>
              <div className="flex">
                <p className="shrink-0">{`Venue : `}</p>
                <p>{cricMatchDetails.venue}</p>
              </div>
              <div className="flex ">
                <p className="shrink-0">{`Toss : `}</p>
                <p>{`${cricMatchDetails.tossWinner} won the toss and opted to ${cricMatchDetails.tossChoice} first`}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="btn mx-2">
                <p>
                  {cricMatchDetails?.score[0]?.inning?.replace("Inning 1", "")}
                </p>
                <p>
                  {`${cricMatchDetails?.score[0]?.r}/${cricMatchDetails.score[0]?.w}
                  (${cricMatchDetails.score[0]?.o})`}
                </p>
              </div>
              <div className="btn mx-2">
                <p>
                  {cricMatchDetails.score[1]?.inning?.replace("Inning 1", "")}
                </p>
                <p>
                  {`${cricMatchDetails.score[1]?.r}/${cricMatchDetails.score[1]?.w}
                  (${cricMatchDetails.score[1]?.o})`}
                </p>
              </div>
            </div>
            <div className="text-center text-[#FFC371] font-bold sm:text-xl p-4">
              {cricMatchDetails.status}
            </div>
            <div className="close-match-details">
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => closeMatchDetails()}
              />
            </div>
          </div>
        </div>
      )}

      {cricData?.data?.matchList?.map((cricMatch) => {
        const matchDate = new Date(cricMatch.dateTimeGMT);
        const matchTime = matchDate.toDateString();

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
              <p>{matchTime}</p>

              <button
                className="btn"
                onClick={() => showMatchDetails(cricMatch.id)}
              >
                Show Match Details
              </button>
            </div>
          </div>
        );
      })}

      {cricData?.data?.matchList
        ?.filter((cricMatch) => {
          return cricMatch.status === "Match not started";
        })
        .map((cricMatch) => {
          const matchDate = new Date(cricMatch.dateTimeGMT);
          const matchTime = matchDate.toDateString();

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
                <p>{matchTime}</p>

                <button
                  className="btn"
                  onClick={() => showMatchDetails(cricMatch.id)}
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
