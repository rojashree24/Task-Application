import React from "react";
import "./TaskDetail.css";

function TaskDetail({ task, onClose, onDelete, onEdit }) {
  const handleDelete = async () => {
    const response = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      onDelete();
    }
  };

  return (
    <div className="task-detail">
      <h2>Task Detail</h2>
      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <button onClick={onClose}>Close</button>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskDetail;
