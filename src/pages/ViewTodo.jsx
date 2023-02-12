import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FetchLoad, Loading } from "../components";
import { useParams } from "react-router-dom";

const ViewTodo = () => {
    const [todo, setTodo] = useState(null);
    const [title, setTitle] = useState("");
    const [targets, setTargets] = useState([{ name: '', checked: false }]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [isFetch, setIsFetch] = useState(false);
    const [addingNewItem, setAddingNewItem] = useState(false);
    const navigate = useNavigate();
    const token = sessionStorage.token;
    const { id } = useParams();

    const handleKeyDown = (e, index) => {
        if (index >= 0 && index < targets.length) {
            if (e.key === 'Enter') {
                setAddingNewItem(true)
                setTargets([...targets, { name: '', checked: false }]);
                setTimeout(() => {
                    const newInput = document.querySelector(`input[name=todo-${index + 1}]`);
                    if (newInput) {
                        newInput.focus();
                    }
                }, 0);
            }
            if (e.key === 'Backspace' && targets[index].name.length < 1 && targets.length > 1) {
                const updatedTargets = [...targets];
                updatedTargets.splice(index, 1);
                setTargets(updatedTargets);
                setTimeout(() => {
                    const newInput = document.querySelector(`input[name=todo-${index - 1}]`);
                    if (newInput) {
                        newInput.focus();
                    }
                }, 0);
            }
        }
    };

    const handleCheck = async (e, index) => {
        const updateTargets = [...targets];
        updateTargets[index].checked = e.target.checked;
        setTargets(updateTargets);
        
        if (!addingNewItem) {
            try {
                if (title.length > 0 && targets.length > 1) {
                    const response = await fetch(`https://taskmates-api.vercel.app/todo/update/${id}`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`
                        },
                        body: JSON.stringify({ title, targets }),
                    });
                    if (response.ok) {
                        setErrMsg("")
                    } else {
                        setErrMsg("Terjadi kesalahan, coba lagi nanti")
                    }
                } else {
                    setErrMsg("Harap isi semua field")
                }

            } catch (error) {
                setErrMsg("Terjadi kesalahan, coba lagi nanti")
            }
        } else {
            setAddingNewItem(false)
        }
    }

    const handleChange = (e, index) => {
        const updatedTargets = [...targets];
        updatedTargets[index].name = e.target.value;
        setTargets(updatedTargets);
    };

    useEffect(() => {
        if (id) {
            fetch(`https://taskmates-api.vercel.app/todo/view/${id}`, {
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
                    setTodo(data.todo);
                })
                .catch(error => navigate('/error'));
        }
    }, [id]);

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setTargets(todo.targets);
        }
    }, [todo]);

    const handleDelete = async (e) => {
        e.preventDefault();
        setIsModalOpen(false)
        setIsFetch(true)
        try {
            const response = await fetch(`https://taskmates-api.vercel.app/todo/delete/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                }
            });
            if (response.ok) {
                navigate('/todo')
                setIsFetch(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!addingNewItem) {
            setIsFetch(true)
            try {
                if (title.length > 0 && targets.length > 1) {
                    const response = await fetch(`https://taskmates-api.vercel.app/todo/update/${id}`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`
                        },
                        body: JSON.stringify({ title, targets }),
                    });
                    if (response.ok) {
                        setErrMsg("")
                        setIsFetch(false)
                        navigate('/todo')
                    } else {
                        console.log("fail")
                        setIsFetch(false)
                        setErrMsg("Terjadi kesalahan, coba lagi nanti")
                    }
                } else {
                    setErrMsg("Harap isi semua field")
                }

            } catch (error) {
                setErrMsg("Terjadi kesalahan, coba lagi nanti")
            }
        } else {
            setAddingNewItem(false)
        }
    };

    if (!todo) return <Loading />

    return (
        <div>
            <form onSubmit={handleSubmit} className='px-4 flex flex-col gap-4 pt-12 h-screen relative'>
                <label htmlFor="title" className='text-3xl lg:text-xl 2xl:text-2xl font-semibold mt-10 lg:mt-0'>Nama Kegiatan :</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukan Nama Kegiatan (maks. 15 huruf)"
                    maxLength={15}
                    onKeyUp={(e) => {
                        if (e.target.value.length >= 15) {
                            e.target.value = e.target.value.slice(0, 15)
                        }
                    }}
                    autoComplete="off" 
                    className='w-full border-[1px] border-gray-300 px-8 py-5 lg:px-4 lg:py-2 text-[1.7rem] lg:text-lg' />
                <label htmlFor="todo" className='text-2xl lg:text-base 2xl:text-2xl mt-10'>Todo :</label>
                {targets.map((target, index) => (
                    <div key={index} className="flex items-start md:items-center mx-1 gap-5">
                        <input type="checkbox" checked={target.checked} className="h-7 lg:h-5 w-7 lg:w-5 mt-3 md:mt-0 cursor-pointer" onChange={(e) => handleCheck(e, index)} />
                        {isEdit ?
                            <input
                                type="text"
                                name={"todo-" + index}
                                className="border-b-[1px] border-gray-300 py-2 lg:px-2 lg:py-1 w-1/2 text-3xl md:text-lg 2xl:text-2xl"
                                value={target.name}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                autoComplete="off" />
                            :
                            <p className="py-2 lg:px-2 lg:py-1 w-full text-3xl md:text-lg 2xl:text-2xl">{target.name}</p>
                        }
                    </div>
                ))}
                <p className={`${errMsg ? "opacity-100" : "opacity-0"} text-center text-red-600 mt-8`}>{errMsg}</p>
                <div className='flex items-center justify-center mt-16 lg:mt-10 gap-10 pb-10'>
                    <button type='button' onClick={() => navigate('/todo')} className='text-3xl lg:text-lg min-w-[11rem] lg:min-w-[8rem] px-8 lg:px-5 py-4 lg:py-3 bg-blue-800 font-semibold text-white rounded-full border-[1px] border-black'>Back</button>
                    <button type='button' onClick={() => setIsModalOpen(true)} className='text-3xl lg:text-lg min-w-[11rem] lg:min-w-[8rem] px-8 lg:px-5 py-4 lg:py-3 bg-red-600 font-semibold text-white rounded-full border-[1px] border-black'>Delete</button>
                    {!isEdit && <button type='button' onClick={() => setIsEdit(true)} className='text-3xl lg:text-lg min-w-[11rem] lg:min-w-[8rem] px-8 lg:px-5 py-4 lg:py-3 bg-blue-800 font-semibold text-white rounded-full border-[1px] border-black'>Edit</button>}
                    {isEdit && <button type='submit' className='text-3xl lg:text-lg min-w-[11rem] lg:min-w-[8rem] px-8 lg:px-5 py-4 lg:py-3 bg-blue-800 font-semibold text-white rounded-full border-[1px] border-black'>Update</button>}
                </div>
            </form>

            {isFetch && <FetchLoad />}

            {isModalOpen && (
                <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-black/50 z-50">
                    <div className="bg-gray-100 h-1/4 lg:h-1/2 w-full lg:w-2/5 mx-16 rounded-2xl flex flex-col items-center justify-evenly px-4">
                        <p className='text-3xl lg:text-2xl 2xl:text-3xl font-bold text-center'>Apakah kamu yakin ingin menghapus todo "{title}"?</p>
                        <div className="flex gap-10 text-white text-2xl lg:text-lg 2xl:text-2xl font-semibold">
                            <button className='bg-red-500 min-w-[9rem] lg:min-w-[7rem] 2xl:min-w-[9rem] px-8 lg:px-4 2xl:px-8 py-4 lg:py-3 2xl:py-4 rounded-lg border-[1px] border-black' onClick={() => setIsModalOpen(false)}>No</button>
                            <button className='bg-blue-800 min-w-[9rem] lg:min-w-[7rem] 2xl:min-w-[9rem] px-8 lg:px-4 2xl:px-8 py-4 lg:py-3 2xl:py-4 rounded-lg border-[1px] border-black' onClick={handleDelete}>Yes</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewTodo;