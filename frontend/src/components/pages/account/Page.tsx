import { FC, useEffect, useState } from "react";
import Section from "../../../UI/Section";
import axios from "axios";
import { Link } from "react-router-dom";

interface UserData {
	firstName: string,
	lastName: string,
	email: string,
}

const Page: FC = () => {
  const [userData, setUserData] = useState<UserData>();

  // FETCH USER DETAILS
  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          `http://localhost:8080/api/user?id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data by userId:  " + error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Section>
      {/* SECTION IMAGE */}
      <img
        src={"/images/account.png"}
        alt="Missions Page Image"
        className="w-full max-w-[450px] mx-auto mb-4"
      />

      <div className="max-w-[600px] w-full flex flex-col mx-auto">
				{/* TITLE */}
				<div className="text-xl font-bold border-b-2 border-slate-200 mb-4">Account Details</div>

				{/* DETAILS */}
				<div>
					<div className="flex justify-between">
						<div>First Name</div>
						<div>{userData?.firstName}</div>
					</div>

					<div className="flex justify-between">
						<div>Last Name</div>
						<div>{userData?.lastName}</div>
					</div>

					<div className="flex justify-between">
						<div>Email</div>
						<div>{userData?.email}</div>
					</div>
				</div>

				{/* CHANGE PASSWORD BUTTON */}
				<Link to="/account/password/new" className="button w-fit px-4 py-1 mx-auto mt-[30px]">Change Password</Link>
			</div>
    </Section>
  );
};

export default Page;
