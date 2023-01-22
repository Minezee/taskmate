import { useState } from "react";
import { loginBg } from "../assets";
import { Navigate, useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
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
        <form onSubmit={handleSubmit} className="md:flex-1 mx-auto bg-white flex flex-col justify-center items-center text-left">
            <h3 className="text-6xl font-bold mb-16 text-blue-500">Masuk</h3>
            <div className="flex flex-col gap-4 w-[80vw] text-2xl">
                <label htmlFor="email" className="ml-2">
                    Email:
                </label>
                <input
                    type="email"
                    value={email}
                    placeholder="Masukan Email"
                    onChange={(event) => setEmail(event.target.value)}
                    className="rounded-full py-5 md:w-[50vh] px-6 bg-blue-50 text-xl"
                />
                <label htmlFor="password" className="ml-2 mt-4">
                    Password:
                </label>
                    <input
                        type="password"
                        value={password}
                        placeholder="Masukan Password"
                        onChange={(event) => setPassword(event.target.value)}
                        className="rounded-full py-5 md:w-[50vh] px-6 bg-blue-50 text-xl"
                    />
                    {errMsg && <p className="text-red-500 text-lg mt-4 mx-auto">{errMsg}</p>}
            </div>
            <button type="submit" className="auth-button">Sign In</button>
            <p className="text-lg mt-4">belum punya akun? <Link className="text-blue-400 underline hover:opacity-80" to={'/register'}>buat akun</Link></p>
        </form>
    );
}

const Login = () => {
    const token = localStorage.token;
    if(token) return <Navigate to={'/account'} />
    return (
        <div className="flex flex-row w-full h-screen my-auto md:h-auto">
            <img src={loginBg} alt="" className="w-3/5 hidden md:block" />
            <LoginForm />
        </div>
    );
}

export default Login;