🗂️ Kanban Task Manager:
  
  A Kanban-style task management application built with React JS that allows users to create, organize, and move tasks between columns like "To Do", "In Progress", and "Done". This project focuses on smooth drag-and-drop interaction, global state management using Context API, and data persistence with localStorage.

🚀 Features:

 📋 Create, edit, and delete tasks with title, description, and optional metadata.

 🧩 Drag and drop tasks between columns (To Do, In Progress, Done).

 💾 Local persistence using localStorage to retain tasks on reload.

 🖼️ View and edit full task details in a modal popup.

 📱 Fully responsive design using TailwindCSS.

🛠️ Tech Stack
 - React JS for building the UI

 - TailwindCSS for responsive styling

 - React Hooks (useState, useContext, useEffect)

 - Context API for managing global task state

 - Drag-and-Drop Library: dnd-kit

 - localStorage for saving tasks locally

🔲 Task Board Layout:
  Displays three columns:

  🟦 To Do

  🟨 In Progress

  🟩 Done

Each column contains task cards showing:

 - Task title

 - Description

 - ➕ Add / ✏️ Edit / ❌ Delete Tasks

Tasks can be added via a form with:

 - Title

 - Description

 - Status selection (To Do / In Progress / Done)

 - Edit or delete tasks directly from each card or within the detail modal.

 - All task data is saved in localStorage.

🖱️ Drag and Drop:

 - Move tasks between columns using drag-and-drop.

 - State and localStorage are updated upon drop.

 - Smooth UI transitions powered by dnd-kit.

