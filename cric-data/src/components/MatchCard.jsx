import React from "react";
import { Link } from "react-router-dom";

const MatchCard = ({ cricMatch, className }) => {
  return (
    <div className={`match-card ${className}`}>
      {cricMatch?.teamInfo?.length > 1 ? (
        <div>
          <p className="pb-2 min-h-[56px]">{cricMatch?.name}</p>

          <div className="grid grid-cols-3">
            <div className="flex flex-col items-center">
              <img
                className="w-24"
                src={cricMatch?.teamInfo[0]?.img}
                alt="Team 1 logo"
              />
              <p>
                {cricMatch?.teamInfo[0]?.shortname
                  ? cricMatch?.teamInfo[0]?.shortname
                  : cricMatch?.teamInfo[0]?.name}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-32 h-24 bg-transparent"
                src="/vs-image.png"
                alt="vs logo"
              />
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-24"
                src={cricMatch?.teamInfo[1]?.img}
                alt="Team 2 logo"
              />
              <p>
                {cricMatch?.teamInfo[1]?.shortname
                  ? cricMatch?.teamInfo[1]?.shortname
                  : cricMatch?.teamInfo[1]?.name}
              </p>
            </div>
          </div>
        </div>
      ) : (
        "Team 1 vs Team 2"
      )}

      <div className="flex flex-col items-center">
        <p>{new Date(cricMatch?.dateTimeGMT).toDateString()}</p>

        <Link className="button" to={`/matchdetails/${cricMatch.id}`}>
          Show Match Details
        </Link>

        <p className="font-bold text-lg">{cricMatch?.status}</p>
      </div>
    </div>
  );
};

export default MatchCard;
