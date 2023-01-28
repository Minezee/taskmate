import { NavLink } from "react-router-dom"
import { BsStar, BsStarFill } from "react-icons/bs"
import { useState } from "react";

const NoteCard = ({ title, description, favorite, id, date }) => {
    const [isFavorite, setIsFavorite] = useState(favorite);
    const token = sessionStorage.token;

    const favoriteNote = async (e) => {
        e.preventDefault();
        setIsFavorite(!isFavorite);
        try {
            const response = await fetch(`https://taskmates-api.vercel.app/notes/favorite/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <NavLink to={`/view-note/${id}`} key={title} className="bg-white hover:bg-gray-100 h-80 lg:h-72 w-[calc(50%-(1.25rem/2))] md:w-[calc(33.3333%-(1.75rem/2))] 2xl:w-[calc(25%-(1.25rem/1))] p-3 rounded-2xl box-shadow flex flex-col justify-between note-container">
            <div>
                <h1 className="text-center font-bold text-[2rem] lg:text-xl 2xl:text-2xl">{title}</h1>
                <p className="desc-display text-2xl lg:text-lg 2xl:text-xl my-2" dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
            <div className="flex justify-between items-center">
                <button onClick={(e) => favoriteNote(e)} className="text-[2rem] lg:text-xl 2xl:text-2xl hover:scale-105">
                    {isFavorite ?
                        <BsStarFill className="text-yellow-400"/>
                    :
                        <BsStar className="text-blue-800"/>
                    }
                </button>
                <p className="text-base 2xl:text-lg">{date}</p>
            </div>
        </NavLink>
    )
}

export default NoteCard