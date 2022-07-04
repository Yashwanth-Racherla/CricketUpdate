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
    <div className="text-sm px-2 py-16">
      <div className="fixed top-16 text-right h-16 left-0 w-full px-[2%] pt-2 bg-[#FFF2F0]">
        <button className="close-button " onClick={() => navigate(-1)}>
          <ion-icon
            class=" w-5 h-5 md:w-9 md:h-9"
            name="close-outline"
          ></ion-icon>
        </button>
      </div>
      <h2 className="font-bold text-center text-xl sm:text-2xl lg:text-4xl pb-4">
        {seriesData?.data?.info?.name}
      </h2>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seriesData?.data?.matchList?.sort(byDateRev).map((cricMatch) => {
            return <MatchCard key={cricMatch?.id} cricMatch={cricMatch} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
