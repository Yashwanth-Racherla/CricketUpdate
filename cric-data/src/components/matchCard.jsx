import React from "react";
import { useEffect, useState } from "react";

const MatchCard = () => {
  const [cricData, setCricData] = useState({});

  const getCricketData = async () => {
    const data = await fetch(
      "https://api.cricapi.com/v1/series_info?apikey=6e9c3ee5-acbb-4168-906b-dda3fb5b4acd&offset=0&id=47b54677-34de-4378-9019-154e82b9cc1a"
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

    await data.json().then((res) => {
      res.data?.matchList?.sort(byDate);
      setCricData(res);
    });
  };

  useEffect(() => {
    getCricketData();
  }, []);

  return (
    <>
      {cricData?.data?.matchList
        ?.filter((cricMatch) => {
          return cricMatch.status !== "Match not started";
        })
        .map((cricMatch) => {
          const matchDate = new Date(cricMatch.dateTimeGMT);
          const matchTime = matchDate.toDateString();

          return (
            <div
              key={cricMatch?.id}
              className=" border-2 border-black p-10 text-center"
            >
              <div className="text-3xl">{cricMatch?.name}</div>

              <div className="font-bold">
                <p className="p-4">{matchTime}</p>

                <button className="text-blue-400 hover:scale-125">
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
