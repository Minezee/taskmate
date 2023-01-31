import { Header, CardDummy, TodoCard } from "../components"
import { Masonry } from "@mui/lab"
import { NavLink, useNavigate } from "react-router-dom"
import { FaPlus } from 'react-icons/fa'
import { useState, useEffect } from "react"

const Todo = () => {
    const token = sessionStorage.getItem('token')
    const [allTodo, setAllTodo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://taskmates-api.vercel.app/todo/get', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .then(res => res.json())
            .then(todoData => {
                setAllTodo(todoData?.todo)
            })
            .catch(err => navigate('/error'))
    }, []);

    return (
        <div className='bg-gray-100'>
            <Header />
            <div className="bg-white px-8">
                <h3 className="py-8 font-semibold text-3xl flex items-center text-blue-800">Todo List</h3>
                <Masonry columns={{ xs: 2, sm: 3, md: 3, xl: 4 }} spacing={2}>
                    {allTodo ? allTodo.map((todo) => (
                        <TodoCard title={todo.title} id={todo._id} targets={todo.targets} key={todo._id}/>
                    ))
                        :
                        <CardDummy />
                    }
                </Masonry>
            </div>
            <NavLink className="bg-blue-800 h-24 w-24 lg:h-16 lg:w-16 rounded-full fixed bottom-10 right-10 flex items-center justify-center text-white z-30 hover:opacity-90" to={'/add-todo'}><FaPlus className="text-3xl" /></NavLink>
        </div>
    )
}

export default Todo