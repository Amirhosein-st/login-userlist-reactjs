import React, { useState } from 'react';
import axiosInstance from './axios';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { authorization, setAuthorization, profile, setProfile } = useUserContext();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthorization(null);
    localStorage.removeItem('authorization');
    setProfile(null); // clear the user profile when logging out
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', {
        username,
        password,
      });

      if (response.data && response.data.authorization) {
        setAuthorization(response.data.authorization);
        localStorage.setItem('authorization', JSON.stringify(response.data.authorization));

        console.log(response.data.profile);
        setProfile(response.data.profile); // store the user profile in state
        setIsLoggedIn(true);
      } else {
        setError('Unexpected response from the server');
      }

    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  if (isLoggedIn) {
    return (
      <div>
        <h1>You are logged in!</h1>
        <Link to="/userlist">View User List</Link>
        <button onClick={handleLogout}>Log out</button>
        <div className='user-detail'>
          <h2>User Details:</h2>
          {profile && (
            <>
              <p>Id: {profile.id}</p>
              <p>Username: {profile.username}</p>
              <p>Email: {profile.email}</p>
              <p>Roles-{profile.roles.length}: <span style={{ display: 'flex'}}>{profile.roles}</span></p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button type="submit">Log in</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;