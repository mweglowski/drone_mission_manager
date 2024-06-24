import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./components/pages/home/Page";

import MissionsPage from "./components/pages/missions/Page";
import NewMissionPage from "./components/pages/missions/new/Page";
import MissionPage from "./components/pages/missions/id/Page";

import AccountPage from "./components/pages/account/Page";
import AccountNewPasswordPage from "./components/pages/account/password/new/Page";

import RegisterPage from "./components/pages/auth/register/Page";
import LoginPage from "./components/pages/auth/login/Page";
import LogoutPage from "./components/pages/auth/logout/Page";

const App: React.FC = () => {
  return (
    <div className="App text-slate-700">
      <Navbar />

      <div className="pt-[50px]">
        <Routes>
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
