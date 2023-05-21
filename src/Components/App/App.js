import React, { useState, useEffect } from 'react';
import LoginPage from '../../Pages/LoginPage/LoginPage';
import UserListPage from '../../Pages/UserListPage/UserListPage';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../../Pages/DashboardPage/DashboardPage';
import Layout from "./Layout";

function App() {

  return (
    <Routes>
      <>
        <Route path="/" element={<LoginPage />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/userlist" element={<UserListPage />} />
        </Route>

        {/* <Route path="/LoginPage" element={<LoginPage />} /> */}
        {/* <Route path="*" element={<LoginPage />} /> */}
        
      </>
    </Routes>
  );
}

export default App;