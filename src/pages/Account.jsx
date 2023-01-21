import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = () => {
    const token = sessionStorage.getItem('token')
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/user/data', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser(data);
            })
    }, []);

    function handleLogout() {
        sessionStorage.removeItem('token');
        navigate('/signin');
    }

    return (
        <div className='flex items-center justify-center'>
            <div className="text-center">
                {user ? <h1>Welcome, {user.name}</h1> : <h1>Loading...</h1>}
                <p>Here your token : {token}</p>
               <button onClick={handleLogout} className="bg-blue-500 px-4 py-2 text-white rounded-full">Logout</button>
            </div>
        </div>
    )
}

export default Account;