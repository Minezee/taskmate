import { Outlet, Navigate } from 'react-router-dom';
import { BasicNav } from '../components';

const CheckUser = () => {
    const token = sessionStorage.token
    return (
        token ? <Navigate to={'/account'} /> : 
        <>
        <BasicNav />
        <Outlet />
        </>
    );
};

export default CheckUser;