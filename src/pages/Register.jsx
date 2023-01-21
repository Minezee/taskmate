import { useState } from "react";
import { loginBg } from "../assets";
import { Navigate, useNavigate, Link } from "react-router-dom";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, name }),
            });
            const data = await response.json();
            if(response.ok){
                sessionStorage.setItem('token', data.token)
                navigate('/')
            }else{
                setErrMsg(data.msg)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex-1 bg-white flex flex-col justify-center items-center text-left">
            <h3 className="text-4xl font-bold mb-10 md:mb-14 text-blue-500">Daftar</h3>
            <div className="flex flex-col gap-2 w-[80vw]">
            <label htmlFor="name" className="ml-2">
                    Name:
                </label>
                <input
                    type="text"
                    value={name}
                    placeholder="Masukan Nama"
                    onChange={(event) => setName(event.target.value)}
                    className="rounded-full h-10 md:w-[50vh] px-4 bg-blue-50 text-sm"
                />
                <label htmlFor="email" className="ml-2">
                    Email:
                </label>
                <input
                    type="email"
                    value={email}
                    placeholder="Masukan Email"
                    onChange={(event) => setEmail(event.target.value)}
                    className="rounded-full h-10 md:w-[50vh] px-4 bg-blue-50 text-sm"
                />
                <label htmlFor="password" className="ml-2">
                    Password:
                </label>
                    <input
                        type="password"
                        value={password}
                        placeholder="Masukan Password"
                        onChange={(event) => setPassword(event.target.value)}
                        className="rounded-full h-10 md:w-[50vh] px-4 bg-blue-50 text-sm"
                    />
                    {errMsg && <p className="text-red-500 text-sm mx-auto">{errMsg}</p>}
            </div>
            <button type="submit" className="auth-button">Register</button>
            <p className="text-xs mt-4">sudah punya akun? <Link className="text-blue-400 underline hover:opacity-80" to={'/signin'}>masuk</Link></p>
        </form>
    );
}

const Register = () => {
    const token = localStorage.token;
    if(token) return <Navigate to={'/account'} />
    return (
        <div className="flex flex-row w-full h-screen my-auto md:h-auto">
            <img src={loginBg} alt="" className="w-3/5 hidden md:block" />
            <RegisterForm />
        </div>
    );
}

export default Register;