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
  const [page, setPage] = useState(1);
  const [userSize, setUserSize] = useState(15);

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
      const response = await axiosInstance.get(`moodle/user/student/all?pageNum=${page}&pageSize=${userSize}`, {
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
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id} style={{ cursor: "pointer" }}>
                <Link to={`/home/userlist/user/${user.moodleUser.id}`} style={{ textDecoration: "none" ,  color:"black"}}>
                  <td>{user.moodleUser.id} - </td>
                  <td>{user.moodleUser.firstName} - </td>
                  <td>{user.moodleUser.lastName} - </td>
                </Link>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={prevPage} disabled={page === 1}>Previous</button>
          <span> page: {page} </span>
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