import React from "react";
import { useEffect, useState } from "react";

const MatchCard = () => {
  const [cricData, setCricData] = useState({});
  const [cricMatchDetails, setCricMatchDetails] = useState(null);
  const apiKey = "2f0d633d-aed1-474b-9fa4-8bb1af008ca9";
  // const apiKey = "8474bb0f-cb30-48bc-8272-1cc7a31e3dee";
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

    const matchDetails = await matchData.json();
    setCricMatchDetails(matchDetails);
    console.log(matchDetails);
    console.log(matchDetails.data.score[0]);
    console.log(matchDetails.data.score[1]);
    console.log(matchDetails.data.score[0].inning.replace("inning 1", ""));
  };

  const showMatchDetails = (id) => {
    getMatchData(id);
    document.querySelector(".match-data").classList.add("active");
  };

  useEffect(() => {
    getCricketData();
  }, []);

  return (
    <>
      {cricMatchDetails !== null && (
        <div className="bg-black bg-opacity-90 fixed z-10 w-full h-full top-0 left-0">
          <div className="match-details">
            <div className="text-blue-500">
              <p>
                {cricMatchDetails.data.score[0].inning.replace("Inning 1", "")}
              </p>
              <p>
                {`${cricMatchDetails.data.score[0].r} /
                ${cricMatchDetails.data.score[0].w} in
                ${cricMatchDetails.data.score[0].o} overs`}
              </p>
            </div>
            <div className="text-yellow-400">
              <p>
                {cricMatchDetails.data.score[1].inning.replace("Inning 1", "")}
              </p>
              <p>
                {`${cricMatchDetails.data.score[1].r} /
                ${cricMatchDetails.data.score[1].w} in
                ${cricMatchDetails.data.score[1].o} overs`}
              </p>
            </div>
            <div className="text-green-600 text-3xl text-center">
              {cricMatchDetails.data.status}
            </div>
          </div>
        </div>
      )}

      {cricData?.data?.matchList
        ?.filter((cricMatch) => {
          return cricMatch.status !== "Match not started";
        })
        .map((cricMatch) => {
          const matchDate = new Date(cricMatch.dateTimeGMT);
          const matchTime = matchDate.toDateString();

          return (
            <div key={cricMatch?.id} className="match-data">
              {cricMatch?.teamInfo?.length > 1 && (
                <div className="text-3xl font-bold flex justify-center">
                  <div className="flex flex-col items-center flex-1">
                    <img
                      className="w-20"
                      src={cricMatch?.teamInfo[0]?.img}
                      alt="Team 1 logo"
                    />
                    <p> {cricMatch?.teamInfo[0]?.name} </p>
                  </div>
                  <div className="flex flex-1 justify-center">
                    <img className="w-24" src="./vs image.jpg" alt="vs logo" />
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <img
                      className="w-20"
                      src={cricMatch?.teamInfo[1]?.img}
                      alt="Team 1 logo"
                    />
                    <p> {cricMatch?.teamInfo[1]?.name} </p>
                  </div>
                </div>
              )}

              <div className="font-bold">
                <p className="p-4 text-2xl">{matchTime}</p>

                <button
                  className="text-3xl text-red-600 font-bold  hover:scale-125"
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
