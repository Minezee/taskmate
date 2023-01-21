import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {

  return (
    <div className='flex justify-between w-full p-4 bg-gray-100'>
        <div className='font-sans font-bold text-blue-800 text-4xl'>Taskmate</div>
    </div>
  );
};

export default Navbar;