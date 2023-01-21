import { Outlet, Navigate } from 'react-router-dom';

const CheckUser = () => {
    const token = sessionStorage.token
    return (
        token ? <Navigate to={'/account'} /> :  <Outlet />
    );
};

export default CheckUser;