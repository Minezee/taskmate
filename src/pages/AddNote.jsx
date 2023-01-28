import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import css
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FetchLoad } from '../components';
import { MdOutlineColorLens } from 'react-icons/md'
import { motion } from 'framer-motion';

const AddNote = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isFetch, setIsFetch] = useState(false);
    const noteColor = ["white ", "red", "yellow", "blue", "green"];
    const deviceWidth = window.innerWidth;
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsFetch(true)
        try {
            if (description.length > 0 && title.length > 0) {
                const response = await fetch("https://taskmates-api.vercel.app/notes/add", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    body: JSON.stringify({ title, description, color }),
                });
                if (response.ok) {
                    setErrMsg("")
                    setIsFetch(false)
                    navigate('/')
                }
            } else {
                setErrMsg("Harap isi semua field")
            }
        } catch (error) {
            setErrMsg("Terjadi kesalahan, coba lagi nanti")
        }
    };

    function handleColorClick() {
        setIsOpen(!isOpen)
    }

    return (
        <>
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
                        required
                        className='mt-5 lg:mt-3 quill'
                    />
                </div>
                <p className={`${errMsg ? "opacity-100" : "opacity-0"} text-center text-red-600 mt-8`}>{errMsg}</p>
                <div className='flex items-center justify-center'>
                    <button type='submit' className='text-3xl lg:text-lg px-8 lg:px-5 py-4 lg:py-3 bg-blue-800 font-semibold text-white rounded-full border-[1px] border-black'>Buat Note</button>
                </div>
            </form>

            {isFetch && <FetchLoad />}
        </>
    );
}
export default AddNote