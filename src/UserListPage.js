import React, { useState, useEffect } from 'react';
import axiosInstance from './axios';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

const UserListPage = () => {
  const [userList, setUserList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 const { authorization, setAuthorization } = useUserContext();
  
  const handleLogout = () => {
    localStorage.removeItem('authorization');
  };
  
  useEffect(() => {
    const fetchUserList = async () => {
      setIsLoading(true);
      setError(null);

      if (!authorization) {
        throw new Error('Authorization code not found');
      }
      
      if (authorization.length === 0) {
        throw new Error('Invalid authorization code');
      }

      try {
        const response = await axiosInstance.get('moodle/user/student/all?pageNum=0&pageSize=15', {
          headers: {
            Authorization: authorization,
          },
        });

        setUserList(response.data);
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    };

    fetchUserList();
  }, [authorization]);

  const renderUserList = () => {
    if (!userList) {
      return null;
    }

    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Role</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>mobile</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id} - </td>
              <td>{user.moodleRole.userRole} - </td>
              <td>{user.moodleUser.firstName} - </td>
              <td>{user.moodleUser.lastName} - </td>
              <td>{user.moodleUser.mobile} - </td>
              <td>{user.moodleUser.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>User List</h1>
      <Link to="/"><button onClick={handleLogout}>Log out</button></Link>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {renderUserList()}
    </div>
  );
};

export default UserListPage;