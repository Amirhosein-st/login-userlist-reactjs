import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Components/axios/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Components/UserContext/UserContext';
import Cookies from 'js-cookie';
import Logout from "../../Components/Logout/Logout-btn";

const UserListPage = () => {
  const [userList, setUserList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authorization } = useUserContext();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const navigate = useNavigate();


  useEffect(() => {
    fetchUserList();
  }, [authorization, page]);

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
      const response = await axiosInstance.get(`moodle/user/student/all?pageNum=${page}&pageSize=${pageSize}`, {
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

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handIDClick = (id) => {
    localStorage.setItem('userId', id);
    navigate('/home/userlist/user');
  };

  const renderUserList = () => {
    if (!userList) {
      return null;
    }

    return (
      <>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Phone</th>
              <th>Mobile</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id} onClick={() => handIDClick(user.id)} style={{cursor:("pointer")}}>
                <td>{user.id} - </td>
                <td>{user.firstName} - </td>
                <td>{user.family} - </td>
                <td>{user.email} - </td>
                <td>{user.city} - </td>
                <td>{user.phone} - </td>
                <td>{user.mobile} - </td>
                <td>
                  {user.roles.map((roles) => (
                    <tr key={`${user.id}-${roles.name}-${roles.userRole}`}>
                      <td>{roles.name} / {roles.userRole} -</td>
                    </tr>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={prevPage} disabled={page === 1}>Previous</button>
          <button onClick={nextPage}>Next</button>
        </div>
      </>
    );
  };

  return (
    <div>
      <h1>User List</h1>
      <Link to="/home">
        <button style={{ backgroundColor: "orange", color: "green" }}>Go Dashboard</button>
      </Link>
      <Logout />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {renderUserList()}
    </div>
  );
};

export default UserListPage;