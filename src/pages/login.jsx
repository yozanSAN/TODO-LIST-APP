import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "./../helper/supabaseClient.js";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    //HANDLE LOGIN 
    const handleLogin = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if (error) {
            console.error('Login failed:', error.message);
            alert('Login failed', error.message);
        } else {
            console.log('Logged in successfully:', data);
             alert('Logged in successfully');
            navigate('/home');
        }
    }

    return (
        <div>
            <div className="text-center flex flex-col justify-center items-center gap-2 mt-10">
                <div className="flex justify-center items-center my-10">
                    <img src='/logo.png' alt='logo' className=' w-10 h-10' />
                    <h1 className='text-2xl font-bold'>Task Flow</h1>
                </div>
                <h1 className='text-5xl font-bold'>Welcome Back</h1>

                <form onSubmit={handleLogin} className=" flex flex-col justify-evenly items-center gap-4 py-5 my-5 mx-36 rounded-xl min-w-[30rem]">

                    <label htmlFor="email">Email</label>
                    <input placeholder="Enter your Email" type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input placeholder="Enter your password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    {/* TODO: APPLY FORGOT PASSWORD FUNCTIONALITY */}

                    <button type="submit" className='font-bold w-[90%] py-3 rounded-md bg-primary text-white hover:bg-hover'>Log in</button>
                </form>
                <p className="text-secondary font-bold">New here?{" "}
                    <Link to='./register' className="text-primary">
                        Create an Account
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login;
