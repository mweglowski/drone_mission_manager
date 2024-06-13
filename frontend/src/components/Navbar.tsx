import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="fixed w-full p-2 flex justify-center border-b-2 border-slate-200 text-slate-700 bg-[#ffffffee] z-50">
      <ul className="flex gap-2">
        <Link to={"/"} className="nav-link">
          Home
        </Link>
        <Link to={"/missions"} className="nav-link">
          Missions
        </Link>
        <Link to={"/auth/login"} className="nav-link">
          Login
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
