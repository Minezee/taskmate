import { useState, useEffect } from "react";
import { notesHome, notes } from "../assets";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa'
import { NoteCard, NoteDummy } from "../components";

const Home = () => {
    const token = sessionStorage.getItem('token')
    const [user, setUser] = useState(null);
    const [allNotes, setAllNotes] = useState(null);
    const navigate = useNavigate();
    const text = ["Good morning, how are you today?", "Hey there, how have you been?", "Nice to see you again, how has your day been so far?", "Good to see you, how's everything going?"]
    const randomText = Math.floor(Math.random() * 4);
    const welcomeText = text[randomText]

    useEffect(() => {
        fetch('https://taskmates-api.vercel.app/user/data', {
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
        fetch('https://taskmates-api.vercel.app/user/get_notes', {
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

    return (
        <div className='bg-gray-100 relative'>
            <div className="mx-auto p-8 lg:p-0">
                {user ?
                    <div className="bg-cover h-64 lg:h-48 w-full relative rounded-lg lg:rounded-none box-shadow" style={{ backgroundImage: `url(${notesHome})` }}>
                        <div className="bg-shadow w-full h-2/3 absolute bottom-0 rounded-lg lg:rounded-none flex flex-col justify-end p-4 text-white">
                            <h3 className="font-semibold text-3xl">Welcome {user}</h3>
                            <p className="text-2xl lg:text-lg font-medium lg:font-thin">{welcomeText}</p>
                        </div>
                    </div>
                    :
                    <div className="animate-pulse bg-gray-400 h-64 lg:h-48 w-full relative rounded-lg lg:rounded-none box-shadow"/>}
            </div>

            <div className="bg-white px-8">
                <h3 className="py-8 font-semibold text-3xl flex items-center text-blue-800">All Notes <img src={notes} alt="" className="w-12 h-12" /></h3>
                <div className="flex flex-row flex-wrap w-full mt-8 mb-24 lg:mt-0 gap-5">
                    {allNotes ? allNotes.map((note) => (
                        <NoteCard
                        key={note._id}
                        title={note.title} 
                        description={note.description}
                        id={note._id}
                        date={note.createdAt}
                        />
                    ))
                        :
                        <NoteDummy />
                    }
                </div>
            </div>
            <NavLink className="bg-blue-800 h-24 w-24 lg:h-16 lg:w-16 rounded-full fixed bottom-10 right-10 flex items-center justify-center text-white z-30 hover:opacity-90" to={'/add-note'}><FaPlus className="text-3xl" /></NavLink>
        </div>
    )
}

export default Home
