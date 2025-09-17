// src/app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

// --- DATA SIMULATION --- //
// In a real app, this would be in a separate database file.

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

// Simulate a database table with some initial data.
let todos: Todo[] = [
  {
    id: 1,
    text: 'Learn about Server Actions',
    completed: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 2,
    text: 'Build the new server component',
    completed: false,
    createdAt: new Date(),
  },
];

// --- SERVER ACTIONS --- //

/**
 * Fetches all todos from the database.
 * This is NOT a Server Action that you call from the client,
 * but a server-side function you call in Server Components.
 */
export const getTodos = async (): Promise<Todo[]> => {
  // Simulate a network delay for fetching data
  await new Promise(resolve => setTimeout(resolve, 1500));
  return todos.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

/**
 * Server Action to add a new todo.
 */
export const addTodoAction = async (formData: FormData) => {
  const text = formData.get('text') as string;

  if (!text || text.trim() === '') {
    // In a real app, you'd return an error object
    return;
  }

  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date(),
  };
  todos.unshift(newTodo); // Add to the beginning of the array

  // Revalidate the path to trigger a UI update.
  revalidatePath('/');
};

/**
 * Server Action to toggle a todo's completion status.
 */
export const toggleTodoAction = async (id: number) => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    revalidatePath('/');
  }
};

/**
 * Server Action to delete a todo.
 */
export const deleteTodoAction = async (id: number) => {
  todos = todos.filter(t => t.id !== id);
  revalidatePath('/');
};
