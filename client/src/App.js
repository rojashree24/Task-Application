import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetail from "./components/TaskDetail.js";
import TaskEdit from "./components/TaskEdit";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:5000/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const handleTaskAdded = () => {
    fetchTasks();
  };

  const handleTaskDeleted = () => {
    fetchTasks();
    setSelectedTask(null);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskList tasks={tasks} onSelectTask={setSelectedTask} />
      <TaskForm onTaskAdded={handleTaskAdded} />
      {selectedTask && !isEditing && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={handleTaskDeleted}
          onEdit={handleEditClick}
        />
      )}
      {isEditing && (
        <TaskEdit
          task={selectedTask}
          onClose={() => setIsEditing(false)}
          onEditSuccess={() => {
            fetchTasks();
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
