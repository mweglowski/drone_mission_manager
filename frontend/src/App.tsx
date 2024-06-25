import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import DashboardPage from "./components/pages/dashboard/Page";
import NewDronePage from "./components/pages/dashboard/drone/new/Page";
import EditDronePage from "./components/pages/dashboard/drone/edit/Page";
import EditUserPage from "./components/pages/dashboard/user/edit/Page";

import Home from "./components/pages/home/Page";

import MissionsPage from "./components/pages/missions/Page";
import NewMissionPage from "./components/pages/missions/new/Page";
import MissionPage from "./components/pages/missions/id/Page";

import AccountPage from "./components/pages/account/Page";
import AccountNewPasswordPage from "./components/pages/account/password/new/Page";

import RegisterPage from "./components/pages/auth/register/Page";
import LoginPage from "./components/pages/auth/login/Page";
import LogoutPage from "./components/pages/auth/logout/Page";
import { useAuth } from "./context/auth-context";

const App: React.FC = () => {
  const { role } = useAuth();

  return (
    <div className="App text-slate-700">
      <Navbar />

      {/* ADMIN INFO */}
      {localStorage.getItem("role") === "ADMIN" && role === "ADMIN" && (
        <div className="w-full fixed bottom-0 text-center flex justify-center z-50">
          <div className="bg-black text-slate-200 w-fit py-[2px] px-3 rounded-t shadow-lg shadow-black">
            ADMIN MODE
          </div>
        </div>
      )}

      {/* ROUTES */}
      <div className="pt-[50px]">
        <Routes>
          {/* ADMIN DASHBOARD */}
          {role === "ADMIN" && (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/drone/new" element={<NewDronePage />} />
              <Route
                path="/dashboard/drone/edit/:id"
                element={<EditDronePage />}
              />
              <Route
                path="/dashboard/user/edit/:id"
                element={<EditUserPage />}
              />
            </>
          )}

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* MISSIONS */}
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/missions/new" element={<NewMissionPage />} />
          <Route path="/missions/:id" element={<MissionPage />} />

          {/* ACCOUNT */}
          <Route path="/account" element={<AccountPage />} />
          <Route
            path="/account/password/new"
            element={<AccountNewPasswordPage />}
          />

          {/* AUTHENTICATION */}
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/logout" element={<LogoutPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
