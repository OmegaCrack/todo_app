const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// In-memory "database"
let todos = [];

// Get all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// Create a new todo
router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTodo = {
    id: uuidv4(),
    title,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Get a specific todo by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// Update a todo by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (title !== undefined) {
    todos[todoIndex].title = title;
  }
  res.json(todos[todoIndex]);
});

// Delete a todo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).end();
});

module.exports = router;
// This code defines a simple Express.js router for managing todos.
// It includes routes to get all todos, create a new todo, and delete a todo by ID.
