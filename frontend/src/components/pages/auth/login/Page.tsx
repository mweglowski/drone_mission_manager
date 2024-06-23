import React, { FormEvent, useRef, useState } from "react";
import Section from "../../../../UI/Section";
import { Link, useNavigate } from "react-router-dom";
import ErrorContainer from "../ErrorContainer";
import axios from "axios";
import { useAuth } from "../../../../context/auth-context";

const Page = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [isError, setIsError] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // LOG USER IN
  const authenticate = async (event: FormEvent) => {
    event?.preventDefault();

    const credentials = {
      email: emailInputRef.current?.value ?? "",
      password: passwordInputRef.current?.value ?? "",
    };

    try {
      // AUTHENTICATE VIA API
      const response = await axios.post(
        "http://localhost:8080/api/auth/authenticate",
        credentials
      );

      // GET TOKEN
      const token = response.data.token;
      const userId = response.data.userId;

      // CONTEXT
      login(token, userId);
      navigate("/missions");
    } catch (error) {
      setIsError(true);
      console.error(error);
    }
  };

  return (
    <Section>
      <div className="max-w-[400px] w-full mx-auto flex flex-col">
        <img
          src={"/images/login.png"}
          alt="Login Page Image"
          className="max-w-[400px] mx-auto w-[90%]"
        />

        <div className="text-xl font-bold border-b-2 w-full text-center border-slate-200 text-slate-600">
          Login
        </div>

        {/* ERROR */}
        <ErrorContainer visible={isError} />

        <form onSubmit={authenticate} className="p-4 gap-4 flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            defaultValue="example@email.com"
            ref={emailInputRef}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            defaultValue="siema"
            ref={passwordInputRef}
          />

          <button className="button py-2 px-6 w-fit mx-auto" type="submit">
            Login
          </button>
        </form>

        <div className="mx-auto mt-8">
          Don't have an account?{" "}
          <Link to="/auth/register" className="underline hover:text-violet-700">
            Register
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Page;
