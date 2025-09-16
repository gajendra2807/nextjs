import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <div className="background">
      {/* Animated gradient orbs */}
      <div className="background-orb orb1"></div>
      <div className="background-orb orb2"></div>
      <div className="background-orb orb3"></div>
      
      <TodoList />
    </div>
  );
}
