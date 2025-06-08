# To-Do List API (Express + Docker)

A simple RESTful To-Do list API built with Express.js, running inside a Docker container.
It supports basic CRUD operations using in-memory storage.

# Features
- Create a to-do item
- List all to-do items
- Get to-do item by ID
- Update to-do item by ID
- Delete a to-do item by ID
- Dockerized for consistent deployment
      
#  Run with Docker
## 1. Build the Docker Image
  docker build -t todo-app .
## 2. Run the Container
  docker run -p 3000:3000 todo-app
### The API will be available at http://localhost:3000

# Run The App
docker-compose up --build

#  API Endpoints
##  GET /todos
##  POST /todos
##  GET /todos/:id
##  PUT /todos/:id
##  DELETE /todos/:id
