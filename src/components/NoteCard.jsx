import { NavLink } from "react-router-dom"

const NoteCard = ({title, description, id, date}) => {
    return (
        <NavLink to={`/view-note/${id}`} className="bg-white hover:bg-gray-100 h-80 lg:h-72 w-[calc(50%-(1.25rem/2))] lg:w-[calc(33.3333%-(1.75rem/2))] p-3 rounded-2xl box-shadow relative">
            <h1 className="text-center font-bold text-[2rem] lg:text-xl desc-display">{title}</h1>
            <div className="text-2xl lg:text-lg my-4">
                <p className="desc-display" dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
            <p className="absolute bottom-0 right-0 m-4">{date}</p>
        </NavLink>
    )
}

export default NoteCard