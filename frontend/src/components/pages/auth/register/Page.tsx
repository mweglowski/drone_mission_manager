import React, { FormEvent, useRef, useState } from "react";
import Section from "../../../../UI/Section";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorContainer from "../ErrorContainer";
import { useAuth } from "../../../../context/auth-context";

const Page = () => {
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // REGISTERING USER
  const registerUser = async (event: FormEvent) => {
    event.preventDefault();

    const userObject = {
      firstName: firstNameInputRef.current?.value ?? "",
      lastName: lastNameInputRef.current?.value ?? "",
      email: emailInputRef.current?.value ?? "",
      phoneNumber: phoneNumberInputRef.current?.value ?? "",
      address: addressInputRef.current?.value ?? "",
      password: passwordInputRef.current?.value ?? "",
      role: "USER",
    };

    console.log("register data\n", userObject)

    // MAKING POST REQUEST TO OUR BACKEND API
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        userObject
      );

      console.log("User registered:", response.data);

      navigate("/auth/login");
    } catch (error) {
      setIsError(true);

      console.error("There was an error registering the user!", error);
    }
  };

  return (
    <Section>
      <div className="max-w-[400px] w-full mx-auto flex flex-col">
        <div className="text-xl font-bold mt-[100px] border-b-2 w-full text-center border-slate-200 text-slate-600">
          Register
        </div>

        {/* ERROR */}
        <ErrorContainer visible={isError} />

        <form onSubmit={registerUser} className="p-4 gap-4 flex flex-col">
          <input
            type="text"
            placeholder="First Name"
            className="auth-input"
            defaultValue="Marcin"
            ref={firstNameInputRef}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="auth-input"
            defaultValue="Weglowski"
            ref={lastNameInputRef}
          />
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            defaultValue="example@email.com"
            ref={emailInputRef}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="auth-input"
            defaultValue="575 900 729"
            ref={phoneNumberInputRef}
          />
          <input
            type="text"
            placeholder="Address"
            className="auth-input"
            defaultValue="Rajska 20, 90-500 Gdańsk"
            ref={addressInputRef}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            defaultValue="siema"
            ref={passwordInputRef}
          />

          <button className="button py-2 px-6 w-fit mx-auto" type="submit">
            Register
          </button>
        </form>

        <div className="mx-auto mt-8">
          Already have an account?{" "}
          <Link to="/auth/login" className="underline hover:text-violet-700">
            Login
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Page;
