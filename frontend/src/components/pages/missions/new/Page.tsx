import React, { FormEvent, useEffect, useRef, useState } from "react";
import Section from "../../../../UI/Section";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../context/auth-context";
import ErrorContainer from "../../auth/ErrorContainer";
import MissionTypes from "./MissionTypes";
import DroneSelection from "./DroneSelection";
import { Drone } from "../../../../types/Drone";

const Page = () => {
  // USER TOKEN
  const { token, email } = useAuth();

  // ABILITY TO CHANGE ROUTES
  const navigate = useNavigate();

  // STATE
  const [isError, setIsError] = useState(false);
  const [selectedMissionType, setMissionType] = useState("");
  const [dronesData, setDronesData] = useState<Drone[]>([]);
  const [selectedDrone, setSelectedDrone] = useState<Drone>();
  const [userId, setUserId] = useState(null);

  // INPUT REFERENCES
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  // MISSION TYPES
  const missionTypes = ["Investigation", "Rescue", "Research", "Recreational"];

  // FETCHING DRONES DATA
  useEffect(() => {
    const fetchDroneData = async () => {
      const response = await axios.get("http://localhost:8080/api/drone", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setDronesData(response.data);
    };

    fetchDroneData();
  }, []);

  // FETCH USER DATA
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
        console.log(response.data.id);

        setUserId(response.data.id);
      } catch (error) {
        console.error(error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email, token]);

  // ADD MISSION
  const createMission = async (event: FormEvent) => {
    event?.preventDefault();

    const mission = {
      title: titleInputRef.current?.value ?? "",
      description: descriptionInputRef.current?.value ?? "",
      type: selectedMissionType.toUpperCase(),
      drone: { id: selectedDrone?.id },
      user: { id: userId },
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      completed: false
  };

    console.log("trying to post:\n", mission);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/mission",
        mission,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/missions");
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  return (
    <Section>
      <div className="w-full mx-auto flex flex-col">
        {/* SECTION TITLE */}
        <div className="max-w-[400px] mx-auto text-xl font-bold mt-[100px] border-b-2 w-full text-center border-slate-200 text-slate-600">
          NEW MISSION
        </div>

        {/* ERROR */}
        <ErrorContainer visible={isError} />

        {/* CREATE MISSION FORM */}
        <form
          onSubmit={createMission}
          className="p-4 gap-4 flex flex-col max-w-[600px] mx-auto"
        >
          {/* TITLE */}
          <input
            type="text"
            placeholder="Title"
            className="auth-input"
            ref={titleInputRef}
          />

          {/* DESCRIPTION */}
          <textarea
            placeholder="Description"
            className="auth-input min-h-[100px] max-h-[200px]"
            ref={descriptionInputRef}
          />

          {/* MISSION TYPE */}
          <MissionTypes
            selectedMissionType={selectedMissionType}
            missionTypes={missionTypes}
            onMissionTypeChange={setMissionType}
          />

          {/* DRONE SELECTION */}
          <DroneSelection
            selectedDrone={selectedDrone}
            dronesData={dronesData}
            onSelectDrone={setSelectedDrone}
          />

          {/* INSTRUCTIONS FOR INTELLIGENT DRONE */}

          {/* SUBMIT BUTTON */}
          <button className="button py-2 px-6 w-fit mx-auto" type="submit">
            Create
          </button>
        </form>
      </div>
    </Section>
  );
};

export default Page;
