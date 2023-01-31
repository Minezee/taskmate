import { useState, useEffect } from "react";
import { notes } from "../assets";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa'
import { FavNoteCard, CardDummy, Header, FetchLoad } from "../components";
import { Masonry } from "@mui/lab";

const Favorite = () => {
    const token = sessionStorage.getItem('token');
    const [favNotes, setFavNotes] = useState(null);
    const [isFetching, setIsFetching] = useState(false)
    const [noteId, setNoteId] = useState(null)
    const navigate = useNavigate();

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
                setFavNotes(notesData.notes);
            })
            .catch(err => navigate('/error'))
    }, []);

    useEffect(() => {
        if (noteId) {
            setIsFetching(true)
            fetch(`https://taskmates-api.vercel.app/notes/remove_favorite/${noteId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
                .then(res => res.json())
                .then(notesData => {
                    setFavNotes(notesData)
                    setIsFetching(false)
                })
                .catch(err => navigate('/error'))
        }
    }, [noteId]);

    return (
        <>
            <div className='bg-gray-100'>
                <Header />
                <div className="bg-white px-8">
                    <h3 className="py-8 font-semibold text-3xl flex items-center text-blue-800">Favorite Notes <img src={notes} alt="notes" className="w-12 h-12" /></h3>
                    <Masonry columns={{ xs: 2, sm: 3, md: 3, xl: 4 }} spacing={2}>
                        {favNotes ?
                            favNotes?.filter(note => note.favorite).length > 0 ?
                                favNotes?.filter(note => note.favorite).map((note) => {
                                    return (
                                        <FavNoteCard
                                            key={note._id}
                                            title={note.title}
                                            description={note.description}
                                            favorite={note.favorite}
                                            color={note.color}
                                            id={note._id}
                                            date={note.createdAt}
                                            setNoteId={(noteId) => setNoteId(noteId)}
                                        />
                                    )
                                }
                                )
                                :
                                <div className='flex items-center justify-center h-[50vh] w-full text-center'>
                                    <h4 className='text-2xl font-semibold text-gray-700'>Tidak Ada Note Favorit! Tambahkan terlebih dahulu</h4>
                                </div>
                            :
                            <CardDummy />
                        }
                    </Masonry>
                </div>
                <NavLink className="bg-blue-800 h-24 w-24 lg:h-16 lg:w-16 rounded-full fixed bottom-10 right-10 flex items-center justify-center text-white z-30 hover:opacity-90" to={'/add-note'}><FaPlus className="text-3xl" /></NavLink>
            </div>

            {isFetching &&
                <FetchLoad />
            }
        </>
    )
}

export default Favorite
