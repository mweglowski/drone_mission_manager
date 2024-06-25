import { Drone as DroneInterface } from "../../../types/Drone";
import { Link } from "react-router-dom";

interface DroneProps {
  drone: DroneInterface;
  onDelete: (id: number) => void;
}

const Drone = ({ drone, onDelete }: DroneProps) => {
  const deleteDroneHandler = async () => {
    onDelete(drone.id);
  };

  return (
    <div
      className={
        "cursor-pointer border-2 border-slate-200 rounded flex flex-col min-w-[250px] duration-300 relative"
      }
    >
      {/* CONTROL BUTTONS */}
      <div className="absolute z-20 top-[-5px] left-[-5px] flex gap-1">
        <button
          onClick={deleteDroneHandler}
          className="mission-type hover:bg-slate-200 duration-300 bg-white"
        >
          Delete
        </button>
        <Link
          to={"/dashboard/drone/edit/" + drone.id}
          className="mission-type hover:bg-slate-200 duration-300 bg-white"
        >
          Edit
        </Link>
      </div>

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
  );
};

export default Drone;
