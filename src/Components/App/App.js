import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProtectedLayout from "../Layout/Layout";
import NotFound from "../../Pages/NotFound/notFound";

import LoginPage from '../../Pages/LoginPage/LoginPage';
import HomePage from '../../Pages/HomePage/HomePage';
import UserListPage from '../../Pages/UserListPage/UserListPage';
import UserPage from '../../Pages/UserPage/UserPage';

function App() {

  return (
    <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/userlist" element={<UserListPage />} />
          <Route path="/home/userlist/user" element={<UserPage />} />
        </Route>

    </Routes>
  );
}

export default App;