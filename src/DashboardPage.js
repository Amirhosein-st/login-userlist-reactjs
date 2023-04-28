import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

const DashboardPage = () => {
  const { profile } = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem('authorization');
  };

  return (
    <div>
      <h1>You are logged in!</h1>
      <h3>Dashboard</h3>
      <Link to="/dashboard/userlist"><button style={{color:"orange" , backgroundColor:"green"}}>View User List</button></Link>
      <Link to="/"><button onClick={handleLogout} style={{color:"orange" , backgroundColor:"red" , marginLeft:"10px"}}>Log out</button></Link>
      <div className="user-detail">
        <h2>User Details:</h2>
        {profile && (
          <>
            <p>Id: {profile.id}</p>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
            {profile.roles && (
              <>
                <p>Roles - {profile.roles.length}:</p>
                <ul>
                  {profile.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;