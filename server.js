const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT =  3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
