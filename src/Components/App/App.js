import React, { useState, useEffect } from 'react';
import LoginPage from '../../Pages/LoginPage/LoginPage';
import UserListPage from '../../Pages/UserListPage/UserListPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from '../UserContext/UserContext';
import DashboardPage from '../../Pages/DashboardPage/DashboardPage';
import Cookies from 'js-cookie';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const Token = Cookies.get('authorization');

  useEffect(() => {
    if (Token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [Token]);

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          {loggedIn ? (
            <>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/userlist" element={<UserListPage />} />
            </>
          ) : (
            <>
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route path="*" element={<LoginPage />} />
            </>
          )}
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;