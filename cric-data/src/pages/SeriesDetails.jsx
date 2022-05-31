import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import MatchCard from "../components/matchCard";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { byDate } from "../helperFunctions/commonFunctions";
import { getApiKey } from "../helperData/commonData";

const SeriesDetails = () => {
  const { id } = useParams();
  const apiKey = getApiKey();

  const [seriesData, setSeriesData] = useState({});

  const getSeriesData = async () => {
    const seriesApiData = await fetch(
      `https://api.cricapi.com/v1/series_info?apikey=${apiKey}&offset=0&id=${id}`
    );

    await seriesApiData.json().then((res) => {
      res.data?.matchList?.sort(byDate);
      setSeriesData(res);
    });
  };

  useEffect(() => {
    getSeriesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="show-popUp">
      <div className="show-popUp-data ">
        <button className="close-popUp">
          <Link to="/">
            <FontAwesomeIcon icon={faXmark} />
          </Link>
        </button>
        <div className="p-2 font-extrabold text-xl sm:text-3xl mt-6">
          <p className="text-center">{seriesData?.data?.info?.name}</p>
        </div>

        <div className="flex flex-wrap">
          {seriesData?.data?.matchList
            ?.filter((cricMatch) => {
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
      </div>
    </div>
  );
};

export default SeriesDetails;
