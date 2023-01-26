import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import css
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const AddNote = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();
    const token = sessionStorage.token;

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }]
        ],
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (description.length > 0 && title.length > 0) {
                const response = await fetch("http://localhost:5000/user/add_notes", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    body: JSON.stringify({ title, description }),
                });
                if (response.ok) {
                    setErrMsg("")
                    navigate('/')
                }
            } else {
                setErrMsg("Harap isi semua field")
            }
        } catch (error) {
            setErrMsg("Terjadi kesalahan, coba lagi nanti")
        }
    };

    return (
        <form onSubmit={handleSubmit} className='px-4 flex flex-col gap-4 pt-12 h-screen'>
            <label htmlFor="title" className='text-3xl lg:text-xl font-semibold'>Judul :</label>
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
    );
}
export default AddNote