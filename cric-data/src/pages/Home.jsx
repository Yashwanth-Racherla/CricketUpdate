import React, { useState, useEffect } from "react";
import MatchCard from "../components/matchCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, Link } from "react-router-dom";
import { byDate } from "../helper/commonFunctions";

const Home = () => {
  const [cricSeriesData, setCricSeriesData] = useState([]);
  const [cricMatchData, setcricMatchData] = useState(null);
  const [cricMatchScoreCard, setCricMatchScoreCard] = useState(null);
  // const [showMatchDataPopup, setShowMatchDataPopup] = useState(false);
  // const [showSeriesDataPopup, setShowSeriesDataPopup] = useState(false);
  const [activeInningsNum, setActiveInningsNum] = useState(0);
  const [activeSeriesNum, setActiveSeriesNum] = useState(null);

  // const apiKey = "2f0d633d-aed1-474b-9fa4-8bb1af008ca9";
  const apiKey = "8474bb0f-cb30-48bc-8272-1cc7a31e3dee";
  // const apiKey = "af3ef40f-1364-4e71-9ae1-dc153e43f49d";
  // const apiKey = "ce2ea15b-deaf-491b-a809-7367ab6d9024";
  // const apiKey = "6e9c3ee5-acbb-4168-906b-dda3fb5b4acd";

  //  =================================
  //  Multiple Series Fetching Api
  //  =================================
  const seriesList = [
    {
      id: "47b54677-34de-4378-9019-154e82b9cc1a",
      name: "Indian Premier League 2022",
    },
    {
      id: "b5108aba-0694-42c4-b9eb-8f5eda5a41c7",
      name: "Srilanka Tour of Bangladesh",
    },
    {
      id: "17976dfb-1371-488c-b420-c7d2e2cd7d14",
      name: "Uganda Tour of Nepal",
    },
    {
      id: "85754fc3-d76e-4afc-9269-e4d49771d80f",
      namee: "Womens T20 Challenge",
    },
    {
      id: "2e4a95c4-a1a4-4ac7-8a98-f549a08ee3c5",
      namee: "Srilanka Women Tour of Pakistan",
    },
  ];

  const getSeriesData = async () => {
    const tempSeriesArr = [];

    for (const series of seriesList) {
      const seriesApiData = await fetch(
        `https://api.cricapi.com/v1/series_info?apikey=${apiKey}&offset=0&id=${series.id}`
      );

      await seriesApiData.json().then((res) => {
        res.data?.matchList?.sort(byDate);
        tempSeriesArr.push(res);
        setCricSeriesData(tempSeriesArr);
      });
    }
  };

  useEffect(() => {
    getSeriesData();
  }, []);

  //  ====================================================================
  //  showMatchData() function called on jsx button element ( Show Match Details )
  //  ====================================================================

  const showMatchData = async (id) => {
    const matchApiData = await fetch(
      `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&offset=0&id=${id}`
    );
    const matchScoreCardApiData = await fetch(
      `https://api.cricapi.com/v1/match_scorecard?apikey=${apiKey}&offset=0&id=${id}`
    );
    await matchApiData.json().then((res) => {
      setcricMatchData(res.data);
    });
    await matchScoreCardApiData.json().then((res) => {
      setCricMatchScoreCard(res.data);
      // setShowMatchDataPopup(true);
    });
    // document.querySelector("body").style.overflow = "hidden";
  };

  //  ====================================================================
  //  closeSeriesData() function called on jsx button element( X Button)
  //  ====================================================================
  // const closeSeriesData = () => {
  //   // setShowSeriesDataPopup(false);
  //   document.querySelector("body").style.overflow = "auto";
  // };

  //  ====================================================================
  //  closeMatchData() function called on jsx button element( X Button)
  //  ====================================================================
  const closeMatchData = () => {
    // setShowMatchDataPopup(false);
    setActiveInningsNum(0);
    // document.querySelector("body").style.overflow = "auto";
  };

  return cricSeriesData.map((series, index) => {
    console.log(cricSeriesData.length);
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
      <div key={`series-${index}`} className="mb-4">
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
                  showMatchData={showMatchData}
                />
              );
            })}
        </Slider>

        <Link
          className="btn p-2 my-2 mx-auto inline-block text-blue-600 font-bold text-xl"
          to={`/seriesdetails/${series?.data?.info?.id}`}
        >
          Show Series Details
        </Link>
      </div>
    );
  });
};

export default Home;
