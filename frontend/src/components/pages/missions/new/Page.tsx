import React, { FormEvent, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { CustomMarkerIcon } from "./CustomMarkerIcon";

import Section from "../../../../UI/Section";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/auth-context";
import ErrorContainer from "../../auth/ErrorContainer";
import MissionTypes from "./MissionTypes";
import DroneSelection from "./DroneSelection";
import { Drone } from "../../../../types/Drone";
import { Point } from "../../../../types/Point";
import { Image } from "../../../../types/Image";

const Page: React.FC = () => {
  // USER TOKEN
  const { token, userId } = useAuth();

  // ABILITY TO CHANGE ROUTES
  const navigate = useNavigate();

  // STATE
  const [isError, setIsError] = useState(false);
  const [selectedMissionType, setMissionType] = useState("");
  const [dronesData, setDronesData] = useState<Drone[]>([]);
  const [selectedDrone, setSelectedDrone] = useState<Drone>();
  const [missionPoints, setMissionPoints] = useState<Point[]>([]);
  const [missionImages, setMissionImages] = useState<Image[]>([]);

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

      setDronesData(response.data);
    };

    fetchDroneData();
  }, []);

  // ADD MISSION
  const createMission = async (event: FormEvent) => {
    event?.preventDefault();

    const startDate = new Date();
    startDate.setHours(startDate.getHours() + 2);

    const endDate = new Date(startDate.getTime() + 10 * 1000);

    const mission = {
      title: titleInputRef.current?.value ?? "",
      description: descriptionInputRef.current?.value ?? "",
      type: selectedMissionType.toUpperCase(),
      drone: { id: selectedDrone?.id },
      user: { id: userId },
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      missionPoints,
      missionImages,
    };

    try {
      await axios.post("http://localhost:8080/api/mission", mission, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/missions");
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  // HANDLE MAP CLICK
  const MapClickHandler: React.FC = () => {
    useMapEvents({
      click: async (e: any) => {
        const newPoint = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          order: missionPoints.length,
        };

        setMissionPoints((prevPoints) => [...prevPoints, newPoint]);

        // FETCH IMAGES FOR SINGLE POINT (2 IMAGES)
        try {
          const response = await axios.get("http://localhost:8080/api/images", {
            params: {
              lat: newPoint.lat,
              lon: newPoint.lng,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          });

          // CREATING IMAGE URL FOR STREET VIEW
          const imageUrl = URL.createObjectURL(response.data);
          console.log(imageUrl);

          setMissionImages((prevImages) => [...prevImages, { imageUrl }]);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      },
    });
    return null;
  };

  // MAP CENTER
  const center: LatLngExpression = [54.413, 18.609];

  return (
    <Section>
      {/* Image Section */}
      <img
        src={"/images/new_mission.png"}
        alt="Missions Page Image"
        className="w-full max-w-[450px] mx-auto mb-[50px]"
      />

      <div className="w-full mx-auto flex flex-col">
        {/* SECTION TITLE */}
        <div className="max-w-[400px] mx-auto text-xl font-bold border-b-2 w-full text-center border-slate-200 text-slate-600">
          NEW MISSION
        </div>

        {/* ERROR */}
        <ErrorContainer visible={isError} />

        {/* CREATE MISSION FORM */}
        <form
          onSubmit={createMission}
          className="p-4 gap-[60px] flex flex-col max-w-[600px] mx-auto"
        >
          {/* INPUTS */}
          <div className="flex flex-col gap-4">
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
          </div>

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

          {/* MAP */}
          <div className="h-[500px] flex flex-col rounded">
            <div className="mx-auto text-slate-500 text-lg">
              Select Destination Points
            </div>

            <button
              type="button"
              onClick={() => {
                setMissionPoints([]);
              }}
              className="text-slate-400 border-slate-300 border-2 border-b-0 px-2 rounded-t hover:bg-slate-200 duration-300 mx-auto"
            >
              Reset Points
            </button>

            <MapContainer center={center} zoom={13} className="rounded h-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {missionPoints.map((point: Point, index) => (
                <Marker
                  key={index}
                  position={[point.lat, point.lng]}
                  icon={CustomMarkerIcon}
                />
              ))}

              <MapClickHandler />
            </MapContainer>
          </div>

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
