import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import quill css
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading, FetchLoad } from '../components';
import { MdOutlineColorLens } from 'react-icons/md'
import { motion } from 'framer-motion';

const ViewNote = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [errMsg, setErrMsg] = useState("")
    const [note, setNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isFetch, setIsFetch] = useState(false);
    const noteColor = ["white ", "red", "yellow", "blue", "green"];
    const deviceWidth = window.innerWidth;
    const { id } = useParams();
    const navigate = useNavigate();
    const token = sessionStorage.token;
    var translateX;
    var dec;

    if(deviceWidth > 1000){
        translateX = 200;
        dec = 40;
    }else{
        translateX = 145;
        dec = 32;
    }

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }]
        ],
    }

    useEffect(() => {
        if (id) {
            fetch(`https://taskmates-api.vercel.app/notes/view/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.statusText);
                })
                .then(data => {
                    setNote(data.note);
                })
                .catch(error => console.log(error));
        }
    }, [id]);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setDescription(note.description);
            setColor(note.color)
        }
    }, [note]);

    if (!note) return <Loading />

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (title.length > 0 && description.length > 0) {
                setIsFetch(true)
                const response = await fetch(`https://taskmates-api.vercel.app/notes/update/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    body: JSON.stringify({ title, description, color }),
                });
                setIsFetch(false)
                if (response.ok) {
                    navigate('/')
                }
            } else {
                setErrMsg("Harap isi semua field")
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsModalOpen(false)
        setIsFetch(true)
        try {
            const response = await fetch(`https://taskmates-api.vercel.app/notes/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            if (response.ok) {
                navigate('/')
                setIsFetch(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function handleColorClick() {
        setIsOpen(!isOpen)
    }

    return (
        <form onSubmit={handleSubmit} className='px-4 flex flex-col gap-4 pt-12 h-screen relative'>
            <div className='absolute top-5 right-5 flex gap-4 items-center'>
                {noteColor.map((clr, index) => (
                    <motion.button
                    key={clr}
                    type='button'
                    initial={{x: translateX - (index * dec)}}
                    animate={{ x: isOpen ? 0 : translateX - (index * dec), opacity: isOpen ? 100 : 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => {
                        setColor(clr)
                        setIsOpen(false)
                    }}
                    className={`${clr} color ${color === clr ? "border-black" : "border-gray-400"}`} />
                ))}
                <button type='button' onClick={handleColorClick}>
                    <MdOutlineColorLens className={`${color} h-14 w-14 lg:h-8 lg:w-8 rounded-full border-[1px] border-gray-400 text-gray-800 relative z-50`} />
                </button>
            </div>
            <label htmlFor="title" className='text-3xl lg:text-xl font-semibold mt-10 lg:mt-0'>Judul :</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukan Judul"
                maxLength={15}
                onKeyUp={(e) => {
                    if (e.target.value.length >= 15) {
                        e.target.value = e.target.value.slice(0, 15)
                    }
                }}
                className='w-full border-[1px] border-gray-300 px-8 py-5 lg:px-4 lg:py-2 text-[1.7rem] lg:text-lg' />

            <div className='mt-10 lg:mt-4'>
                <label htmlFor="description" className='text-2xl lg:text-xl font-semibold'>Deskripsi :</label>
                <ReactQuill
                    value={description}
                    onChange={(value) => setDescription(value)}
                    modules={modules}
                    placeholder="Masukan Deskripsi"
                    className='mt-5 lg:mt-3 quill'
                />
            </div>

            <p className={`${errMsg ? "opacity-100" : "opacity-0"} text-center text-red-600 mt-8`}>{errMsg}</p>

            <div className='flex items-center justify-center mt-16 lg:mt-10 gap-10'>
                <button type='button' onClick={() => setIsModalOpen(true)} className='text-3xl lg:text-lg min-w-[11rem] lg:min-w-[8rem] px-8 lg:px-5 py-4 lg:py-3 bg-red-600 font-semibold text-white rounded-full border-[1px] border-black'>Delete</button>
                <button type='submit' className='text-3xl lg:text-lg min-w-[11rem] lg:min-w-[8rem] px-8 lg:px-5 py-4 lg:py-3 bg-blue-800 font-semibold text-white rounded-full border-[1px] border-black'>Update</button>
            </div>

            {isFetch && <FetchLoad />}

            {isModalOpen && (
                <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-black/50 z-50">
                    <div className="bg-gray-100 h-1/4 lg:h-1/2 w-full lg:w-2/5 mx-16 rounded-2xl flex flex-col items-center justify-evenly px-4">
                        <p className='text-3xl lg:text-2xl 2xl:text-3xl font-bold text-center'>Apakah kamu yakin ingin menghapus note "{title}"?</p>
                        <div className="flex gap-10 text-white text-2xl lg:text-lg 2xl:text-2xl font-semibold">
                            <button className='bg-red-500 min-w-[9rem] lg:min-w-[7rem] 2xl:min-w-[9rem] px-8 lg:px-4 2xl:px-8 py-4 lg:py-3 2xl:py-4 rounded-lg border-[1px] border-black' onClick={() => setIsModalOpen(false)}>No</button>
                            <button className='bg-blue-800 min-w-[9rem] lg:min-w-[7rem] 2xl:min-w-[9rem] px-8 lg:px-4 2xl:px-8 py-4 lg:py-3 2xl:py-4 rounded-lg border-[1px] border-black' onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
}
export default ViewNote