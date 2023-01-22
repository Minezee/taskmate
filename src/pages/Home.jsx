import { useState, useEffect } from "react";
import { notesHome, notes } from "../assets";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa'
import { NoteDummy } from "../components";

const Home = () => {
    const token = sessionStorage.getItem('token')
    const [user, setUser] = useState(null);
    const [allNotes, setAllNotes] = useState(null);
    const navigate = useNavigate();
    const text = ["Good morning, how are you today?", "Hey there, how have you been?", "Nice to see you again, how has your day been so far?", "Good to see you, how's everything going?"]
    const randomText = Math.floor(Math.random() * 4);
    const welcomeText = text[randomText]

    useEffect(() => {
        fetch('http://localhost:5000/user/data', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.name);
            })
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/user/get_notes', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .then(res => res.json())
            .then(notesData => {
                setAllNotes(notesData.notes);
            })
    }, []);

    function handleViewNote(id) {
        navigate(`/view-note/${id}`)
    }

    return (
        <div className='bg-gray-100 relative'>
            <div className="mx-auto px-8 py-8">
                {user ?
                    <div className="bg-cover h-64 w-full relative rounded-lg box-shadow" style={{ backgroundImage: `url(${notesHome})` }}>
                        <div className="bg-shadow w-full h-2/3 absolute bottom-0 rounded-lg flex flex-col justify-end p-4 text-white">
                            <h3 className="font-semibold text-3xl">Welcome {user}</h3>
                            <p className="text-2xl font-medium">{welcomeText}</p>
                        </div>
                    </div>
                    :
                    <div className="bg-gray-400 h-64 w-full relative rounded-lg box-shadow"/>}
            </div>

            <div className="bg-white px-8">
                <h3 className="py-8 font-semibold text-3xl flex items-center text-blue-800">All Notes <img src={notes} alt="" className="w-12 h-12" /></h3>
                <div className="flex flex-row flex-wrap w-full mt-8 gap-5">
                    {allNotes ? allNotes.map((note) => (
                        <div onClick={() => handleViewNote(note._id)} key={note.title} className="bg-white h-80 sm-notes p-3 rounded-2xl box-shadow relative">
                            <h1 className="text-center font-bold text-[2rem] desc-display">{note.title}</h1>
                            <div className="text-2xl my-4">
                                <p className="desc-display" dangerouslySetInnerHTML={{ __html: note.description }}></p>
                            </div>
                            <p className="absolute bottom-0 right-0 m-4">{note.createdAt}</p>
                        </div>
                    ))
                        :
                        <NoteDummy />
                    }
                </div>
            </div>

            <NavLink className="bg-blue-800 h-24 w-24 rounded-full fixed bottom-10 right-10 flex items-center justify-center text-white" to={'/add-note'}><FaPlus className="text-3xl" /></NavLink>
        </div>
    )
}

export default Home
