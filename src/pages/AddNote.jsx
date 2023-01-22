import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import css
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const AddNote = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const token = sessionStorage.token;
    
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image']
        ],
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/user/add_notes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ title, description }),
            });
            if(response.ok){
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className='px-4 flex flex-col gap-4 mt-12 h-screen'>
            <label htmlFor="title" className='text-3xl font-semibold'>Judul :</label>
            <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukan Judul"
            maxLength={15}
            onKeyUp={(e) => {
                if(e.target.value.length >= 15) {
                    e.target.value = e.target.value.slice(0, 15)
                }
            }}
            className='w-full border-[1px] border-gray-300 px-8 py-5 text-[1.7rem]'/>

            <div className='mt-10'>
                <label htmlFor="description" className='text-2xl font-semibold'>Deskripsi :</label>
                <ReactQuill
                    value={description}
                    onChange={(value) => setDescription(value)}
                    modules={modules}
                    placeholder="Masukan Deskripsi"
                    className='mt-5'
                />
            </div>

            <div className='flex items-center justify-center mt-10'>
                <button type='submit' className='text-3xl px-8 py-4 bg-blue-800 font-semibold text-white rounded-full'>Buat Note</button>
            </div>
        </form>
    );
}
export default AddNote