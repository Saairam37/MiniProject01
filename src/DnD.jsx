import { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  MouseSensor,
  TouchSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
} from '@dnd-kit/sortable';

import { v4 as uuidv4 } from 'uuid';
import Column from './components/Column';

export default function DnD() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 2 } });
    const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 2 }});
    const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 300, tolerance: 2 }});

    const sensors = useSensors(mouseSensor, pointerSensor, touchSensor);
  const columns = ['todo', 'inprogress', 'done'];

  const findIndex = (id, items) => items.findIndex(t => t.id === id);

  const handleDragOver = ({ active, over }) => {
    if (!over) return;
    const activeTask = tasks.find(t => t.id === active.id);
    const overTask = tasks.find(t => t.id === over.id);
    const overContainer = overTask ? overTask.status : over.id;

    if (activeTask.status !== overContainer) {
      setTasks(prev =>
        prev.map(t =>
          t.id === active.id ? { ...t, status: overContainer } : t
        )
      );
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const activeTask = tasks.find(t => t.id === active.id);
    const overTask = tasks.find(t => t.id === over.id);
    const container = overTask ? overTask.status : over.id;
    const colTasks = tasks.filter(t => t.status === container);
    const oldIndex = findIndex(active.id, colTasks);
    const newIndex = findIndex(over.id, colTasks);

    if (activeTask.status === container && oldIndex !== newIndex) {
      const reordered = arrayMove(colTasks, oldIndex, newIndex);
      const others = tasks.filter(t => t.status !== container);
      setTasks([...others, ...reordered]);
    }
  };

  let temID = "", temStatus = "";

  const editItem = (id, taskTitle, description, status) => {
    temID = id;
    temStatus = status;
    console.log(temID, temStatus);
    const title = document.getElementById('title');
    const desc = document.getElementById('desc');
    title.value = taskTitle;
    desc.value = description;
    const addBtn = document.getElementById('addBtn');
    addBtn.innerHTML = "Update";
  }

  const addTask = (e) => {
    e.preventDefault()
    let titlee = e.target.title.value;
    let desc = e.target.description.value
    if(temID.length > 1){
        const temTasks = tasks.map(item => item.id !== temID?(item):({ id: temID, title: titlee, description: desc, status: temStatus }));
        setTasks([...temTasks]);    
        temID = "";
        temStatus = "";
    }else{
        if (titlee) {
      setTasks(prev => [...prev, { id: uuidv4(), title: titlee, description: desc, status: 'todo' }]);
    }
    }
    const addBtn = document.getElementById('addBtn');
    addBtn.innerHTML = "+ Add Task";
    const form = document.getElementById('myForm');
    form.reset(); 
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4" >
        <h1 className='justify-self-center m-[10px] sm:text-[50px] text-[20px] items-center font-bold'>KANBAN BOARD <img src="./kanban.png" alt="" className=' inline sm:w-[40px] w-[20px]'/></h1>
      <form action="" className='justify-self-center sm:text-[15px] text-xs grid grid-cols-4 md:w-[70%] lg:w-[50%] w-[90%] gap-1' id='myForm' onSubmit={(e)=>addTask(e)}>
        <input type="text" name='title' id='title' className='bg-blue-200 col-span-3 sm:py-2 py-1 px-2 sm:px-4 mb-4 rounded' placeholder='Title...' required/>
        <button type='submit' id='addBtn' className="mb-4 bg-green-500 text-white sm:py-2 py-1 px-2 sm:px-4 rounded">
        + Add Task</button>
      <input type="text" name='description' id='desc' className='bg-blue-200 col-span-4 sm:py-2 py-1 px-2 sm:px-4 mb-4 rounded' placeholder='Description...' required/>
        
      </form>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex justify-self-center w-[90%] justify-center flex-wrap gap-4">
          {columns.map(col => (
            <Column
              key={col}
              id={col}
              label={col === 'todo' ? 'To Do' : col === 'inprogress' ? 'In Progress' : 'Done'}
              tasks={tasks.filter(t => t.status === col)}
              taskss={tasks}
              setTasks={setTasks}
              editItem={editItem}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}


