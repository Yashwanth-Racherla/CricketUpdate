import React from "react";

const MatchScorecard = ({ scoreCardData }) => {
  return (
    <>
      <div>
        {/* ====================================================================
        Team name and innnings score
        ==================================================================== */}
        <div className="flex justify-between font-bold py-2 text-lg sm:text-xl ">
          <p>{scoreCardData?.inning.replace("Inning 1", "")}</p>
          <p>
            {`${scoreCardData?.totals.R}/${scoreCardData?.totals.W}
                    (${scoreCardData?.totals.O})`}
          </p>
        </div>
        {/* ====================================================================
        Batsman scorecard
        ==================================================================== */}
        <div className="flex justify-between font-bold p-2 mb-2 text-center bg-gray-400 text-base">
          <div className="text-left sm:flex">
            <div className="w-28 mr-8">Batsman</div>
            <div className="w-28"></div>
          </div>
          <div className="w-6">R</div>
          <div className="w-6 ">B</div>
          <div className="w-6 ">4s</div>
          <div className="w-6 ">6s</div>
          <div className="w-10">SR</div>
        </div>
        {scoreCardData?.batting.map((person) => {
          return (
            <div
              key={person.batsman.name}
              className="flex justify-between p-2 text-center border-b-[2px]"
            >
              <div className="text-left sm:flex">
                <p className="w-28 font-semibold mr-8">{person.batsman.name}</p>
                <p className="w-28">{`${person["dismissal-text"]}`}</p>
              </div>
              <p className="w-6">{person.r}</p>
              <p className="w-6">{person.b}</p>
              <p className="w-6">{person["4s"]}</p>
              <p className="w-6">{person["6s"]}</p>
              <p className="w-10">{person.sr}</p>
            </div>
          );
        })}
        {/* ====================================================================
       Team Total and Extras 
        ==================================================================== */}
        <div className="flex justify-between pt-4 font-semibold">
          <p>Extras</p>
          <p>{`${scoreCardData?.extras?.r} ( b ${scoreCardData?.extras?.b}, lb ${scoreCardData?.extras?.lb}, w ${scoreCardData?.extras?.w}, nb ${scoreCardData?.extras?.nb}, p ${scoreCardData?.extras?.p} )`}</p>
        </div>
        <div className="flex justify-between pb-4 font-semibold">
          <p>Total</p>
          <p>{`${scoreCardData?.totals?.R} ( ${scoreCardData?.totals?.W} wkts, ${scoreCardData?.totals?.O} overs )`}</p>
        </div>
        {/* ====================================================================
        Bowler scorecard 
        ==================================================================== */}
        <div className="flex justify-between font-bold p-2 mb-2 text-center bg-gray-400 text-base">
          <p className="text-left w-24">Bowler</p>
          <p className="w-4">O</p>
          <p className="w-4">M</p>
          <p className="w-4">R</p>
          <p className="w-4">W</p>
          <p className="w-4">NB</p>
          <p className="w-4">WD</p>
          <p className="w-10">ECO</p>
        </div>
        {scoreCardData?.bowling.map((person) => {
          return (
            <div
              key={person.bowler.name}
              className="flex justify-between p-2 text-center border-b-2"
            >
              <p className="text-left w-24 font-semibold">
                {person.bowler.name}
              </p>
              <p className="w-4">{person.o}</p>
              <p className="w-4">{person.m}</p>
              <p className="w-4">{person.r}</p>
              <p className="w-4">{person.w}</p>
              <p className="w-4">{person.nb}</p>
              <p className="w-4">{person.wd}</p>
              <p className="w-10">{person.eco}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MatchScorecard;
