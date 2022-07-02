import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import MatchCard from "../components/MatchCard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { byDate, byDateRev } from "../helperFunctions/commonFunctions";
import { getApiKey } from "../helperData/commonData";

const SeriesDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const apiKey = getApiKey();

  const [seriesData, setSeriesData] = useState({});

  const getSeriesData = async () => {
    const seriesApiData = await fetch(
      `https://api.cricapi.com/v1/series_info?apikey=${apiKey}&offset=0&id=${id}`
    );

    await seriesApiData.json().then((res) => {
      // res.data?.matchList?.sort(byDate);
      setSeriesData(res);
    });
  };

  useEffect(() => {
    getSeriesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-2 text-sm">
      <button className="close-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <div className="p-2 font-extrabold text-xl sm:text-3xl">
        <p className="text-center">{seriesData?.data?.info?.name}</p>
      </div>

      <h2 className="font-bold text-3xl">Results</h2>

      <div className="flex flex-wrap">
        {seriesData?.data?.matchList
          ?.sort(byDate)
          .filter((cricMatch) => {
            return cricMatch.status !== "Match not started";
          })
          .map((cricMatch) => {
            return (
              <MatchCard
                key={cricMatch?.id}
                cricMatch={cricMatch}
                className="h-auto w-full sm:w-[48%] lg:w-[30%] mx-auto my-2"
                // showMatchData={showMatchData}
              />
            );
          })}
      </div>

      {<h2 className="font-bold text-3xl">Upcoming Matches</h2>}

      <div className="flex flex-wrap">
        {seriesData?.data?.matchList
          ?.sort(byDateRev)
          .filter((cricMatch) => {
            return cricMatch.status === "Match not started";
          })
          .map((cricMatch) => {
            return (
              <MatchCard
                key={cricMatch?.id}
                cricMatch={cricMatch}
                className="h-auto w-full sm:w-[48%] lg:w-[30%] mx-auto my-2"
                // showMatchData={showMatchData}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SeriesDetails;
