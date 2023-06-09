import React, { useState } from 'react';
import axiosInstance from '../../Components/axios/axios';
import { useUserContext } from '../../Components/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setProfile } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
  
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
  
      const response = await axiosInstance.post('auth/login', Object.fromEntries(formData.entries()), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.data && response.data.authorization) {
        Cookies.set('authorization', response.data.authorization, { expires: 1 });
  
        localStorage.setItem('username , roles', JSON.stringify(`${response.data.profile.username}/${response.data.profile.roles}`));
  
        setProfile(response.data.profile);
  
        navigate('/home');
      } else {
        setError('Unexpected response from the server');
      }
  
    } catch (error) {
      setError(error.message);
    }
    
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login Page</h1>
      <div>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button type="submit" style={{backgroundColor:"yellow"}}>Log in</button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;