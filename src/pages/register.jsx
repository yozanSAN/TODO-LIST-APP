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
            alert('Passwords don\'t match!');
            return;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters!');
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
            console.log('Error creating account:', error);
            alert(`Signup failed: ${error.message}`);
        } else {
            console.log('Account created successfully:', data);

            if (!data.session) {
                alert('Account created! Please check your email to verify before logging in.');
                navigate('/login');
            } else {
                // Auto-login successful, will be handled by App.jsx auth listener
                // But navigate manually just in case
                navigate('/home');
            }
        }
    };

    //HANDLE REGISTER WITH GOOGLE
    const signInWithGoogle = async () => {
        // Store intended redirect for after OAuth
        localStorage.setItem('authRedirect', '/home');
        
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/home`
            }
        });

        if (error) {
            console.error('Error signing in:', error.message);
            alert('Google sign-in failed: ' + error.message);
        } else {
            console.log('Redirecting to Google...', data);
        }
    };

    return (
        <div className="text-center flex flex-col justify-center items-center gap-2">
            <div className="flex justify-center items-center my-5">
                <img src='/logo.png' alt='logo' className=' w-10 h-10' />
                <h1 className='text-xl'>Task Flow</h1>
            </div>
            <h1 className='text-4xl font-bold'>Create Your Account</h1>

            <form onSubmit={handleCreateAccount} className="bg-white flex flex-col justify-evenly items-center gap-4 py-5 my-5 mt-5 rounded-xl min-w-[30rem]">
                <label htmlFor="username">Username</label>
                <input placeholder="Enter your username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />

                <label htmlFor="email">Email</label>
                <input placeholder="Enter your Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input placeholder="Enter your password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input placeholder="Confirm Password" type="password" required value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />

                <button
                    type="submit"
                    className="font-bold w-[90%] py-3 rounded-md bg-primary text-white hover:bg-hover"
                >
                    Create Account
                </button>
                <div className="flex items-center w-[90%]">
                    <div className="flex-grow h-px bg-secondary"></div>
                    <span className="mx-4 text-secondary">Or continue with</span>
                    <div className="flex-grow h-px bg-secondary"></div>
                </div>
                <button 
                    type="button"
                    onClick={signInWithGoogle} 
                    className='flex justify-center items-center gap-2 px-10 rounded-md border-2 border-gray-300 font-bold w-[90%] py-3 hover:bg-background'>
                    <FcGoogle className="font-bold" />
                    Google
                </button>
            </form>
            <p className="text-secondary font-bold mb-5">Already have an account?{" "}
                <Link to='/login' className="text-primary">
                    Log in
                </Link>
            </p>
        </div>
    );
}

export default Register;