import { Navigate, Outlet } from "react-router-dom";
import Cookies from 'js-cookie';

const ProtectedLayout = () => {
    let tokenValidation = Cookies.get('authorization');

    return tokenValidation ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedLayout;