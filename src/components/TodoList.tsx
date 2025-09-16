'use client';

import { useState } from 'react';
import { FaPlus, FaTrash, FaCheck, FaRegCircle, FaStar, FaCalendarAlt } from 'react-icons/fa';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputText,
        completed: false,
        createdAt: new Date(),
      };
      setTodos([newTodo, ...todos]);
      setInputText('');
    }
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleRemoveTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Format date to a readable string
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">My Colorful Tasks</h1>
      
      {/* Input area */}
      <div className="input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          className="todo-input"
          placeholder="Add a new colorful task..."
        />
        <button
          onClick={handleAddTodo}
          className="add-button"
          disabled={inputText.trim() === ''}
        >
          <FaPlus />
        </button>
      </div>
      
      {/* Empty state */}
      {todos.length === 0 && (
        <div className="empty-state">
          <FaStar className="empty-icon" />
          <p>Your task list is empty</p>
          <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>Add your first colorful task above</p>
        </div>
      )}
      
      {/* Task list */}
      <ul className="todo-list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={todo.completed ? 'todo-complete' : ''}
          >
            <div className="todo-item">
              {/* Checkbox area */}
              <button
                onClick={() => handleToggleTodo(todo.id)}
                className="check-button"
                aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {todo.completed ? <FaCheck /> : <FaRegCircle />}
              </button>
              
              {/* Text content area */}
              <div className="todo-content">
                <div
                  className="todo-text"
                  onClick={() => handleToggleTodo(todo.id)}
                >
                  {todo.text}
                </div>
                
                {/* Date display */}
                <div className="todo-date">
                  <FaCalendarAlt style={{ marginRight: '4px', fontSize: '0.7rem', display: 'inline' }} />
                  <span>{formatDate(todo.createdAt)}</span>
                </div>
              </div>
              
              {/* Delete button */}
              <button
                onClick={() => handleRemoveTodo(todo.id)}
                className="delete-button"
                aria-label="Delete task"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      {/* Task counter */}
      {todos.length > 0 && (
        <div className="todo-counter">
          <span className="counter-badge">
            {todos.filter(t => t.completed).length} completed / {todos.length} total
          </span>
        </div>
      )}
    </div>
  );
}

