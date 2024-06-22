import React from "react";
import { Mission as MissionInterface } from "../../../types/Mission";
import { Drone } from "../../../types/Drone";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";

interface MissionProps {
	mission: MissionInterface,
	drone: Drone,
}

const Mission = ({mission, drone}: MissionProps) => {
	const startDate = new Date(mission.startDate);
	const endDate = new Date(mission.endDate);
	const formattedStartDate = formatDate(startDate);
	const formattedEndDate = formatDate(endDate);

  return (
    <div
      key={mission.id}
      className="w-full shadow-md rounded items-center relative pb-3 p-4 flex flex-col sm:flex-row"
    >
      {/* DRONE IMAGE WITH MODEL NAME */}
      <div className="relative">
        {/* DRONE IMAGE */}
        {drone?.imageSrc ? (
          <img
            src={`${drone.imageSrc}`}
            alt="Drone Image"
            className="h-fit rounded mx-auto mt-[20px] sm:w-full sm:min-w-[200px] max-w-[200px] sm:mt-0"
          />
        ) : (
          <div className="h-fit rounded mx-auto mt-[20px] sm:w-full sm:min-w-[200px] sm:mt-0 bg-gray-200 flex items-center justify-center">
            No Image
          </div>
        )}
        {/* DRONE NAME */}
        <div className="text-slate-600 font-bold text-lg absolute w-full text-center bottom-3 sm:bottom-0">
          {drone?.name || "Unknown Drone"}
        </div>
      </div>

      {/* DETAILS */}
      <div className="p-2">
        {/* MISSION CATEGORY */}
        <div className="rounded w-fit bg-slate-600 text-white px-2">
          {mission.type}
        </div>

        {/* MISSION TITLE */}
        <div className="text-violet-900 font-bold text-lg">{mission.title}</div>

        {/* MISSION DESCRIPTION */}
        <div className="text-slate-500 text-justify">{mission.description}</div>
      </div>

      {/* MORE MISSION INFO */}
      <Link
        to={`/missions/${mission.id}`}
        className="absolute bottom-2 right-2 button text-white px-3 py-1 rounded"
      >
        More
      </Link>

      {/* ESTIMATED END DATE */}
      <div className="absolute top-0 right-0 text-slate-500 rounded-bl rounded-tr px-2 shadow">
        {formattedStartDate} ~ {formattedEndDate}
      </div>
    </div>
  );
};

export default Mission;
