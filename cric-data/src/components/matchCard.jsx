import React from "react";

const MatchCard = ({ cricMatch, showMatchData }) => {
  return (
    <>
      <div className="match-data">
        {cricMatch?.teamInfo?.length > 1 ? (
          <>
            <p className="pb-2 h-14">{cricMatch?.name}</p>

            <div className="flex justify-center h-[152px]">
              <div className="team-vs-team w-2/5">
                <img
                  className="w-20"
                  src={cricMatch?.teamInfo[0]?.img}
                  alt="Team 1 logo"
                />
                <p> {cricMatch?.teamInfo[0]?.name} </p>
              </div>
              <div className="team-vs-team w-1/5">
                <img className="w-16" src="./vs image.jpg" alt="vs logo" />
              </div>
              <div className="team-vs-team w-2/5">
                <img
                  className="w-20"
                  src={cricMatch?.teamInfo[1]?.img}
                  alt="Team 1 logo"
                />
                <p> {cricMatch?.teamInfo[1]?.name} </p>
              </div>
            </div>
          </>
        ) : (
          "Team 1 vs Team 2"
        )}

        <div>
          <p>{new Date(cricMatch?.dateTimeGMT).toDateString()}</p>

          <button className="btn" onClick={() => showMatchData(cricMatch.id)}>
            Show Match Details
          </button>
          <p>{cricMatch?.status}</p>
        </div>
      </div>
    </>
  );
};

export default MatchCard;
