import React, { useEffect, useState } from "react";
import Section from "../../../UI/Section";
import { Link } from "react-router-dom";
import axios from "axios";
import MissionsList from "./MissionsList";
import { Mission } from "../../../types/Mission";

const Page: React.FC = () => {
  const [currentMissions, setCurrentMissions] = useState<Mission[]>([]);
  const [completedMissions, setCompletedMissions] = useState<Mission[]>([]);

  // FETCH MISSIONS
  useEffect(() => {
    const fetchUserMissions = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        console.error("User ID or Token is missing");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/mission?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const current = response.data.filter(
          (mission: Mission) => new Date(mission.endDate) > new Date()
        );
        const completed = response.data.filter(
          (mission: Mission) => new Date(mission.endDate) < new Date()
        );

        setCurrentMissions(current);
        setCompletedMissions(completed);
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };

    fetchUserMissions();
  }, []);

  return (
    <Section>
      {/* Image Section */}
      <img
        src={"/images/missions.png"}
        alt="Missions Page Image"
        className="w-full max-w-[450px] mx-auto mb-4"
      />

      {/* NEW MISSION BUTTON */}
      <Link
        to="/missions/new"
        className="button mx-auto mt-[50px] px-4 py-1 text-lg"
      >
        New Mission
      </Link>

      {/* CURRENT MISSIONS */}
      <MissionsList missions={currentMissions} title={"Current"} />

      {/* COMPLETED MISSIONS */}
      <MissionsList missions={completedMissions} title={"Completed"} />
    </Section>
  );
};

export default Page;
