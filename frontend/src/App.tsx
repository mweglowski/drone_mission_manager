import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import MissionsPage from "./components/pages/missions/Page";
import LoginPage from "./components/pages/auth/login/Page";
import RegisterPage from "./components/pages/auth/register/Page";

const App: React.FC = () => {
  return (
    <div className="App text-slate-700">
      <Navbar />

      <div className="pt-[50px]">
        <Routes>
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
