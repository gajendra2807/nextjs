// src/components/TodoListServer.tsx
'use client';

import { useTransition } from 'react';
import { FaPlus, FaTrash, FaCheck, FaRegCircle } from 'react-icons/fa';
import { addTodoAction, toggleTodoAction, deleteTodoAction } from '@/app/actions';
import type { Todo } from '@/app/actions';

// A client component that receives server-side data and calls server actions.
export default function TodoListServer({ initialTodos }: { initialTodos: Todo[] }) {
  // useTransition is a React hook that allows you to manage pending states for actions.
  // It helps provide feedback to the user while the server action is processing.
  const [isPending, startTransition] = useTransition();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">To-Do List (Server Actions)</h1>

      {/* The form now calls a server action directly. */}
      <form
        action={(formData) => {
          // We wrap the server action in startTransition to manage the pending state.
          startTransition(() => addTodoAction(formData));
          // Reset the form after submission.
          const form = document.getElementById('add-todo-form') as HTMLFormElement;
          form.reset();
        }}
        id="add-todo-form"
        className="todo-form"
      >
        <input
          type="text"
          name="text" // The name attribute is crucial for FormData
          placeholder="What needs to be done?"
          className="todo-input"
          required
        />
        <button type="submit" className="add-button" disabled={isPending}>
          {isPending ? 'Adding...' : <FaPlus />}
        </button>
      </form>

      {/* The list of todos is rendered from the props passed by a Server Component. */}
      <ul className="todo-list">
        {initialTodos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <button
              onClick={() => startTransition(() => toggleTodoAction(todo.id))}
              className="check-button"
              aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {todo.completed ? <FaCheck /> : <FaRegCircle />}
            </button>
            <div className="todo-text-container">
              <span className="todo-text">{todo.text}</span>
              <span className="todo-date">{formatDate(todo.createdAt)}</span>
            </div>
            <button
              onClick={() => startTransition(() => deleteTodoAction(todo.id))}
              className="delete-button"
              aria-label="Delete task"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      {initialTodos.length === 0 && (
        <div className="empty-state">
          <p>No tasks yet. Add one above!</p>
        </div>
      )}

      {initialTodos.length > 0 && (
        <div className="todo-counter">
          <span className="counter-badge">
            {initialTodos.filter(t => t.completed).length} completed / {initialTodos.length} total
          </span>
        </div>
      )}
    </div>
  );
}
