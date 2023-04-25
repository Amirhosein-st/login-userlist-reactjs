import React from 'react';
import LoginPage from './LoginPage';
import UserListPage from './UserListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/userlist" element={<UserListPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;