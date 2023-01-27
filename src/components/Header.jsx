import { useEffect, useState } from "react";
import { notesHome } from "../assets";

const Header = () => {
    const [user, setUser] = useState(null);
    const [randomText, setRandomText] = useState("")
    const token = sessionStorage.token;

    useEffect(() => {
        const text = ["Good morning, how are you today?", "Hey there, how have you been?", "Nice to see you again, how has your day been so far?", "Good to see you, how's everything going?"]
        const random = Math.floor(Math.random() * 4);
        const welcomeText = text[random]
        setRandomText(welcomeText)
        fetch('https://taskmates-api.vercel.app/user/data', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data.name);
            })
    }, []);

    return (
        <header className="mx-auto p-8 lg:p-0">
            {user ?
                <div className="bg-cover h-64 lg:h-48 w-full relative rounded-lg lg:rounded-none box-shadow" style={{ backgroundImage: `url(${notesHome})` }}>
                    <div className="bg-shadow w-full h-2/3 absolute bottom-0 rounded-lg lg:rounded-none flex flex-col justify-end p-4 text-white">
                        <h3 className="font-semibold text-3xl">Welcome, {user}</h3>
                        <p className="text-2xl lg:text-lg font-medium lg:font-thin">{randomText}</p>
                    </div>
                </div>
                :
                <div className="animate-pulse bg-gray-400 h-64 lg:h-48 w-full relative rounded-lg lg:rounded-none box-shadow" />}
        </header>
    )
}

export default Header