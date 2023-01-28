import { useState, useEffect } from "react";
import { notes } from "../assets";
import { NavLink } from "react-router-dom";
import { FaPlus } from 'react-icons/fa'
import { NoteCard, NoteDummy, Header } from "../components";

const Home = () => {
    const token = sessionStorage.getItem('token')
    const [allNotes, setAllNotes] = useState(null);

    useEffect(() => {
        fetch('https://taskmates-api.vercel.app/notes/get', {
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
        <div className='bg-gray-100'>
            <Header />
            <div className="bg-white px-8">
                <h3 className="py-8 font-semibold text-3xl flex items-center text-blue-800">All Notes <img src={notes} alt="" className="w-12 h-12" /></h3>
                <div className="flex flex-row flex-wrap w-full mt-8 mb-24 lg:mt-0 gap-5">
                    {allNotes ? allNotes.map((note) => (
                        <NoteCard
                        key={note._id}
                        title={note.title} 
                        description={note.description}
                        favorite={note.favorite}
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
