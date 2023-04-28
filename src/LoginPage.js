import React, { useState } from 'react';
import axiosInstance from './axios';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthorization,  setProfile } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axiosInstance.post('oauth2/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.data && response.data.access_token) {
        setAuthorization(`Bearer ${response.data.access_token}`);
        localStorage.setItem('authorization', JSON.stringify(`Bearer ${response.data.access_token}`));

        setProfile(response.data.profile);
        navigate('/dashboard');
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
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button type="submit">Log in</button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginPage;