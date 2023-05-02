import { createContext, useContext, useState } from 'react';
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
    setProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};