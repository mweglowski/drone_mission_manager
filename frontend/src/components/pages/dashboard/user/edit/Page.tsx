import { useState, useEffect, useRef, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../../../context/auth-context";
import Section from "../../../../../UI/Section";
import ErrorContainer from "../../../auth/ErrorContainer";

const Page = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [isError, setIsError] = useState(false);

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneNumberInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user`, {
          params: { id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;

        if (firstNameInputRef.current)
          firstNameInputRef.current.value = user.firstName;
        if (lastNameInputRef.current)
          lastNameInputRef.current.value = user.lastName;
        if (emailInputRef.current) emailInputRef.current.value = user.email;
        if (phoneNumberInputRef.current)
          phoneNumberInputRef.current.value = user.phoneNumber;
        if (addressInputRef.current)
          addressInputRef.current.value = user.address;
      } catch (error) {
        setIsError(true);
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id, token]);

  // UPDATING USER
  const updateUser = async (event: FormEvent) => {
    event.preventDefault();

    const userObject = {
      firstName: firstNameInputRef.current?.value ?? "",
      lastName: lastNameInputRef.current?.value ?? "",
      email: emailInputRef.current?.value ?? "",
      phoneNumber: phoneNumberInputRef.current?.value ?? "",
      address: addressInputRef.current?.value ?? "",
      password: passwordInputRef.current?.value ?? "",
    };

    // MAKING PUT REQUEST TO OUR BACKEND API
    try {
      await axios.put(`http://localhost:8080/api/user/${id}`, userObject, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/dashboard");
    } catch (error) {
      setIsError(true);
      console.error("There was an error updating the user!", error);
    }
  };

  return (
    <Section>
      <div className="max-w-[400px] w-full mx-auto flex flex-col">
        <img
          src={"/images/login.png"}
          alt="Edit User Page Image"
          className="max-w-[400px] mx-auto w-[90%]"
        />

        <div className="text-xl font-bold border-b-2 w-full text-center border-slate-200 text-slate-600">
          Edit User
        </div>

        {/* ERROR */}
        <ErrorContainer visible={isError} />

        <form onSubmit={updateUser} className="p-4 gap-4 flex flex-col">
          <input
            type="text"
            placeholder="First Name"
            className="auth-input"
            ref={firstNameInputRef}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="auth-input"
            ref={lastNameInputRef}
          />
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            ref={emailInputRef}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="auth-input"
            ref={phoneNumberInputRef}
          />
          <input
            type="text"
            placeholder="Address"
            className="auth-input"
            ref={addressInputRef}
          />
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            ref={passwordInputRef}
          />

          <button className="button py-2 px-6 w-fit mx-auto" type="submit">
            Update
          </button>
        </form>

        <div className="mx-auto mt-8">
          <Link to="/dashboard" className="underline hover:text-violet-700">
            Back
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Page;
