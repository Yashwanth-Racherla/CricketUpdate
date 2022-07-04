import React, { useEffect, useState } from "react";
import MatchCard from "../components/MatchCard";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { byDate, byDateRev } from "../helperFunctions/commonFunctions";
import { getApiKey } from "../helperData/commonData";
import Loading from "../components/Loading";

const SeriesDetails = () => {
  const navigate = useNavigate();
  const { seriesId } = useParams();
  const apiKey = getApiKey();

  const [seriesData, setSeriesData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getSeriesData = async () => {
    const seriesApiData = await fetch(
      `https://api.cricapi.com/v1/series_info?apikey=${apiKey}&offset=0&id=${seriesId}`
    );

    await seriesApiData.json().then((res) => {
      res.data?.matchList?.sort(byDate);
      setSeriesData(res);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getSeriesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="text-sm">
      <button className="close-button " onClick={() => navigate(-1)}>
        <ion-icon class="w-9 h-9" name="close-outline"></ion-icon>
      </button>
      <div className="px-2 py-16">
        <h2 className="text-center font-bold text-3xl sm:text-4xl lg:text-5xl ">
          {seriesData?.data?.info?.name}
        </h2>
        <h3 className="font-bold text-3xl py-4">Results</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seriesData?.data?.matchList
            ?.sort(byDate)
            .filter((cricMatch) => {
              return cricMatch.status !== "Match not started";
            })
            .map((cricMatch) => {
              return <MatchCard key={cricMatch?.id} cricMatch={cricMatch} />;
            })}
        </div>
        {<h2 className="font-bold text-3xl py-4">Upcoming Matches</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seriesData?.data?.matchList
            ?.sort(byDateRev)
            .filter((cricMatch) => {
              return cricMatch.status === "Match not started";
            })
            .map((cricMatch) => {
              return <MatchCard key={cricMatch?.id} cricMatch={cricMatch} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
