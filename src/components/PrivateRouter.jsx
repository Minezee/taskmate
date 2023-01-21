import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const token = sessionStorage.token;

    return (
        token ? <Outlet /> : <Navigate to={'/signin'} />
    );
};

export default PrivateRoutes;