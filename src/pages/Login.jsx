import { useState } from "react";
import { loginBg } from "../assets";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { FetchLoad } from "../components";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [isFetching, setIsFetching] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsFetching(true)
            const response = await fetch("https://taskmates-api.vercel.app/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if(response.ok){
                sessionStorage.setItem('token', data.token)
                setIsFetching(false);
                navigate('/');
            }else{
                setIsFetching(false);
                setErrMsg(data.msg);
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="lg:flex-1 mx-auto bg-white flex flex-col justify-center lg:justify-evenly items-center text-left lg:px-8">
                <h3 className="text-6xl lg:text-4xl font-bold mb-16 lg:mb-0 text-blue-800">Masuk</h3>
                <div className="flex flex-col gap-4 lg:gap-3 text-3xl lg:text-base 2xl:text-lg lg:w-full">
                    <label htmlFor="email" className="ml-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        placeholder="Masukan Email"
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        className="rounded-full py-5 lg:py-4 px-5 bg-blue-50"
                    />
                    <label htmlFor="password" className="ml-2 mt-4 lg:mt-2">
                        Password:
                    </label>
                        <input
                            type="password"
                            value={password}
                            placeholder="Masukan Password"
                            onChange={(event) => setPassword(event.target.value)}
                            className="rounded-full py-5 lg:py-4 px-5 bg-blue-50"
                        />
                        {errMsg && <p className="text-red-500 text-lg mt-4 mx-auto">{errMsg}</p>}
                </div>
                <div className="flex flex-col items-center justify-center mt-8 gap-4">
                    <button type="submit" className="auth-button">Sign In</button>
                    <p className="text-2xl lg:text-sm">belum punya akun? <Link className="text-blue-400 underline hover:opacity-80" to={'/register'}>buat akun</Link></p>
                </div>
            </form>
            {isFetching && <FetchLoad />}
        </>
    );
}

const Login = () => {
    const token = localStorage.token;
    if(token) return <Navigate to={'/account'} />
    return (
        <div className="flex flex-row w-screen h-screen my-auto lg:h-auto">
            <img src={loginBg} alt="" className="w-3/5 h-screen hidden lg:block" />
            <LoginForm />
        </div>
    );
}

export default Login;