import React from "react";
import { Drone as DroneInterface } from "../../../types/Drone";
import Drone from "./Drone";

interface DronesListProps {
  drones: DroneInterface[];
  onDeleteDrone: (id: number) => void;
}

const DronesList = ({ drones, onDeleteDrone }: DronesListProps) => {
  return (
    <ul className="flex flex-wrap gap-4 justify-center">
      {drones.map((drone: DroneInterface) => (
        <li key={drone.id}>
          <Drone drone={drone} onDelete={onDeleteDrone} />
        </li>
      ))}
    </ul>
  );
};

export default DronesList;
