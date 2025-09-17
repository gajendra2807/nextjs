import { Suspense } from 'react';
import { getTodos } from '@/app/actions';
import TodoListServer from '@/components/TodoListServer';

// This is a Server Component by default.
// It can fetch data directly.
export default async function Home() {
  // Fetch initial data on the server.
  const todos = await getTodos();

  return (
    <div className="background">
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
      <div className="gradient-orb orb-4"></div>
      <div className="mesh-gradient"></div>
      <main className="main-container">
        {/* 
          We pass the server-fetched data to the client component as a prop.
          This is the standard pattern for Server Actions: fetch data on the server,
          and let the client component handle the interactive parts.
        */}
        <Suspense fallback={<div className="todo-container"><h1 className="todo-title">Loading...</h1></div>}>
          <TodoListServer initialTodos={todos} />
        </Suspense>
      </main>
    </div>
  );
}
