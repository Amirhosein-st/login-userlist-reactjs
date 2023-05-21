import { createContext, useContext } from 'react';
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [authorization, setAuthorization] = useState(Cookies.get('authorization'));
  const [profile, setProfile] = useState(null);

  const value = {
    authorization,
    setAuthorization: (value) => {
      setAuthorization(value);
      Cookies.set('authorization', value, { expires: 1 });
    },
    profile,
    setProfile: (value) => {
      setProfile(value);
      localStorage.setItem('profile', JSON.stringify(value));
    },
  };

  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem('profile'));
    if (profileData) {
      setProfile(profileData);
    }
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};