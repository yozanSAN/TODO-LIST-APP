
function Register() {

    return (
        <div className="text-center">
            <div className="flex justify-center items-center my-10">
                <img src='/logo.png' alt='logo' className=' w-10 h-10' />
                <h1 className='text-xl'>Task Flow</h1>
            </div>
            <h1 className='text-3xl font-bold'>Create Your Account</h1>

            <div className="bg-white flex flex-col justify-evenly items-center gap-4 py-5 my-5 mx-36 rounded-xl">
                <label htmlFor="username" >Username</label>
                <input placeholder="Enter your username" type="text"/>

                <label htmlFor="email">Email</label>
                <input placeholder="Enter your Email" type="text"/>

                <label htmlFor="password">Password</label>
                <input placeholder="Enter your password" type="password"/>

                <label htmlFor="Conform Password">Conform Password</label>
                <input placeholder="Conform Password" type="password"/>

                <input type="submit" value="Create Account" className='font-bold w-[90%] py-3 rounded-md bg-primary text-white hover:bg-hover'/>
            </div>
        </div>
    )
}

export default Register
