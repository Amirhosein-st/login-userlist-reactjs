import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Components/axios/axios';
import Cookies from 'js-cookie';

const UserPage = () => {
    const [userData, setUserData] = useState({});
    const [userImage, setUserImage] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const ID = localStorage.getItem('userId');
            const authorization = Cookies.get('authorization');
            const response = await axiosInstance.get(`moodle/user/${ID}`, {
                headers: {
                    Authorization: authorization,
                },
            });
            setUserData(response.data);
            // localStorage.removeItem('userId');
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchImage = async () => {
            const ID = localStorage.getItem('userId');
            const authorization = Cookies.get('authorization');
            const response22 = await axiosInstance.get(`moodle/user/image/${ID}`, {
                headers: {
                    Authorization: authorization,
                },
            });
            // console.log(response22.data.imageAddress);
            setUserImage(response22.data.imageAddress);
        };
        fetchImage();

    }, []);

    return (
        <div>
            <h1>User Details</h1>
            <p>ID: {userData.id}</p>
            <p>Username: {userData.username}</p>
            <p>First Name: {userData.firstName}</p>
            <p>Family: {userData.family}</p>
            <h2>Roles:</h2>
            <ul>
                {userData.roles?.map((role) => (
                    <li key={role.id}>{role.name} ({role.userRole})</li>
                ))}
            </ul>
            <h2>Info Data:</h2>
            <ul>
                {userData?.infoData?.map((item) => (
                    <li key={item.field.id}>
                        {item.field.name} : {item.data}
                    </li>
                ))}
            </ul>
            <h2>Picture:</h2>
            {/* <img src={`https://kaaryar.hossein.codes/moodle/user/image/${userImage}.png`} alt="User Profile" /> */}
        </div>
    );
};

export default UserPage;