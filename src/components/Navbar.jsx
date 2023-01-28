import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { HiHome } from 'react-icons/hi'
import { VscChecklist } from 'react-icons/vsc';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi'


const navMenu = [
  {
    name: "Home",
    direct: "/",
    icon: HiHome,
  },
  {
    name: "Todo-List",
    direct: "/todo",
    icon: VscChecklist,
  },
  {
    name: "Favorite",
    direct: "/favorites",
    icon: BsFillSuitHeartFill,
  },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    setIsOpen(false)
  }

  function handleLogout() {
    sessionStorage.removeItem('token');
    navigate('/signin');
  }

  return (
    <>
      <nav>
        {/* Dekstop nav */}
        <div className='hidden lg:flex fixed bg-blue-900 h-screen w-[21rem] text-white flex-col justify-between py-8 px-4'>
          <div className='flex flex-col gap-8'>
            <h1 className='font-bold text-center text-3xl'>Taskmate</h1>
            <div className='w-full h-[0.5px] bg-white' />
            <div className='flex flex-col gap-8 text-xl 2xl:text-2xl ml-4'>
              {navMenu.map((menu) => (
                <div className='flex items-center gap-5' key={menu.name}>
                  <menu.icon />
                  <NavLink to={menu.direct}>{menu.name}</NavLink>
                </div>
              ))}
            </div>
          </div>
          <div className='w-full flex flex-col gap-8'>
            <div className='w-full h-[0.5px] bg-white' />
            <button onClick={() => setIsModalOpen(true)} className='bg-white flex items-center gap-2 text-blue-800 mx-auto px-4 py-2 rounded-full font-semibold 2xl:text-xl'>
              <BiLogOut className='text-2xl' />
              Logout</button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className='block lg:hidden'>
          <div className='flex justify-between w-full p-8 bg-gray-100 text-blue-800 text-[2.75rem]'>
            <NavLink to={'/'} className='font-bold'>Taskmate</NavLink>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ?
                <IoClose />
                :
                <AiOutlineMenu />
              }
            </button>
          </div>
          <div className={`${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[100%]"} fixed pt-16 pb-40 flex flex-col items-center justify-between font-semibold text-blue-800 w-full bg-gray-100 h-full z-40 transition-all`}>
            <div className='flex flex-col items-center gap-24 text-4xl font-bold'>
              {navMenu.map((menu) => (
                <NavLink onClick={handleClick} to={menu.direct} key={menu.name}>{menu.name}</NavLink>
              ))}
            </div>
            <button onClick={() => setIsModalOpen(true)} className='bg-blue-800 text-white text-3xl px-12 py-6 rounded-full'>Logout</button>
          </div>
        </div>
      </nav>

      {isModalOpen && (
                <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-black/50 z-50">
                    <div className="bg-gray-100 h-1/4 lg:h-1/2 w-full lg:w-2/5 mx-16 rounded-2xl flex flex-col items-center justify-evenly px-4">
                        <p className='text-3xl lg:text-2xl 2xl:text-3xl font-bold text-center'>Apakah kamu yakin ingin keluar ?</p>
                        <div className="flex gap-10 text-white text-2xl lg:text-lg 2xl:text-2xl font-semibold">
                            <button className='bg-red-500 min-w-[9rem] lg:min-w-[7rem] 2xl:min-w-[9rem] px-8 lg:px-4 2xl:px-8 py-4 lg:py-3 2xl:py-4 rounded-lg border-[1px] border-black' onClick={() => setIsModalOpen(false)}>No</button>
                            <button className='bg-blue-800 min-w-[9rem] lg:min-w-[7rem] 2xl:min-w-[9rem] px-8 lg:px-4 2xl:px-8 py-4 lg:py-3 2xl:py-4 rounded-lg border-[1px] border-black' onClick={handleLogout}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
    </>
  );
};

export default Navbar;