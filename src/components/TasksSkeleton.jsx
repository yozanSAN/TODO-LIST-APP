function TasksSkeleton({ count = 4 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Checkbox */}
              <div className="w-4 h-4 rounded-sm bg-gray-300 animate-pulse" />

              {/* Task title */}
              <div className="h-5 w-64 bg-gray-300 rounded animate-pulse" />
            </div>

            {/* Delete icon */}
            <div className="w-5 h-5 bg-gray-300 rounded animate-pulse" />
          </div>

          <div className="h-px bg-gray-200 my-3 w-[95%]" />
        </div>
      ))}
    </div>
  );
}

export default TasksSkeleton;
