import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar';

const PrivateRoutes = () => {
    const token = sessionStorage.token;

    return (
        token ? 
        <>  
            <Navbar />
            <Outlet />
        </> 
        :
        <Navigate to={'/signin'} />
    );
};

export default PrivateRoutes;