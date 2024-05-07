import './App.css';
import { useState, useEffect } from 'react';

const URL = 'https://jsonplaceholder.typicode.com/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoDetails, setTodoDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const handleTodoClick = async (id) => {
    try {
      const response = await fetch(`${URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const details = await response.json();
      setTodoDetails(details);
    } catch (error) {
      console.error('Error fetching todo details: ', error);
    }
  };

  //Makes them disappear off the list
  const handleDeleteAndComplete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setTodoDetails(null); 
  };

  return (
    <div className="App">
      <div className="content">
        <div className="todo-list">
          {todos.map(todo => (
            <div key={todo.id} onClick={() => handleTodoClick(todo.id)} style={{ cursor: 'pointer' }}>
              {todo.title}
            </div>
          ))}
        </div>
        <div className="todo-details">
          {todoDetails ? (
            <div>
              <p><span className='bold'>Title:</span> {todoDetails.title}</p>
              <p><span className='bold'>User ID:</span> {todoDetails.userId}</p>
              <button className='delete' onClick={() =>  handleDeleteAndComplete(todoDetails.id)}>Delete</button>
              <button  className='complete' onClick={() =>  handleDeleteAndComplete(todoDetails.id)}>Completed</button>
            </div>
          ) : (
            <div>Please select a todo to see the details.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
