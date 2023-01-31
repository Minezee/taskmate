import { NavLink } from "react-router-dom"

const TodoCard = ({title, id, targets}) => {
    return (
        <NavLink to={`/view-todo/${id}`} className={`hover:opacity-80 p-3 rounded-2xl box-shadow flex flex-col justify-between note-container`}>
            <h1 className="text-center font-bold text-[2rem] lg:text-xl 2xl:text-2xl">{title}</h1>
            {targets?.slice(0, 8).map((target) => (
                <div key={target._id} className="flex items-start text-2xl lg:text-lg 2xl:text-xl my-1 gap-2">
                    {target.checked ?
                        <input type="checkbox" checked disabled className="h-7 lg:h-5 w-7 lg:w-5 mt-[1px] md:mt-1"/>
                        :
                        <input type="checkbox" disabled className="h-7 lg:h-5 w-7 lg:w-5 mt-[1px] md:mt-1" />
                    }
                    <p key={target.name} className="text-2xl lg:text-lg 2xl:text-xl">{target.name}</p>
                </div>
            ))}
        </NavLink>
    )
}

export default TodoCard