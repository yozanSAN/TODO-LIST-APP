import { IoAddCircleOutline } from "react-icons/io5";
import NoTasks from "../components/NoTasks";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "../helper/supabaseClient";
import TasksSkeleton from "../components/TasksSkeleton";
import SortableTask from "../components/SortableTask";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import toast, { Toaster } from "react-hot-toast";

function Home() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isActiveButton, setIsActiveButton] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [user, setUser] = useState(null);

  // -------------------- AUTH CHECK --------------------
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        toast.error("Please log in to continue");
        return;
      }
      setUser(user);
    };
    checkUser();
  }, []);

  // -------------------- FETCH TASKS --------------------
  const fetchTasks = useCallback(async (filter, userId) => {
    if (!userId) return;
    setIsLoading(true);

    try {
      let query = supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .order("order_position", { ascending: true });

      if (filter === "active") query = query.eq("status", "pending");
      if (filter === "completed") query = query.eq("status", "completed");

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching tasks:", error);
        toast.error("Failed to load tasks");
      } else {
        setTasks(data || []);
      }
    } catch (err) {
      console.error("Unexpected error fetching tasks:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // -------------------- FILTER BUTTONS --------------------
  const handleAllClick = useCallback(() => setIsActiveButton("all"), []);
  const handleActiveClick = useCallback(() => setIsActiveButton("active"), []);
  const handleCompletedClick = useCallback(() => setIsActiveButton("completed"), []);

  // -------------------- ADD TASK --------------------
  const handleAddTask = useCallback(async () => {
    if (!input.trim()) {
      toast.error("Please enter a task");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to add tasks");
      return;
    }

    setIsAddingTask(true);

    try {
      const maxOrder = tasks.length > 0 ? Math.max(...tasks.map(t => t.order_position || 0)) : -1;

      const { error } = await supabase
        .from("tasks")
        .insert({
          title: input,
          status: "pending",
          user_id: user.id,
          order_position: maxOrder + 1,
        });

      if (error) {
        console.error("Error inserting task:", error);
        toast.error("Failed to add task");
      } else {
        toast.success("Task added successfully!");
        fetchTasks(isActiveButton, user.id);
        setInput("");
      }
    } catch (err) {
      console.error("Error adding task:", err);
      toast.error("An unexpected error occurred");
    } finally {
      setIsAddingTask(false);
    }
  }, [input, user, tasks, isActiveButton, fetchTasks]);

  // -------------------- DELETE TASK --------------------
  const handleDelete = useCallback(async (taskID) => {
    try {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", taskID);

      if (error) {
        console.error("Error deleting task:", error);
        toast.error("Failed to delete task");
      } else {
        setTasks(prev => prev.filter(t => t.id !== taskID));
        toast.success("Task deleted!");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("An unexpected error occurred");
    }
  }, []);

  // -------------------- TOGGLE STATUS --------------------
  const handleToggleStatus = useCallback(async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";

    // Optimistic update
    setTasks(prev =>
      prev.map(task => task.id === id ? { ...task, status: newStatus } : task)
    );

    try {
      const { error } = await supabase
        .from("tasks")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        console.error("Error updating task:", error);
        toast.error("Failed to update task");

        // Revert if failed
        setTasks(prev =>
          prev.map(task => task.id === id ? { ...task, status: currentStatus } : task)
        );
      } else {
        toast.success(
          newStatus === "completed" ? "Task completed!" : "Task reactivated!"
        );
      }
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("An unexpected error occurred");
      setTasks(prev =>
        prev.map(task => task.id === id ? { ...task, status: currentStatus } : task)
      );
    }
  }, []);

  // -------------------- DRAG & DROP --------------------
  const handleDragEnd = useCallback(async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setTasks(prevTasks => {
      const oldIndex = prevTasks.findIndex(t => t.id === active.id);
      const newIndex = prevTasks.findIndex(t => t.id === over.id);
      const reorderedTasks = arrayMove(prevTasks, oldIndex, newIndex);

      // Update order in DB
      reorderedTasks.forEach(async (task, index) => {
        await supabase
          .from("tasks")
          .update({ order_position: index })
          .eq("id", task.id);
      });

      return reorderedTasks;
    });
  }, []);

  // -------------------- HANDLE ENTER KEY --------------------
  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter" && !isAddingTask) handleAddTask();
  }, [handleAddTask, isAddingTask]);

  // -------------------- EFFECT --------------------
  useEffect(() => {
    if (user) fetchTasks(isActiveButton, user.id);
  }, [user, isActiveButton, fetchTasks]);

  // -------------------- RENDER --------------------
  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#363636", color: "#fff" },
        }}
      />
      <div className="flex flex-col justify-center items-start mx-40 my-10 gap-2">
        <h1 className="text-4xl font-bold">My Tasks</h1>
        <p className="text-xl text-secondary">
          A clean minimalist to-do app to keep you organized
        </p>

        <div className="bg-white my-10 grid grid-cols-1 gap-10 p-5 rounded-xl w-full">
          {/* New Task Input */}
          <div>
            <label htmlFor="new-task-input" className="block mb-2">New Task</label>
            <div className="flex">
              <input
                id="new-task-input"
                className="!rounded-none !rounded-s-lg !bg-background flex-1"
                type="text"
                placeholder="Add a new task"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isAddingTask}
                aria-label="New task input"
              />
              <button
                onClick={handleAddTask}
                disabled={isAddingTask}
                className="bg-primary py-3 px-3 rounded-r-lg hover:bg-hover disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isAddingTask
                  ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <IoAddCircleOutline className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center items-center gap-3 bg-background py-1 px-1 max-w-[95%] rounded-md">
            <button
              onClick={handleAllClick}
              className={`w-[33%] py-1 rounded-md hover:bg-white text-black ${isActiveButton === "all" ? "bg-white text-black" : "bg-transparent text-secondary"}`}
            >
              All
            </button>
            <button
              onClick={handleActiveClick}
              className={`w-[33%] py-1 rounded-md hover:bg-white text-black ${isActiveButton === "active" ? "bg-white text-black" : "bg-transparent text-secondary"}`}
            >
              Active
            </button>
            <button
              onClick={handleCompletedClick}
              className={`w-[33%] py-1 rounded-md hover:bg-white text-black ${isActiveButton === "completed" ? "bg-white text-black" : "bg-transparent text-secondary"}`}
            >
              Completed
            </button>
          </div>

          {/* Tasks List */}
          <div>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                {isLoading ? (
                  <TasksSkeleton count={4} />
                ) : tasks.length === 0 ? (
                  <NoTasks />
                ) : (
                  tasks.map(task => (
                    <SortableTask
                      key={task.id}
                      task={task}
                      onToggle={handleToggleStatus}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
