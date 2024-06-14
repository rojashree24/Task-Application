const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [
  { id: '', title: '', description: '', dueDate: '' }
];

// Retrieve all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Create a new task
app.post('/tasks', (req, res) => {
  const newTask = { ...req.body, id: tasks.length + 1 };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Retrieve a single task by its ID
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');
  res.json(task);
});

// Update an existing task
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');

  task.title = req.body.title;
  task.description = req.body.description;
  task.dueDate = req.body.dueDate;

  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send('Task not found');

  tasks.splice(taskIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
