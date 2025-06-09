const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const pool = require('../db');

// In-memory "database"
// let todos = [];

// Get all todos
router.get('/', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM todos ORDER BY created_at DESC'
  );
  res.json(result.rows);
});

// Create a new todo
router.post('/', async (req, res) => {
  const { title, completed = false, due_date = null } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const id = uuidv4();
    const result = await pool.query(
      'INSERT INTO todos (id, title,completed, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [id, title, completed, due_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating todo: ', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific todo by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a todo by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed, due_date } = req.body;

  try {
    const result = await pool.query(
      'UPDATE todos SET title = $1, completed = $2, due_date = $3 WHERE id = $4 RETURNING *',
      [title, completed, due_date, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(`Error updating todo with ID ${id}:`, err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM todos WHERE id = $1', [req.params.id]);
  res.status(204).end();
});

module.exports = router;
// This code defines a simple Express.js router for managing todos.
// It includes routes to get all todos, create a new todo, and delete a todo by ID.
