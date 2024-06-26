import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Navbar: React.FC = () => {
  const { userId, role } = useAuth();

  return (
    <nav className="fixed w-full p-2 flex justify-center border-b-2 border-slate-200 text-slate-700 bg-[#ffffffee] z-50">
      <ul className="flex gap-2">
        {role === "ADMIN" && userId && <Link to={"/dashboard"} className="nav-link">
          Dashboard
        </Link>}

        <Link to={"/"} className="nav-link">
          Home
        </Link>
        {userId && (
          <>
            <Link to={"/missions"} className="nav-link">
              Missions
            </Link>
            <Link to={"/account"} className="nav-link">
              Account
            </Link>
          </>
        )}
        <Link to={`/auth/${userId ? "logout" : "login"}`} className="nav-link">
          {userId ? "Logout" : "Login"}
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
