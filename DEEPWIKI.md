# DeepWiki: React & Next.js Practice

This comprehensive wiki documents the core concepts, best practices, and implementation details for React and Next.js development, using the To-Do List application as a reference implementation.

---

## Table of Contents

1. [React Fundamentals](#react-fundamentals)
2. [Next.js Framework](#nextjs-framework)
3. [Component Design](#component-design)
4. [State Management](#state-management)
5. [Styling Approaches](#styling-approaches)
6. [TypeScript Integration](#typescript-integration)
7. [Deployment Strategies](#deployment-strategies)
8. [Performance Optimization](#performance-optimization)
9. [Common Patterns](#common-patterns)
10. [Advanced Techniques](#advanced-techniques)

---

<a id="react-fundamentals"></a>
## 1. React Fundamentals

### 1.1 Component Architecture

React applications are built using components, which are reusable, self-contained pieces of code that return markup.

#### Example from Our Project:

```tsx
// src/components/TodoList.tsx
export default function TodoList() {
  // Component logic...
  
  return (
    <div className="todo-container">
      <h1 className="todo-title">My Colorful Tasks</h1>
      {/* More JSX... */}
    </div>
  );
}
```

**Key Points:**
- Components can be functional (as above) or class-based
- Modern React applications primarily use functional components
- Components should be focused on a single responsibility
- Components can be composed together to build complex UIs

### 1.2 JSX

JSX is a syntax extension for JavaScript that looks similar to HTML but allows you to write HTML-like code in JavaScript.

#### Example from Our Project:

```jsx
// From TodoList.tsx
<div className="todo-item">
  <button
    onClick={() => handleToggleTodo(todo.id)}
    className="check-button"
    aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
  >
    {todo.completed ? <FaCheck /> : <FaRegCircle />}
  </button>
  {/* More JSX... */}
</div>
```

**Key Points:**
- JSX must have a single root element
- Use `className` instead of `class` for CSS classes
- JavaScript expressions can be used inside JSX with curly braces `{}`
- JSX elements can have attributes, similar to HTML
- Self-closing tags must end with `/>` (e.g., `<img />`)

### 1.3 React Hooks

Hooks are functions that let you use React features in functional components.

#### Example from Our Project:

```tsx
// State hook in TodoList.tsx
const [todos, setTodos] = useState<Todo[]>([]);
const [inputText, setInputText] = useState('');
```

**Common Hooks:**

1. **useState**: For managing component state
2. **useEffect**: For side effects (API calls, subscriptions)
3. **useContext**: For accessing context values
4. **useRef**: For persistent mutable references
5. **useCallback**: For memoized callback functions
6. **useMemo**: For memoized values

**Best Practices:**
- Don't call hooks conditionally
- Only call hooks at the top level of your component
- Only call hooks from React function components or custom hooks
- Create custom hooks to reuse stateful logic between components

---

<a id="nextjs-framework"></a>
## 2. Next.js Framework

### 2.1 App Router

Next.js 13+ introduced the App Router, which uses a folder-based routing system.

#### Project Structure:
```
src/app/
├── globals.css
├── layout.tsx    # Root layout
├── page.tsx      # Home page (/)
└── not-found.tsx # 404 page
```

**Key Points:**
- Each folder represents a route segment
- Special files like `page.tsx`, `layout.tsx` have specific roles
- Nested folders create nested routes

### 2.2 Server and Client Components

Next.js 13+ introduces a new paradigm with server and client components.

#### Server Components (Default):
```tsx
// src/app/page.tsx
import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <div className="background">
      {/* ... */}
      <TodoList />
    </div>
  );
}
```

#### Client Components:
```tsx
// src/components/TodoList.tsx
'use client';

import { useState } from 'react';
// ...
```

**Key Differences:**
- Server components render on the server and are non-interactive
- Client components render on the client and can use hooks, event handlers
- Server components reduce client-side JavaScript
- Use `'use client'` directive to mark a component as client-side

### 2.3 Data Fetching

Next.js provides multiple ways to fetch data:

1. **Server Components**: Direct async/await
2. **Client Components**: useEffect, SWR, or React Query
3. **getServerSideProps**: For server-side rendering (Pages Router)
4. **getStaticProps**: For static site generation (Pages Router)

**Best Practices:**
- Prefer fetching data in server components when possible
- Use caching strategies to optimize performance
- Handle loading and error states properly

### 2.4 Layouts and Templates

Layouts in Next.js allow sharing UI between multiple pages.

#### Example:
```tsx
// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Key Points:**
- Layouts persist across page navigation
- Layouts can be nested
- Layouts don't re-render during navigation

---

<a id="component-design"></a>
## 3. Component Design

### 3.1 Atomic Design Principles

The Atomic Design methodology breaks down components into:

1. **Atoms**: Basic building blocks (buttons, inputs)
2. **Molecules**: Groups of atoms (form fields with labels)
3. **Organisms**: Groups of molecules (forms, headers)
4. **Templates**: Page layouts without content
5. **Pages**: Templates with content

### 3.2 Component Composition

Composition is a powerful pattern for building flexible components.

#### Example:
```tsx
// Basic composition
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Using composition
<Card>
  <h2>Title</h2>
  <p>Content</p>
</Card>
```

### 3.3 Props and PropTypes

Props are arguments passed into React components.

#### Example from Our Project:

```tsx
// Type definition for props
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}
```

**Best Practices:**
- Use TypeScript interfaces or type aliases to define prop types
- Use default props when appropriate
- Destructure props when using them
- Keep props immutable

---

<a id="state-management"></a>
## 4. State Management

### 4.1 Local State with useState

For component-specific state that doesn't need to be shared.

#### Example from Our Project:

```tsx
const [todos, setTodos] = useState<Todo[]>([]);

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
```

### 4.2 Lifting State Up

When multiple components need to share state, lift it up to their closest common ancestor.

#### Example Pattern:

```tsx
function Parent() {
  const [sharedState, setSharedState] = useState(initialState);
  
  return (
    <>
      <ChildA state={sharedState} onChange={setSharedState} />
      <ChildB state={sharedState} onChange={setSharedState} />
    </>
  );
}
```

### 4.3 Context API

For global state that needs to be accessed by many components.

#### Example Pattern:

```tsx
// Create context
const TodoContext = createContext();

// Provider component
function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  
  // Functions to manipulate todos
  
  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

// Using the context
function TodoItem() {
  const { toggleTodo, removeTodo } = useContext(TodoContext);
  // ...
}
```

### 4.4 External State Management

For complex applications, external libraries like Redux, Zustand, or Jotai can be used.

#### When to use:
- Complex state logic
- Many components need to access the same state
- Deep component hierarchies
- Need for middleware (like for async operations)

---

<a id="styling-approaches"></a>
## 5. Styling Approaches

### 5.1 CSS Modules

CSS Modules locally scope CSS by automatically creating unique class names.

#### Example:
```css
/* Button.module.css */
.button {
  background: blue;
  color: white;
}
```

```tsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

### 5.2 Global CSS

Our project uses global CSS for styling.

#### Example from Our Project:
```css
/* globals.css */
.todo-container {
  width: 100%;
  max-width: 600px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  /* More styles... */
}
```

### 5.3 CSS-in-JS

Libraries like styled-components or emotion allow writing CSS directly in JavaScript.

#### Example:
```tsx
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
  padding: 10px 20px;
  border-radius: 4px;
`;

// Usage
<Button primary>Primary Button</Button>
```

### 5.4 Utility-First CSS (Tailwind)

While our project now uses direct CSS, Tailwind is a popular utility-first approach.

#### Example:
```tsx
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Click me
</button>
```

**Comparison of Approaches:**

| Approach | Pros | Cons |
|----------|------|------|
| Global CSS | Simple, no build step | Potential naming conflicts |
| CSS Modules | Scoped, familiar syntax | Requires build step |
| CSS-in-JS | Dynamic, component-based | Runtime cost |
| Tailwind | Rapid development, consistent design | Verbose markup, learning curve |

---

<a id="typescript-integration"></a>
## 6. TypeScript Integration

### 6.1 Basic Types

TypeScript adds static typing to JavaScript, catching errors during development.

#### Example from Our Project:
```tsx
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}
```

### 6.2 Typing Component Props

#### Example:
```tsx
interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

function Button({ onClick, label, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### 6.3 Typing Hooks

#### Example from Our Project:
```tsx
// Typed state hook
const [todos, setTodos] = useState<Todo[]>([]);
```

### 6.4 Type Assertions and Type Guards

#### Example:
```tsx
// Type assertion
const element = document.getElementById('root') as HTMLElement;

// Type guard
function isTodo(obj: any): obj is Todo {
  return 'id' in obj && 'text' in obj && 'completed' in obj;
}
```

**Best Practices:**
- Define interfaces for component props
- Use type guards for runtime type checking
- Avoid using `any` type
- Consider using utility types like Partial, Omit, Pick

---

<a id="deployment-strategies"></a>
## 7. Deployment Strategies

### 7.1 Static Export

For fully static sites with no server requirements.

```bash
# Configure next.config.js
module.exports = {
  output: 'export',
}

# Build the static site
npm run build
```

### 7.2 Netlify Deployment

Our project uses Netlify for deployment.

#### Configuration File:
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

#### Deployment Commands:
```bash
# Build the app
npm run build

# Deploy with Netlify CLI
npx netlify-cli deploy --prod
```

### 7.3 Vercel Deployment

As the creators of Next.js, Vercel offers optimized deployments.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 7.4 Docker Deployment

For self-hosted or cloud environments.

#### Example Dockerfile:
```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

---

<a id="performance-optimization"></a>
## 8. Performance Optimization

### 8.1 Code Splitting

Next.js automatically code-splits your application by routes.

**Best Practices:**
- Use dynamic imports for large components
- Lazy load below-the-fold content

### 8.2 Image Optimization

Next.js provides an `Image` component for automatic image optimization.

#### Example:
```tsx
import Image from 'next/image';

function Avatar() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile picture"
      width={100}
      height={100}
      priority
    />
  );
}
```

### 8.3 Memoization

Use React's memoization features to prevent unnecessary re-renders.

#### Examples:
```tsx
// Memoize a component
const MemoizedComponent = memo(MyComponent);

// Memoize a value
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// Memoize a callback
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 8.4 Web Vitals Optimization

Focus on Core Web Vitals for better user experience:
- **LCP (Largest Contentful Paint)**: Speed of loading main content
- **FID (First Input Delay)**: Interactivity
- **CLS (Cumulative Layout Shift)**: Visual stability

**Optimization Techniques:**
- Minimize CSS and JavaScript
- Use proper image dimensions
- Implement lazy loading
- Avoid large DOM sizes
- Minimize third-party code

---

<a id="common-patterns"></a>
## 9. Common Patterns

### 9.1 Conditional Rendering

#### Examples from Our Project:
```tsx
// Conditional rendering with &&
{todos.length === 0 && (
  <div className="empty-state">
    <FaStar className="empty-icon" />
    <p>Your task list is empty</p>
  </div>
)}

// Conditional rendering with ternary operator
{todo.completed ? <FaCheck /> : <FaRegCircle />}
```

### 9.2 List Rendering

#### Example from Our Project:
```tsx
<ul className="todo-list">
  {todos.map(todo => (
    <li
      key={todo.id}
      className={todo.completed ? 'todo-complete' : ''}
    >
      {/* Item content */}
    </li>
  ))}
</ul>
```

### 9.3 Event Handling

#### Examples from Our Project:
```tsx
// Click handler
<button onClick={() => handleRemoveTodo(todo.id)}>
  <FaTrash />
</button>

// Input change handler
<input
  type="text"
  value={inputText}
  onChange={(e) => setInputText(e.target.value)}
/>

// Key press handler
<input
  onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
/>
```

### 9.4 Form Handling

#### Example Pattern:
```tsx
function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

<a id="advanced-techniques"></a>
## 10. Advanced Techniques

### 10.1 Custom Hooks

Custom hooks let you extract component logic into reusable functions.

#### Example Custom Hook:
```tsx
function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    // Add todo logic
  };

  const toggleTodo = (id: number) => {
    // Toggle todo logic
  };

  const removeTodo = (id: number) => {
    // Remove todo logic
  };

  return { todos, addTodo, toggleTodo, removeTodo };
}

// Usage
function TodoList() {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  // Component JSX
}
```

### 10.2 Error Boundaries

Error boundaries are React components that catch JavaScript errors in child components.

#### Example:
```tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### 10.3 Portals

React Portals let you render children into a DOM node outside the parent component's hierarchy.

#### Example:
```tsx
import { createPortal } from 'react-dom';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
```

### 10.4 Server Actions (Next.js 14+)

Server Actions allow defining server-side functionality directly in your components.

#### Example:
```tsx
'use server';

async function saveFormData(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  
  // Server-side logic (e.g., database operations)
  await db.users.create({ name, email });
  
  return { success: true };
}

// Client component usage
'use client';

function ContactForm() {
  return (
    <form action={saveFormData}>
      <input name="name" />
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Conclusion

This DeepWiki provides a comprehensive overview of React and Next.js concepts as implemented in our Todo List application. These best practices and patterns form the foundation of modern React development and can be applied to any React or Next.js project.

By understanding these concepts and techniques, you can build performant, maintainable, and scalable web applications with React and Next.js.
