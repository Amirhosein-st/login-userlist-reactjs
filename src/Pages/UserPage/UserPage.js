import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Components/axios/axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logout from "../../Components/Logout/Logout-btn";

const UserPage = () => {
    const [userData, setUserData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const authorization = Cookies.get('authorization');
            const response = await axiosInstance.get(`moodle/user/${id}`, {
                headers: {
                    Authorization: authorization,
                },
            });
            console.log(response.data);
            setUserData(response.data);
        };
        fetchData();
    }, [id]);

    return (
        <>
            <div>
                <h1>User List</h1>
                <Link to="/home">
                    <button style={{ backgroundColor: "orange", color: "green" }}>Go Home</button>
                </Link>
                <Link to="/home/userlist">
                    <button style={{ backgroundColor: "green", color: "yellow" , marginLeft:"10px"}}>Go User List</button>
                </Link>
                <Logout />
            </div>
            <div>
                <h1>User Details</h1>
                <p>ID: {userData.id}</p>                
                <p>Username: {userData.username}</p>
                <p>First Name: {userData.firstName}</p>
                <p>Last Name: {userData.lastName}</p>
                <p>Email: {userData.email}</p>
                <p>Mobile: {userData.mobile}</p>
                <p>Phone: {userData.phone}</p>
                <p>Address: {userData.address}</p>
                <p>City: {userData.city}</p>
                <p>Country: {userData.country}</p>
                <p>Department: {userData.department}</p>
                <p>Description: {userData.description}</p>
                <p>Roles: {userData.roles && userData.roles.map(role => role.userRole).join(', ')}</p>
                <p>Picture: {userData.picture || 'N/A'}</p>
                <p>Timezone: {userData.timezone}</p>
            </div>
        </>
    );
};

export default UserPage;