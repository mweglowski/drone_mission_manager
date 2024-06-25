import React, { FormEvent, useRef, useState } from 'react'
import ErrorContainer from '../../../auth/ErrorContainer';
import Section from '../../../../../UI/Section';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../../context/auth-context';

const Page = () => {
	const { token } = useAuth();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const maxSpeedInputRef = useRef<HTMLInputElement>(null);
  const rangeInputRef = useRef<HTMLInputElement>(null);
  const imageUrlInputRef = useRef<HTMLInputElement>(null);

  const createDrone = async (event: FormEvent) => {
    event.preventDefault();

    const drone = {
      name: nameInputRef.current?.value ?? '',
      maxSpeed: parseFloat(maxSpeedInputRef.current?.value ?? '0'),
      range: parseFloat(rangeInputRef.current?.value ?? '0'),
      imageSrc: imageUrlInputRef.current?.value ?? ''
    };

    try {
      await axios.post('http://localhost:8080/api/drone', drone, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate('/dashboard');
    } catch (error) {
      setIsError(true);
      console.error('Error creating drone:', error);
    }
  };

  return (
    <Section>
      <div className="max-w-[400px] w-full mx-auto flex flex-col">
        <img
          src={"/images/new_drone.png"}
          alt="New Drone Page Image"
          className="max-w-[400px] mx-auto w-[90%]"
        />

        <div className="text-xl font-bold border-b-2 w-full text-center border-slate-200 text-slate-600">
          Create New Drone
        </div>

        {/* ERROR */}
        <ErrorContainer visible={isError} />

        <form onSubmit={createDrone} className="p-4 gap-4 flex flex-col">
          <input
            type="text"
            placeholder="Drone Name"
            className="auth-input"
            ref={nameInputRef}
          />
          <input
            type="number"
            placeholder="Max Speed (m/s)"
            className="auth-input"
            ref={maxSpeedInputRef}
          />
          <input
            type="number"
            placeholder="Range (km)"
            className="auth-input"
            ref={rangeInputRef}
          />
          <input
            type="text"
            placeholder="Image URL"
            className="auth-input"
            ref={imageUrlInputRef}
          />

          <button className="button py-2 px-6 w-fit mx-auto" type="submit">
            Create Drone
          </button>
        </form>
      </div>
    </Section>
  );
}

export default Page