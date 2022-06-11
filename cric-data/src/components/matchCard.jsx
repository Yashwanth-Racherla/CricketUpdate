import React from "react";
import { Link } from "react-router-dom";

const MatchCard = ({ cricMatch, className }) => {
  return (
    <>
      <div className={`match-data ${className}`}>
        {cricMatch?.teamInfo?.length > 1 ? (
          <>
            <p className="pb-2 min-h-[56px] text-base">{cricMatch?.name}</p>

            <div className="flex justify-center min-h-[128px] sm:min-h-[152px]">
              <div className="team-vs-team w-2/5">
                <img
                  className="w-20"
                  src={cricMatch?.teamInfo[0]?.img}
                  alt="Team 1 logo"
                />
                <p> {cricMatch?.teamInfo[0]?.name} </p>
              </div>
              <div className="team-vs-team w-1/5">
                <img className="w-14" src="/vs-image.jpg" alt="vs logo" />
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
          <p className="mb-2">
            {new Date(cricMatch?.dateTimeGMT).toDateString()}
          </p>

          <Link className="btn" to={`/matchdetails/${cricMatch.id}`}>
            Show Match Details
          </Link>

          <p className="font-bold text-lg mt-2">{cricMatch?.status}</p>
        </div>
      </div>
    </>
  );
};

export default MatchCard;
