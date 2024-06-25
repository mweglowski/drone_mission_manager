import React from "react";
import UserIcon from "../../../icons/user.svg";
import { Link } from "react-router-dom";
import { User as UserInterface } from "../../../types/User";

interface UserProps {
  user: UserInterface;
  onDelete: (id: number) => void;
}

const User = ({ user, onDelete }: UserProps) => {
  const deleteHandler = () => {
    onDelete(user.id);
  };

  return (
    <div className="flex p-2 border-2 border-slate-200 rounded">
      <img src={UserIcon} className="w-[37px] mr-2" />

      {/* DETAILS */}
      <div>
        <div className="text-slate-500">
          {user.firstName} {user.lastName}
        </div>
        <div className="text-slate-400">{user.email}</div>
      </div>

      {/* CONTROL BUTTONS */}
      <div className="flex items-center ml-auto gap-1">
        <button
          onClick={deleteHandler}
          className="mission-type hover:bg-slate-200 duration-300 bg-white"
        >
          Delete
        </button>
        <Link
          to={"/dashboard/user/edit/" + user.id}
          className="mission-type hover:bg-slate-200 duration-300 bg-white"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default User;
