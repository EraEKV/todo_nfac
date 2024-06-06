'use client';
import TaskList from './components/TaskList'; // обновите путь в зависимости от вашей структуры

export default function Home() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold cursor-pointer">TODO</h1>
      </div>
      <TaskList />
    </div>
  );
}
