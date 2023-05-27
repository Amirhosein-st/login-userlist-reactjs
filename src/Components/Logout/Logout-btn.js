import { useNavigate } from 'react-router-dom';
import React from 'react';
import Cookies from 'js-cookie';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('authorization');
        localStorage.removeItem('username , roles');
        localStorage.removeItem('profile');

        navigate('/');
    };

    return (
        <button onClick={handleLogout} style={{ color: "orange", backgroundColor: "red", marginLeft: "10px" }}>Log out</button>
    );
}

export default Logout;