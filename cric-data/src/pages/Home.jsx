import React, { useState, useEffect } from "react";
import MatchCard from "../components/MatchCard";
import { Link } from "react-router-dom";
import { byDate } from "../helperFunctions/commonFunctions";
import { getApiKey } from "../helperData/commonData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../components/Loading";

const Home = () => {
  const [cricSeriesData, setCricSeriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = getApiKey();

  //  =================================
  //  Multiple Series Fetching Api
  //  =================================
  const seriesList = [
    {
      id: "b290fb86-aae9-4284-9a52-854a8c4fe19c",
      name: "India Women tour of Srilanka 2022",
    },
    {
      id: "a22e9ebf-72d4-4b77-9c76-e00c71dab992",
      name: "Australia tour of Srilanka",
    },
    {
      id: "a943264f-7b01-49f1-9522-dda25aef1b5a",
      name: "Bangladesh tour of WestIndies",
    },
    {
      id: "c39aa92c-2fd9-4676-be5a-84655daebac4",
      name: "Vitality Blast 2022",
    },

    {
      id: "47b54677-34de-4378-9019-154e82b9cc1a",
      name: "Indian Premier League 2022",
    },
  ];

  const getSeriesData = async () => {
    for (const series of seriesList) {
      const seriesApiData = await fetch(
        `https://api.cricapi.com/v1/series_info?apikey=${apiKey}&offset=0&id=${series.id}`
      );

      await seriesApiData.json().then((res) => {
        res.data?.matchList?.sort(byDate);
        setCricSeriesData((prevState) => [...prevState, res]);
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSeriesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    cricSeriesData.map((series, index) => {
      // console.log(series);

      const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 700,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
      return (
        <div key={index} className="mb-4">
          <p className="p-2 font-extrabold text-xl sm:text-3xl text-center">
            {series?.data?.info?.name}
          </p>

          <Slider {...settings}>
            {series?.data?.matchList
              ?.filter((cricMatch) => {
                return cricMatch.status !== "Match not started";
              })
              .slice(0, 5)
              .map((cricMatch) => {
                return (
                  <MatchCard
                    key={cricMatch?.id}
                    cricMatch={cricMatch}
                    className="h-full w-full"
                  />
                );
              })}
          </Slider>

          <button className="button mx-auto block font-bold text-xl">
            <Link to={`/seriesdetails/${series?.data?.info?.id}`}>
              Series Details
            </Link>
          </button>
        </div>
      );
    })
  );
};

export default Home;
