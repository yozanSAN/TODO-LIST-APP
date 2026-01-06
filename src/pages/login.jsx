import { Link } from "react-router-dom";
function Login() {

    return (
        <div>
            <div className="text-center flex flex-col justify-center items-center gap-2 mt-10">
                <div className="flex justify-center items-center my-10">
                    <img src='/logo.png' alt='logo' className=' w-10 h-10' />
                    <h1 className='text-2xl font-bold'>Task Flow</h1>
                </div>
                <h1 className='text-5xl font-bold'>Welcome Back</h1>

                <div className=" flex flex-col justify-evenly items-center gap-4 py-5 my-5 mx-36 rounded-xl min-w-[30rem]">

                    <label htmlFor="email">Email</label>
                    <input placeholder="Enter your Email" type="text" />

                    <label htmlFor="password">Password</label>
                    <input placeholder="Enter your password" type="password" />
                    {/* TODO: APPLY FORGOT PASSWORD FUNCTIONALITY */}

                    <input type="submit" value="Log in" className='font-bold w-[90%] py-3 rounded-md bg-primary text-white hover:bg-hover' />

                </div>
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
