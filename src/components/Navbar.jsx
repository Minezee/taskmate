import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='flex justify-between w-full p-8 px-4 bg-gray-100 text-blue-800 text-4xl'>
        <div className='font-sans font-bold'>Taskmate</div>
        <div>
          {isOpen ?
            <AiOutlineClose />
            :
            <AiOutlineMenu />
          }
        </div>
    </div>
  );
};

export default Navbar;