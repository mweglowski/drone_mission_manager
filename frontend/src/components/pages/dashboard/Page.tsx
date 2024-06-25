import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth-context";
import { Drone } from "../../../types/Drone";
import Section from "../../../UI/Section";
import DronesList from "./DronesList";
import { Link } from "react-router-dom";
import { User } from "../../../types/User";
import UsersList from "./UsersList";

const Page = () => {
  const { token } = useAuth();
  const [drones, setDrones] = useState<Drone[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // DELETE USER
  const deleteUserHandler = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((prevUsers: User[]) =>
        prevUsers.filter((user: User) => user.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete drone: ", error);
    }
  };

  // DELETE DRONE
  const deleteDroneHandler = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/drone/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDrones((prevDrones: Drone[]) =>
        prevDrones.filter((drone: Drone) => drone.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete drone: ", error);
    }
  };

  // GET DATA
  useEffect(() => {
    // GET USERS
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users: ", error);
      }
    };

    // GET DRONES
    const fetchDroneData = async () => {
      const response = await axios.get("http://localhost:8080/api/drone", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDrones(response.data);
    };

    fetchUserData();
    fetchDroneData();
  }, []);

  return (
    <Section classNames="max-w-[900px] w-full mx-auto">
      <img
        src={"/images/dashboard.png"}
        alt="New Drone Page Image"
        className="max-w-[400px] mx-auto w-[90%]"
      />

      {/* USERS */}
      <div className="text-xl font-bold border-b-2 mb-4 border-slate-200">
        Users
      </div>
      <UsersList users={users} onDeleteUser={deleteUserHandler} />

      {/* DRONES (DRONES LIST, ADDING DRONE) */}
      <div className="text-xl font-bold border-b-2 mb-4 border-slate-200 mt-[100px]">
        Drones
      </div>
      <DronesList drones={drones} onDeleteDrone={deleteDroneHandler} />
      <Link
        to="/dashboard/drone/new"
        className="button w-fit px-3 py-1 mx-auto mt-4"
      >
        Add Drone
      </Link>
    </Section>
  );
};

export default Page;
