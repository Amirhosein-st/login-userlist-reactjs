import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Components/axios/axios';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../Components/UserContext/UserContext';
import Cookies from 'js-cookie';
import Logout from "../../Components/Logout/Logout-btn";

const UserListPage = () => {
  const [userList, setUserList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authorization } = useUserContext();


  useEffect(() => {
    const fetchUserList = async () => {
      setIsLoading(true);
      setError(null);
      const authorization = Cookies.get('authorization');
      if (!authorization) {
        setError('Authorization code not found');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.get('moodle/user/assignee', {
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
            <th>City</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id} - </td>
              <td>{user.role.name} - </td>
              <td>{user.assigneeContext.student.studentFirstName} - </td> 
              <td>{user.assigneeContext.student.studentLastName} - </td> 
              <td>{user.assigneeContext.student.studentCity} - </td> 
              <td>{user.assigneeContext.student.studentEmail} - </td>
              <td>{user.assigneeContext.student.studentPhone} - </td>
              <td>{user.assigneeContext.student.studentMobile} - </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>User List</h1>
      <Link to="/dashboard">
        <button style={{backgroundColor:"orange" , color:"green"}}>Go Dashboard</button>
      </Link>
      <Logout />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {renderUserList()}
    </div>
  );
};

export default UserListPage;