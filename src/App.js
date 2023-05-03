import React from 'react';
import LoginPage from './LoginPage';
import UserListPage from './UserListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import DashboardPage from './DashboardPage';

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/userlist" element={<UserListPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;