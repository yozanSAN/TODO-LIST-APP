import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
function Register() {

    return (
        <div className="text-center flex flex-col justify-center items-center gap-2">
            <div className="flex justify-center items-center my-5">
                <img src='/logo.png' alt='logo' className=' w-10 h-10' />
                <h1 className='text-xl'>Task Flow</h1>
            </div>
            <h1 className='text-4xl font-bold'>Create Your Account</h1>

            <div className="bg-white flex flex-col justify-evenly items-center gap-4 py-5 my-5 mt-5 rounded-xl min-w-[30rem]">
                <label htmlFor="username" >Username</label>
                <input placeholder="Enter your username" type="text" />

                <label htmlFor="email">Email</label>
                <input placeholder="Enter your Email" type="text" />

                <label htmlFor="password">Password</label>
                <input placeholder="Enter your password" type="password" />

                <label htmlFor="Conform Password">Conform Password</label>
                <input placeholder="Conform Password" type="password" />

                <input type="submit" value="Create Account" className='font-bold w-[90%] py-3 rounded-md bg-primary text-white hover:bg-hover' />

                <hr className=" border-2 border-gray w-[90%]" />
                <p className="text-secondary">Or continue with</p>
                <button className=' flex justify-center items-center gap-2  py-2 px-10 rounded-md border-2 border-gray-400'>
                    <FcGoogle className="font-bold" />
                    Google
                </button>
            </div>
            <p className="text-secondary font-bold mb-5">Already have an account?{" "}
                <Link to='/' className="text-primary">
                    Log in
                </Link>
            </p>
        </div>
    )
}

export default Register
