import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import NoTasks from "../components/NoTasks";
import { useEffect, useState } from "react";
import { supabase } from "../helper/supabaseClient";
import TasksSkeleton from "../components/TasksSkeleton";
function Home() {
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isActiveButton, setIsActiveButton] = useState('all');
    const [isLoading, setIsLoading] = useState(true);

    // GET ALL TASKS
    const fetchTasks = async (filter) => {
        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();

            let query = supabase
                .from('tasks')
                .select('*')
                .eq('user_id', user.id);

            if (filter === 'active') {
                query = query.eq('status', 'pending');
            }

            if (filter === 'completed') {
                query = query.eq('status', 'completed');
            }

            const { data, error } = await query;

            if (error) {
                console.log('error fetching tasks', error);
            } else {
                setTasks(data);
            }
        } catch (error) {
            console.log('error fetching tasks', error);
        } finally {
            setIsLoading(false);
        }

    };

    //HANDLE FILTERING UI
    const handleAllClick = () => setIsActiveButton('all');
    const handleActiveClick = () => setIsActiveButton('active');
    const handleCompletedClick = () => setIsActiveButton('completed');

    //HANDLE ADD TASK
    const handleAddTask = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('tasks')
            .insert({ title: input, status: 'pending', user_id: user.id })
        if (error) {
            console.log('error inserting task', error)
            alert('error inserting task');
        } else {
            alert('task inserted successfully');
        }
        fetchTasks(isActiveButton);
        setInput('');
    }

    //DELETE TASK
    const handleDelete = async (taskID) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskID)
        if (error) {
            console.log('error deleting task', error)
            alert('error deleting task');
        } else {
            console.log('task deleted successfully');
            alert('task deleted successfully');
        }
        setTasks(tasks.filter(task => task.id !== taskID))
    }
    //HANDLE TASK STATUS TOGGLE 
    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        const { error } = await supabase
            .from("tasks")
            .update({ status: newStatus })
            .eq("id", id);
        if (error) {
            console.log('error updating task', error)
            alert('error updating task');
        } else {
            fetchTasks(isActiveButton);
        }
    }
    //--------------------
    useEffect(() => {
        fetchTasks(isActiveButton);
    }, [isActiveButton]);


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
                        isLoading ? (
                            <TasksSkeleton count={4}/>
                        )
                            :
                            (
                                tasks?.length === 0 ? (<NoTasks />)
                                    :
                                    (tasks.map((task) =>
                                        <div key={task.id}>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center mb-4">

                                                    <input id="default-checkbox" type="checkbox" checked={task.status === 'completed'} onChange={() => handleToggleStatus(task.id, task.status)} className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" />

                                                    <label htmlFor="default-checkbox" className="select-none ms-2 text-xl font-medium text-heading">
                                                        {task.title}
                                                    </label>
                                                </div>
                                                <button className="mr-12">
                                                    <MdDelete className="w-5 h-5" onClick={() => { handleDelete(task.id) }} />
                                                </button>
                                            </div>
                                            <hr className="border-1 border-secondary w-[95%] my-3" />
                                        </div>)
                                    )
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;
