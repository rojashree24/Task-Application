import React, { useState } from "react";
import "./TaskEdit.css";

function TaskEdit({ task, onClose, onEditSuccess }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { title, description, dueDate };

    const response = await fetch(`http://localhost:5000/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    if (response.ok) {
      onEditSuccess();
    }
  };

  return (
    <div className="task-edit">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default TaskEdit;
