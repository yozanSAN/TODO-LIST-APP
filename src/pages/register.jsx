import { FcGoogle } from "react-icons/fc";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from "react";
import { supabase } from "./../helper/supabaseClient.js";
function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const navigate = useNavigate();

    //HANDLE CREATE ACCOUNT CLICK 
    const handleCreateAccount = async (e) => {
        e.preventDefault();

        if (password !== confirmPass) {
            alert('passwords dont match!!');
            return;
        }
        if (password.length < 8) {
            alert('passwords must be atleast 8 characters!!');
            return;
        }
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username
                }
            }
        });
        if (error) {
            console.log('error creating account:', error);
            alert(`Signup failed: ${error.message}`);
        } else {
            console.log('Account created successfully:', data);

            if (!data.session) {
                alert('Account created! Please check your email to verify before logging in.');
            } else {
                navigate('/home');
            }
        }
    }

    return (
        <div className="text-center flex flex-col justify-center items-center gap-2">
            <div className="flex justify-center items-center my-5">
                <img src='/logo.png' alt='logo' className=' w-10 h-10' />
                <h1 className='text-xl'>Task Flow</h1>
            </div>
            <h1 className='text-4xl font-bold'>Create Your Account</h1>

            <form onSubmit={handleCreateAccount} className="bg-white flex flex-col justify-evenly items-center gap-4 py-5 my-5 mt-5 rounded-xl min-w-[30rem]">
                <label htmlFor="username" >Username</label>
                <input placeholder="Enter your username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="email">Email</label>
                <input placeholder="Enter your Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input placeholder="Enter your password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="Conform Password">Conform Password</label>
                <input placeholder="Confirm Password" type="password" required value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />

                <button
                    type="submit"
                    className="font-bold w-[90%] py-3 rounded-md bg-primary text-white hover:bg-hover"
                >
                    Create Account
                </button>
                <hr className=" border-2 border-gray-400 w-[90%]" />
                <p className="text-secondary">Or continue with</p>
                <button className=' flex justify-center items-center gap-2  py-2 px-10 rounded-md border-2 border-gray-400'>
                    <FcGoogle className="font-bold" />
                    Google
                </button>
            </form>
            <p className="text-secondary font-bold mb-5">Already have an account?{" "}
                <Link to='/' className="text-primary">
                    Log in
                </Link>
            </p>
        </div>
    )
}

export default Register
