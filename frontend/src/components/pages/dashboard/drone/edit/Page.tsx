import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../../../context/auth-context";
import Section from "../../../../../UI/Section";
import ErrorContainer from "../../../auth/ErrorContainer";

const Page: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const maxSpeedInputRef = useRef<HTMLInputElement>(null);
  const rangeInputRef = useRef<HTMLInputElement>(null);
  const imageSrcInputRef = useRef<HTMLInputElement>(null);

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDrone = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/drone/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const drone = response.data;

        if (nameInputRef.current) nameInputRef.current.value = drone.name;
        if (maxSpeedInputRef.current)
          maxSpeedInputRef.current.value = drone.maxSpeed;
        if (rangeInputRef.current) rangeInputRef.current.value = drone.range;
        if (imageSrcInputRef.current)
          imageSrcInputRef.current.value = drone.imageSrc;
      } catch (error) {
        setIsError(true);
        console.error("Error fetching drone data:", error);
      }
    };

    fetchDrone();
  }, [id, token]);

  const updateDrone = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/api/drone/${id}`,
        {
          name: nameInputRef.current?.value,
          maxSpeed: Number(maxSpeedInputRef.current?.value),
          range: Number(rangeInputRef.current?.value),
          imageSrc: imageSrcInputRef.current?.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/dashboard");
    } catch (error) {
      setIsError(true);
      console.error("Error updating drone:", error);
    }
  };

  return (
    <Section>
      <div className="max-w-[400px] w-full mx-auto flex flex-col">
        <img
          src={"/images/new_drone.png"}
          alt="Edit Drone Page Image"
          className="max-w-[400px] mx-auto w-[90%]"
        />

        <div className="text-xl font-bold border-b-2 w-full text-center border-slate-200 text-slate-600">
          Edit Drone
        </div>

        {/* ERROR */}
        <ErrorContainer visible={isError} />

        <form onSubmit={updateDrone} className="p-4 gap-4 flex flex-col">
          <input
            type="text"
            placeholder="Name"
            className="auth-input"
            ref={nameInputRef}
          />
          <input
            type="number"
            placeholder="Max Speed"
            className="auth-input"
            ref={maxSpeedInputRef}
          />
          <input
            type="number"
            placeholder="Range"
            className="auth-input"
            ref={rangeInputRef}
          />
          <input
            type="text"
            placeholder="Image Src"
            className="auth-input"
            ref={imageSrcInputRef}
          />

          <button className="button py-2 px-6 w-fit mx-auto" type="submit">
            Update
          </button>
        </form>
      </div>
    </Section>
  );
};

export default Page;
