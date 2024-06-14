import React from "react";
import "./TaskList.css";

function TaskList({ tasks, onSelectTask }) {
  return (
    <div className="task-list">
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} onClick={() => onSelectTask(task)}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
