import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import tasksData from "../data/tasks";
import NoTasks from "../components/NoTasks";
import { useState } from "react";
function Home() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState(tasksData);
    const [isActiveButton, setIsActiveButton] = useState('all');
    //FILTERING TASKS BY THE STATUS
    const completedTasks = tasksData.filter(task => task.status === 'completed');
    const activeTasks = tasksData.filter(task => task.status === 'active');

    const handleActiveClick = () => {
        setIsActiveButton('active');
        setTasks(activeTasks);
    };
    const handleCompletedClick = () => {
        setIsActiveButton('completed');
        setTasks(completedTasks)
    };
    const handleAllClick = () => {
        setIsActiveButton('all');
        setTasks(tasksData)
    };

    //HANDLE ADD TASK
    const handleAddTask = () => {
        if (!input) {
            alert('invalid input');
            return;
        }
        const newts = {
            id: 3,
            title: input,
            status: 'active',
        }
        setTasks([...tasks, newts]);
        setInput('');
    }

    return (
        <div className="flex flex-col justify-center items-start mx-40 my-10 gap-2">
            <h1 className="text-4xl font-bold">My Tasks</h1>
            <p className="text-xl text-secondary">A clean minimalist to-do app to keep you organized</p>

            <div className="bg-white my-10 grid grid-cols-1 gap-10 p-5 rounded-xl w-full">
                <div>
                    <p>New Task</p>
                </div>

                <div className="flex">
                    <input className="!rounded-none !rounded-s-lg !bg-background" type="text" placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button onClick={handleAddTask} className="bg-primary py-3 px-3 rounded-r-lg hover:bg-hover">
                        <IoAddCircleOutline className="w-6 h-6 text-white" />
                    </button>
                </div>

                <div className="flex justify-center items-center gap-3 bg-background py-1 px-1 max-w-[95%] rounded-md">
                    <button onClick={handleAllClick} className={`w-[33%] py-1 rounded-md hover:bg-white text-black ${isActiveButton === 'all' ? 'bg-white text-black' : 'bg-transparent text-secondary'}`}>All</button>

                    <button onClick={handleActiveClick} className={` w-[33%] py-1 rounded-md hover:bg-white text-black ${isActiveButton === 'active' ? 'bg-white text-black' : 'bg-transparent text-secondary'}`}>Active</button>

                    <button onClick={handleCompletedClick} className={` w-[33%] py-1 rounded-md hover:bg-white text-black ${isActiveButton === 'completed' ? 'bg-white text-black' : 'bg-transparent text-secondary'}`}>Completed</button>
                </div>
                <div>

                    {
                        Array.isArray(tasks) && tasks.length === 0 ? (
                            <NoTasks />
                        )
                            :
                            (
                                tasks.map((task) =>
                                    <div key={task.id}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center mb-4">
                                                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />
                                                <label htmlFor="default-checkbox" className="select-none ms-2 text-xl font-medium text-heading">
                                                    {task.title}
                                                </label>
                                            </div>
                                            <button className="mr-12">
                                                <MdDelete className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <hr className="border-1 border-secondary w-[95%] my-3" />
                                    </div>
                                )
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;
