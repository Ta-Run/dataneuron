import React, { useState, useEffect } from "react";
import { Resizable } from 're-resizable';
import axios from 'axios';

const Main = () => {
  // State variables to manage todo data
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch todos from the API
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/v1/todo/getTodo");
      console.log(response.data.result
      )
      setTodos(response.data.result
      );
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

  // Function to handle adding a new todo
  const handleAddTodo = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/todo/addTodo", {
        title,
        description,
        category: "morning", // Assuming you want to add todos to the "morning" category
      });
      console.log("Todo added successfully:", response.data);
      setTitle("");
      setDescription("");
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error("Error adding todo:", error.message);
      setError("Failed to add todo. Please try again.");
    }
  };

  // Function to handle updating a todo
  const handleUpdateTodo = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/v1/todo/updateTodo/${id}`, updatedData);
      console.log("Todo updated successfully:", response.data);
      setEditableTodoId(null);
      fetchTodos(); // Refresh the todo list
    } catch (error) {
      console.error("Error updating todo:", error.message);
      setError("Failed to update todo. Please try again.");
    }
  };


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
            {todos.map(todo => (
                <div key={todo._id}>
                  {editableTodoId === todo._id ? (
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
                      <button
                        onClick={() => handleUpdateTodo(todo._id, { title, description })}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditableTodoId(null)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="mb-2">
                      <h3 className="text-lg font-semibold">{todo.title}</h3>
                      <p className="text-gray-600">{todo.description}</p>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setEditableTodoId(todo._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 mr-2"
                    >
                      Edit
                    </button>
                    
                  </div>
                </div>
              ))} 
            </div>
            <div className="mt-4 flex justify-center space-x-4">
              <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">Add</button>
            </div>
          </div>
        </div>
      </div>
    </Resizable>
  );
};

export default Main;
