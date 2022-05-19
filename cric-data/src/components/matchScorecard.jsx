import React from "react";

const MatchScorecard = ({ scoreCardData }) => {
  console.log(scoreCardData);
  if (!scoreCardData) return;
  return (
    <>
      <div>
        <div className="flex justify-between py-6 text-lg font-bold">
          <p>{scoreCardData.inning.replace("Inning 1", "")}</p>
          <p>
            {`${scoreCardData.totals.R}/${scoreCardData.totals.W}
                    (${scoreCardData.totals.O})`}
          </p>
        </div>
        <div className="flex justify-between font-bold pb-2">
          <div className="shrink-0 w-24">Batsman</div>
          <div className="shrink-0 w-32">Dismissal</div>
          <div className="shrink-0 text-center w-6">R</div>
          <div className="shrink-0 text-center w-6 ">B</div>
          <div className="shrink-0 text-center w-6 ">4s</div>
          <div className="shrink-0 text-center w-6 ">6s</div>
          <div className="shrink-0 text-center w-10 ">SR</div>
        </div>
        {scoreCardData.batting.map((person) => {
          return (
            <div className="flex justify-between">
              <div className="shrink-0 w-24">{person.batsman.name}</div>
              <div className="shrink-0 w-32">{`${person["dismissal-text"]}`}</div>
              <div className="shrink-0 text-center w-6">{person.r}</div>
              <div className="shrink-0 text-center w-6 ">{person.b}</div>
              <div className="shrink-0 text-center w-6 ">{person["4s"]}</div>
              <div className="shrink-0 text-center w-6 ">{person["6s"]}</div>
              <div className="shrink-0 text-center w-10 ">{person.sr}</div>
            </div>
          );
        })}

        <div className="flex justify-between pt-4">
          <p>Extras</p>
          <p>{`${scoreCardData.extras.r} ( b ${scoreCardData.extras.b}, lb ${scoreCardData.extras.lb}, w ${scoreCardData.extras.w}, nb ${scoreCardData.extras.nb}, p ${scoreCardData.extras.p} )`}</p>
        </div>
        <div className="flex justify-between pb-4">
          <p>Total</p>
          <p>{`${scoreCardData.totals.R} ( ${scoreCardData.totals.W} wkts, ${scoreCardData.totals.O} overs )`}</p>
        </div>

        <div className="flex justify-between">
          <div>
            <p>Bowler</p>
            {scoreCardData.bowling.map((person) => {
              return <p>{person.bowler.name}</p>;
            })}
          </div>
          <div>
            <p>O</p>
            {scoreCardData.bowling.map((person) => {
              return <p>{`${person.o}`}</p>;
            })}
          </div>
          <div>
            <p>M</p>
            {scoreCardData.bowling.map((person) => {
              return <p>{person.m}</p>;
            })}
          </div>
          <div>
            <p>R</p>
            {scoreCardData.bowling.map((person) => {
              return <p>{person.r}</p>;
            })}
          </div>
          <div>
            <p>W</p>
            {scoreCardData.bowling.map((person) => {
              return <p>{person.w}</p>;
            })}
          </div>
          <div>
            <p>NB</p>
            {scoreCardData.bowling.map((person) => {
              return <p>{person.nb}</p>;
            })}
          </div>
          <div>
            <p>WD</p>
            {scoreCardData.bowling.map((person) => {
              return <p>{person.wd}</p>;
            })}
          </div>
          <div>
            <p>ECO</p>
            {scoreCardData.bowling.map((person) => {
              return <p>{person.eco}</p>;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchScorecard;
