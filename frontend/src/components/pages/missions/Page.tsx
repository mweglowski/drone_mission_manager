import React, { useEffect, useState } from "react";
import Section from "../../../UI/Section";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/auth-context";
import axios from "axios";
import MissionsList from "./MissionsList";
import { Mission } from "../../../types/Mission";

const Page: React.FC = () => {
  const { email, token } = useAuth();

  const [userId, setUserId] = useState(null);

  const [currentMissions, setCurrentMissions] = useState();
  const [completedMissions, setCompletedMissions] = useState();

  // USER DATA
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserId(response.data.id);
      } catch (error) {
        console.error(error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email, token]);

  // FETCH MISSIONS
  useEffect(() => {
    const fetchUserMissions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/mission?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );


        
        setCurrentMissions(response.data.filter((mission: Mission) => new Date(mission.endDate) > new Date()));
        
        setCompletedMissions(response.data.filter((mission: Mission) => new Date(mission.endDate) < new Date()));
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchUserMissions();
    }
  }, [userId, token]);

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
