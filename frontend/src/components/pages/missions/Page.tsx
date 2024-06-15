import React from "react";
import Section from "../../../UI/Section";
import { Link } from "react-router-dom";


const Page: React.FC = () => {
  return (
    <Section>
      <p className="text-2xl font-bold p-8">Missions route</p>

      {/* CURRENT MISSIONS */}
      <div className="max-w-[800px] mx-auto p-4">
        <div className="text-xl font-bold border-b-2 mb-4 border-violet-100">Current</div>

        {/* MISSION */}
        <div className="w-full shadow-md rounded items-center relative pb-3 p-4 flex flex-col sm:flex-row">
          {/* DRONE IMAGE WITH MODEL NAME */}
          <div className="relative">
            {/* DRONE IMAGE */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8dkfuaARKRg_A3huzN5OUUZXH8aSA32jY9Q&s"
              alt="Drone Image"
              className="h-fit rounded mx-auto mt-[20px] sm:w-full sm:min-w-[200px] sm:mt-0"
            />
            {/* DRONE NAME */}
            <div className="text-slate-600 font-bold text-lg absolute w-full text-center bottom-3 sm:bottom-0">
              DJI Mavic Pro
            </div>
          </div>

          {/* DETAILS */}
          <div className="p-2">
            {/* MISSION CATEGORY */}
            <div className="rounded w-fit bg-slate-600 text-white px-2">
              Investigation
            </div>

            {/* MISSION TITLE */}
            <div className="text-violet-900 font-bold text-lg">
              People Behaviour Monitoring
            </div>

            {/* MISSION DESCRIPTION */}
            <div className="text-slate-500 text-justify">
              Taking photos of people with suspicious behaviour in the woods in
              pomeranian voivodeship. Taking photos of people with suspicious
              behaviour in the woods in pomeranian voivodeship. Taking photos of
              people with suspicious behaviour in the woods in pomeranian
              voivodeship.
            </div>
          </div>

          {/* MORE MISSION INFO */}
          <Link
            to="/missions/:id"
            className="absolute bottom-2 right-2 button text-white px-3 py-1 rounded"
          >
            More
          </Link>

          {/* ESTIMATED END DATE */}
          <div className="absolute top-0 right-0 text-slate-500 rounded-bl rounded-tr px-2 shadow">
            01.05.2024 ~ 05.05.2024
          </div>
        </div>
      </div>

      <Link to="/missions/new" className="button mx-auto mt-[70px] px-4 py-1 text-lg mb-[200px]">
        New Mission
      </Link>
    </Section>
  );
};

export default Page;
