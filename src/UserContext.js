import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [authorization, setAuthorization] = useState(localStorage.getItem('authorization'));
  const [profile, setProfile] = useState(null);

  const value = {
    authorization,
    setAuthorization,
    profile,
    setProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};