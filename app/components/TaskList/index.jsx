import React, { useEffect, useState } from 'react';
import TaskItem from '../TaskItem';

// const initialTasks = [{ id: 1, text: "Todo Test", completed: false }];
const initialTasks = []

const TaskList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  // const storedTasks = localStorage.getItem('tasks');
  // const parsedTasks = storedTasks ? JSON.parse(storedTasks) : [];
  // setTasks(parsedTasks);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    
    if(storedTasks) setTasks(storedTasks);
  }, []);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


  // useEffect(() => {
  //   setTasks(localStorage.getItem('tasks'));
  // }, [localStorage.getItem('tasks')]);


  const handleAddTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask = {
      id: tasks.length + 1,
      text: newTaskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter(task => !task.completed);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
  });

  const uncompletedTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <ul>
        {filteredTasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={handleToggleTask} 
            onDelete={handleDeleteTask} 
          />
        ))}
      </ul>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
        <span>{uncompletedTasksCount} items left</span>
        <div>
          <button onClick={() => handleFilterChange('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
          <button onClick={() => handleFilterChange('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
          <button onClick={() => handleFilterChange('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
        </div>
        <button
          onClick={clearCompletedTasks}
          className="text-gray-400 hover:text-white"
        >
          Clear Completed
        </button>
      </div>
    </>
  );
};

export default TaskList;
