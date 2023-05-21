import React, { useState, useEffect } from 'react';
import LoginPage from '../../Pages/LoginPage/LoginPage';
import UserListPage from '../../Pages/UserListPage/UserListPage';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../../Pages/DashboardPage/DashboardPage';
import ProtectedLayout from "./Layout";
import NotFound from "./notFound";

function App() {

  return (
    <Routes>
      <>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/home/userlist" element={<UserListPage />} />
        </Route>

        {/* <Route path="/LoginPage" element={<LoginPage />} /> */}
        <Route path="*" element={<NotFound />} />
        
      </>
    </Routes>
  );
}

export default App;