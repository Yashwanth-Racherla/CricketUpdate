import React, { useState, useEffect } from "react";
import MatchCard from "../components/MatchCard";
import { Link } from "react-router-dom";
import { byDate } from "../helperFunctions/commonFunctions";
import { getApiKey } from "../helperData/commonData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [cricSeriesData, setCricSeriesData] = useState([]);
  const apiKey = getApiKey();

  //  =================================
  //  Multiple Series Fetching Api
  //  =================================
  const seriesList = [
    {
      id: "47b54677-34de-4378-9019-154e82b9cc1a",
      name: "Indian Premier League 2022",
    },
    {
      id: "88650923-87d7-4cf4-9032-1b7b71f1027a",
      name: "India tour of England 2022",
    },
    {
      id: "c39aa92c-2fd9-4676-be5a-84655daebac4",
      name: "Vitality Blast 2022",
    },
    {
      id: "a22e9ebf-72d4-4b77-9c76-e00c71dab992",
      name: "Australia tour of Srilanka",
    },
    {
      id: "32c5461f-74f6-4c68-92f4-ce304ab2c8c0",
      name: "Newzeland tour of England",
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
  };

  useEffect(() => {
    getSeriesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return cricSeriesData.map((series, index) => {
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
        <div className="p-2 font-extrabold text-xl sm:text-3xl">
          <p className="text-center">{series?.data?.info?.name}</p>
        </div>
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
            Show Series Details
          </Link>
        </button>
      </div>
    );
  });
};

export default Home;
