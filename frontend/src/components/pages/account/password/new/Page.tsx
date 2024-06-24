import { FC, FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import Section from "../../../../../UI/Section";
import { useNavigate } from "react-router-dom";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

const Page: FC = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const currentPasswordInputRef = useRef<HTMLInputElement>(null);
  const newPasswordInputRef = useRef<HTMLInputElement>(null);
  const repeatNewPasswordInputRef = useRef<HTMLInputElement>(null);

  // CHANGE USER PASSWORD FUNCTION
  const changeUserPassword = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/change-password",
        {
          id: Number(userId),
          currentPassword: currentPasswordInputRef.current?.value,
          newPassword: newPasswordInputRef.current?.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

			navigate("/account");
    } catch (error) {
      setError("Ensure that you entered valid current password");
      console.error("Failed to change password: ", error);
    }
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (
      newPasswordInputRef.current?.value !==
      repeatNewPasswordInputRef.current?.value
    ) {
      setError("Passwords are not the same!");
      return;
    } else {
      setError("");
    }

    changeUserPassword();
  };

  return (
    <Section>
      <div className="max-w-[400px] w-full flex flex-col mx-auto mt-[100px]">
        {/* TITLE */}
        <div className="text-xl font-bold mx-auto mb-4 border-b-2 border-slate-200 w-full text-center">
          New Password
        </div>

        {/* ERROR BOX */}
        <div className="text-red-500 mx-auto">{error}</div>

        {/* NEW PASSWORD FORM */}
        <form onSubmit={formSubmitHandler} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="auth-input"
            defaultValue="siema"
            ref={currentPasswordInputRef}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="auth-input"
            defaultValue="siema2"
            ref={newPasswordInputRef}
            required
          />
          <input
            type="password"
            placeholder="Repeat New Password"
            className="auth-input"
            defaultValue="siema2"
            ref={repeatNewPasswordInputRef}
            required
          />

          <button
            type="submit"
            className="button w-fit px-4 py-1 mx-auto mt-[30px]"
          >
            Change
          </button>
        </form>
      </div>
    </Section>
  );
};

export default Page;
