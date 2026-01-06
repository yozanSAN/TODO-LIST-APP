import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";


function Home() {

    return (
        <div className="flex flex-col justify-center items-start mx-40 my-10 gap-2">
            <h1 className="text-4xl font-bold">My Tasks</h1>
            <p className="text-xl text-secondary">A clean minimalist to-do app to keep you organized</p>

            <div class="bg-white my-10 grid grid-cols-1 gap-10 p-5 rounded-xl w-full">
                <div>
                    <p>New Task</p>
                </div>

                <div className="flex">
                    <input className="!rounded-none !rounded-s-lg !bg-background" type="text" placeholder="Add a new task" />
                    <button className="bg-primary py-3 px-3 rounded-r-lg hover:bg-hover"><IoAddCircleOutline className="w-6 h-6 text-white" /></button>
                </div>

                <div className="flex justify-center items-center gap-5 bg-background py-2 max-w-[95%] rounded-md">
                    <button className="bg-transparent text-secondary px-32 py-1 rounded-md active:text-black active:bg-white">All</button>
                    <button className="bg-transparent text-secondary px-32 py-1 rounded-md active:text-black active:bg-white">Active</button>
                    <button className="bg-transparent text-secondary px-32 py-1 rounded-md active:text-black active:bg-white">Completed</button>
                </div>
                <div>

                    <div className="flex justify-between items-center">
                        <div class="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                            <label for="default-checkbox" class="select-none ms-2 text-xl font-medium text-heading">
                                Design the website template layout
                            </label>
                        </div>
                        <button className="mr-12">
                            <MdDelete className="w-5 h-5" />
                        </button>
                    </div>
                    <hr className="border-1 border-secondary w-[95%]" />
                </div>


                <div>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                        <label for="default-checkbox" class="select-none ms-2 text-xl font-medium text-heading">Design the website template layout</label>
                    </div>
                    <hr className="border-1 border-secondary w-[95%]" />
                </div>

            </div>
        </div>
    )
}

export default Home;
