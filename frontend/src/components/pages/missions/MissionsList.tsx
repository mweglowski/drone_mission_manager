import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mission as MissionInterface } from "../../../types/Mission";
import { Drone } from "../../../types/Drone";
import axios from "axios";
import { useAuth } from "../../../context/auth-context";
import Mission from "./Mission";

interface MissionsListProps {
  missions?: MissionInterface[];
  title: string;
}

const MissionsList = ({ missions, title }: MissionsListProps) => {
  const { token } = useAuth();
  const [dronesData, setDronesData] = useState<{ [key: string]: Drone }>({});

  useEffect(() => {
    const fetchDroneData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/drone", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const drones = response.data.reduce(
          (acc: { [key: string]: Drone }, drone: Drone) => {
            acc[drone.id] = drone;
            return acc;
          },
          {}
        );

        console.log(drones);
        setDronesData(drones);
      } catch (error) {
        console.error("Error fetching drones data", error);
      }
    };

    fetchDroneData();
  }, []);

  return (
    <div className="max-w-[800px] mx-auto p-4 w-full">
      {/* TITLE */}
      <div className="text-xl font-bold border-b-2 mb-4 border-violet-100">
        {title}
      </div>

      {/* LIST OF MISSIONS */}
      <ul className="flex flex-col gap-4">
        {missions?.map((mission: MissionInterface) => {
          const drone = dronesData[mission.drone.id];

          return <Mission mission={mission} drone={drone} key={mission.id} />;
        })}
      </ul>

      {missions?.length === 0 && <div>No missions.</div>}
    </div>
  );
};

export default MissionsList;
