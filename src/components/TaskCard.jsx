import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

export default function TaskCard({ task, taskss, setTasks, editItem }) {
  const { attributes, listeners, setNodeRef, transform, transition, } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white p-4 w-full mb-2 rounded shadow cursor-grab relative"
    >
      <div className="flex justify-between relative z-10 items-start">
        <div className="flex flex-col">
            <h4 className="font-semibold">{task.title}</h4>
            <h2 className="italic">{task.description}</h2>
        </div>
        <div className="absolute text-sm z-30 flex gap-2 right-2">
            <button className="text-blue-500 cursor-pointer" onClick={()=>{
                editItem(task.id, task.title, task.description, task.status);
            }}>Edit</button>
            <button
          onClick={() => {
            const id = task.id;
            setTasks(taskss => taskss.filter(t => t.id !== id))}}
          className="text-red-500 text-sm  cursor-pointer"
        >
          Delete
        </button>
        </div>
      </div>
    </div>
  );
}