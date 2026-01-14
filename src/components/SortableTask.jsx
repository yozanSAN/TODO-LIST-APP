import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdDelete } from "react-icons/md";

function SortableTask({ task, onToggle, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="flex justify-between items-center">
        <div className="flex items-center mb-4 gap-3">
          <input
            type="checkbox"
            checked={task.status === "completed"}
            onChange={() => onToggle(task.id, task.status)}
            className="w-4 h-4"
          />

          <span className="text-xl font-medium">
            {task.title}
          </span>
        </div>

        <button onClick={() => onDelete(task.id)}>
          <MdDelete className="w-5 h-5" />
        </button>
      </div>

      <hr className="border-secondary w-[95%] my-3" />
    </div>
  );
}

export default SortableTask;
