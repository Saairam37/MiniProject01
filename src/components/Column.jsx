import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

export default function Column({ id, label, tasks, taskss, setTasks, editItem }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
      <div
        ref={setNodeRef}
        id={id}
        className={`flex flex-col w-[80%] lg:w-[30%] text-sm sm:text-lg sm:w-[45%] bg-gray-200 p-3 rounded min-h-[200px] ${isOver ? 'bg-blue-100' : ''}`}
      >
        <h2 className="font-bold mb-2">{label}</h2>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} taskss={taskss} setTasks={setTasks} editItem={editItem} />
        ))}
      </div>
    </SortableContext>
  );
}