import React, { useState, useEffect } from "react";
import { Resizable } from 're-resizable';
import axios from 'axios';

const TodoItem = ({ todo, handleEditTodo }) => (
  <div key={todo._id} className="mb-2">
    <h3 className="text-lg font-semibold">{todo.title}</h3>
    <p className="text-gray-600">{todo.description}</p>
    <div className="flex justify-between mt-2">
      <button
        onClick={() => handleEditTodo(todo._id)}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600"
      >
        Edit
      </button>
    </div>
  </div>
);

const EditTodoForm = ({ title, description, setTitle, setDescription, handleAddOrUpdateTodo }) => (
  <div className="mb-2">
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border border-gray-300 p-2 rounded-md mb-2"
      placeholder="Title"
    />
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="border border-gray-300 p-2 rounded-md mb-2"
      placeholder="Description"
    ></textarea>
    <button onClick={handleAddOrUpdateTodo} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">Save</button>
  </div>
);

const AddTodoForm = ({ title, description, setTitle, setDescription, handleAddOrUpdateTodo }) => (
  <div className="mb-2">
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border border-gray-300 p-2 rounded-md mb-2"
      placeholder="Title"
    />
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="border border-gray-300 p-2 rounded-md mb-2"
      placeholder="Description"
    ></textarea>
    <button onClick={handleAddOrUpdateTodo} className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600">Add</button>
  </div>
);

const Main = ({ selectedCategory }) => {
  // State variables to manage todo data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [error, setError] = useState(null);
  const [showNewTodoInput, setShowNewTodoInput] = useState(false);

  
  // Function to fetch todos from the API
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/getTodo`);
      setTodos(response.data.result);
      setError(null);
    } catch (error) {
      console.error("Error fetching todos:", error.message);
      setError("Failed to fetch todos. Please try again later.");
    }
    setLoading(false);
  };

  // useEffect hook to fetch todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  const updateTodo = async (todoId, updatedTodoData) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/updateTodo/${todoId}`, updatedTodoData);
      return response.data;
    } catch (error) {
      console.error("Error updating todo:", error.message);
      throw new Error("Failed to update todo.");
    }
  };


  // Function to handle adding or updating a todo
  const handleAddOrUpdateTodo = async () => {
    try {
      const updatedTodoData = { title, description, category: "morning" }; // Assuming category is fixed as "morning"
      if (editableTodoId) {
        // If there is an editable todo ID, update the todo
        await updateTodo(editableTodoId, updatedTodoData);
        setEditableTodoId(null); // Reset editable todo ID
      } else {
        // Otherwise, add a new todo
        await handleAddTodo();
      }
      // Clear input fields
      setTitle("");
      setDescription("");
      // Refresh the todo list
      fetchTodos();
      // Hide the new todo input fields
      setShowNewTodoInput(false);
    } catch (error) {
      console.error("Error adding or updating todo:", error.message);
      setError("Failed to add or update todo. Please try again.");
    }
  };


  // Function to handle adding a new todo
  const handleAddTodo = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/addTodo`, {
        title,
        description,
        category: "morning", // Assuming you want to add todos to the "morning" category
      });
      console.log("Todo added successfully:", response.data);
    } catch (error) {
      console.error("Error adding todo:", error.message);
      throw new Error("Failed to add todo.");
    }
  };

  // Function to handle edit button click
  const handleEditTodo = (todoId) => {
    // Find the todo from the todos array
    const editableTodo = todos.find(todo => todo._id === todoId);
    // Set the title and description from the todo to the state
    setTitle(editableTodo.title);
    setDescription(editableTodo.description);
    // Set the editable todo ID to the clicked todo ID
    setEditableTodoId(todoId);
  };

  // Filter todos based on selected category
  const filteredTodos = selectedCategory ? todos.filter(todo => todo.category === selectedCategory) : todos;

  return (
    <Resizable
      defaultSize={{ width: "100%", height: 300 }}
      minHeight={200}
      maxHeight={500} 
    >
      <div className="flex flex-col h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Todos</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 justify-center">
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between w-full">
            <div>
              {filteredTodos.map(todo => (
                
                <div key={todo._id}>
                  <h1 className="text-2xl font-bold">{todo.category}</h1>
                  {editableTodoId === todo._id ? (
                    <EditTodoForm
                      title={title}
                      description={description}
                      setTitle={setTitle}
                      setDescription={setDescription}
                      handleAddOrUpdateTodo={handleAddOrUpdateTodo}
                    />
                  ) : (
                    <TodoItem todo={todo} handleEditTodo={handleEditTodo} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4">
              {!showNewTodoInput && (
                <button onClick={() => setShowNewTodoInput(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Add Todo</button>
              )}
              {showNewTodoInput && (
                <AddTodoForm
                  title={title}
                  description={description}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  handleAddOrUpdateTodo={handleAddOrUpdateTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Resizable>
  );
};

export default Main;
