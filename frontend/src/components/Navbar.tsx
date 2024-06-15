import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Navbar: React.FC = () => {
  const { email } = useAuth();

  return (
    <nav className="fixed w-full p-2 flex justify-center border-b-2 border-slate-200 text-slate-700 bg-[#ffffffee] z-50">
      <ul className="flex gap-2">
        <Link to={"/"} className="nav-link">
          Home
        </Link>
        {email && (
          <Link to={"/missions"} className="nav-link">
            Missions
          </Link>
        )}
        <Link to={`/auth/${email ? "logout" : "login"}`} className="nav-link">
          {email ? "Logout" : "Login"}
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
