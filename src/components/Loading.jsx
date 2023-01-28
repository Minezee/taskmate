import { loader } from "../assets"

const Loading = ({ title }) => {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center ">
        <img src={loader} alt={title} className="w-64 h-64 object-contain" />
        <h1 className="font-bold text-2xl text-black mt-2">Loading...</h1>
      </div>
    </div>
  )
}

export default Loading