import React from "react";
import { User as UserInterface } from "../../../types/User";
import User from "./User";

interface UsersListProps {
  users: UserInterface[];
  onDeleteUser: (id: number) => void;
}

const UsersList = ({ users, onDeleteUser }: UsersListProps) => {
  return (
    <ul className="flex flex-col gap-2">
      {users.map((user: UserInterface) => (
        <li key={user.id}>
          <User user={user} onDelete={onDeleteUser} />
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
