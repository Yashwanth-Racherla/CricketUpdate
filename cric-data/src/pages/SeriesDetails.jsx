import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import MatchCard from "../components/matchCard";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { byDate } from "../helper/commonFunctions";

const SeriesDetails = () => {
  let { id } = useParams();

  const [seriesData, setSeriesData] = useState({});

  // const apiKey = "2f0d633d-aed1-474b-9fa4-8bb1af008ca9";
  const apiKey = "8474bb0f-cb30-48bc-8272-1cc7a31e3dee";
  // const apiKey = "af3ef40f-1364-4e71-9ae1-dc153e43f49d";
  // const apiKey = "ce2ea15b-deaf-491b-a809-7367ab6d9024";
  // const apiKey = "6e9c3ee5-acbb-4168-906b-dda3fb5b4acd";

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
