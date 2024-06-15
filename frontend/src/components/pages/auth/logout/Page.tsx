import { FormEvent, useRef } from "react";
import Section from "../../../../UI/Section";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/auth-context";

const Page = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // LOGOUT USER
  const logoutHandler = async (event: FormEvent) => {
    event?.preventDefault();

    logout();
    navigate("/");
  };

  return (
    <Section>
      <div className="max-w-[400px] w-full mx-auto flex flex-col">
        <div className="text-xl font-bold mt-[100px] border-b-2 w-full text-center border-slate-200 text-slate-600">
          Are you sure to logout?
        </div>

        <form onSubmit={logoutHandler} className="p-8 flex flex-col gap-8">
          <button className="button py-2 px-6 w-fit mx-auto" type="submit">
            Logout
          </button>

          <Link
            to="/missions"
            className="duration-300 hover:text-violet-700 underline mx-auto"
          >
            Back
          </Link>
        </form>
      </div>
    </Section>
  );
};

export default Page;
