import React from "react";
import { Drone } from "../../../../types/Drone";

interface DroneSelectionProps {
  dronesData: Drone[];
  selectedDrone?: Drone;
  onSelectDrone: (drone: Drone) => void;
}

const DroneSelection = ({
  dronesData,
  selectedDrone,
  onSelectDrone,
}: DroneSelectionProps) => {
  return (
    <div className="flex flex-col">
      <div className="mx-auto text-slate-500 text-lg">Select Drone</div>

      <ul className="flex flex-wrap gap-4 justify-center">
        {dronesData.map((drone: Drone) => (
          <li key={drone.id}>
            <div
              onClick={() => {
                onSelectDrone(drone);
              }}
              className={
                "cursor-pointer border-2 border-slate-200 rounded flex flex-col min-w-[250px] duration-300 " +
                (selectedDrone?.id === drone.id
                  ? "border-violet-700 shadow shadow-violet-700"
                  : "")
              }
            >
              {/* IMAGE & NAME CONTAINER */}
              <div className="relative mx-auto">
                {/* IMAGE */}
                <img
                  src={drone.imageSrc}
                  alt="Drone Image"
                  className="max-h-[170px] rounded"
                />

                {/* NAME */}
                <div className="absolute bottom-3 w-full text-center text-slate-500">
                  {drone.name}
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-4">
                {/* MAX SPEED */}
                <div className="flex justify-between text-slate-500">
                  <div>Max Speed</div>
                  <div>{drone.maxSpeed} m/s</div>
                </div>

                {/* RANGE */}
                <div className="flex justify-between text-slate-500">
                  <div>Range</div>
                  <div>{drone.range} km</div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DroneSelection;
