import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '../components';

const PrivateRoutes = () => {
    const token = sessionStorage.token;

    return (
        token ? 
        <div className='flex flex-col lg:flex-row w-full'>  
            <div className='w-full lg:w-[21rem]'>
                <Navbar />
            </div>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div> 
        :
        <Navigate to={'/signin'} />
    );
};

export default PrivateRoutes;