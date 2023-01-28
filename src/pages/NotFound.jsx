import { Link } from "react-router-dom"
import { notFound } from "../assets"

const NotFound = () => {
  return (
    <div className='flex items-center justify-center h-screen font-sans text-gray-700'>
      <div className='flex flex-col justify-center items-center gap-5'>
        <img src={notFound} alt="404-gif" className="h-64"/>
        <h1 className='font-bold text-4xl'>Look's like you're lost</h1>
        <h2 className="text-lg">This page you are looking for is not available</h2>
        <Link to={'/'} className='font-normal text-xl lg:text-lg bg-blue-800 px-8 lg:px-4 py-4 lg:py-2 text-white rounded-sm'>Back to home</Link>
      </div>
    </div>
  )
}

export default NotFound