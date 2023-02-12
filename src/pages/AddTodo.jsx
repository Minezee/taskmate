import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchLoad } from "../components";

const AddTodo = () => {
    const [title, setTitle] = useState("");
    const [targets, setTargets] = useState([{ name: '', checked: false }]);
    const [errMsg, setErrMsg] = useState("");
    const [isFetch, setIsFetch] = useState(false)
    const [addingNewItem, setAddingNewItem] = useState(false);
    const navigate = useNavigate();
    const token = sessionStorage.token;

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

    const handleCheck = (e, index) => {
        const updateTargets = [...targets];
        updateTargets[index].checked = e.target.checked;
        setTargets(updateTargets)
    }

    const handleChange = (e, index) => {
        const updatedTargets = [...targets];
        updatedTargets[index].name = e.target.value;
        setTargets(updatedTargets);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!addingNewItem) {
            setIsFetch(true)
            try {
                if (title.length > 0) {
                    const response = await fetch("https://taskmates-api.vercel.app/todo/add", {
                        method: "POST",
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

    return (
        <div>
            <form onSubmit={handleSubmit} className='px-4 flex flex-col gap-4 pt-12 h-screen relative'>
                <label htmlFor="title" className='text-3xl lg:text-xl font-semibold mt-10 lg:mt-0'>Nama Kegiatan :</label>
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
                    className='w-full border-[1px] border-gray-300 px-8 py-5 lg:px-4 lg:py-2 text-[1.7rem] lg:text-lg' />
                    <label htmlFor="todo" className='text-lg lg:text-base'>Todo :</label>
                {targets.map((target, index) => (
                    <div key={index} className="flex items-center mx-1 gap-5">
                        <input type="checkbox" className="h-7 lg:h-5 w-7 lg:w-5 mt-3 md:mt-0 cursor-pointer" onChange={(e) => handleCheck(e, index)} />
                        <input
                                type="text"
                                name={"todo-" + index}
                                className="border-b-[1px] border-gray-300 py-2 lg:px-2 lg:py-1 w-1/2 text-3xl md:text-lg 2xl:text-2xl"
                                value={target.name}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                autocomplete="off"/>
                    </div>
                ))}
                <p className={`${errMsg ? "opacity-100" : "opacity-0"} text-center text-red-600 mt-8`}>{errMsg}</p>
                <div className='flex items-center justify-center'>
                    <button type='submit' className='text-3xl lg:text-lg px-8 lg:px-5 py-4 lg:py-3 bg-blue-800 font-semibold text-white rounded-full border-[1px] border-black'>Buat Todo</button>
                </div>
            </form>

            {isFetch && <FetchLoad />}
        </div>
    );
};

export default AddTodo;