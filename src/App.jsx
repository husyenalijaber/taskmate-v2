import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks_v2');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks(prev => [...prev, { id: Date.now(), title: task.title, desc: task.desc, completed: false }]);
  };

  const updateTask = (id, patch) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-800 flex items-center justify-center p-6">
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6 text-white">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">TaskMate <span className="text-indigo-300">v2.0</span></h1>
            <p className="text-sm text-indigo-200/80">A polished, animated to-do app — AI-assisted during development.</p>
          </div>
          <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 rounded-lg shadow-lg">
            <Plus size={16}/> New Task
          </button>
        </div>

        <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <TaskList tasks={tasks} onToggle={(id) => {
                updateTask(id, { completed: !tasks.find(t=>t.id===id)?.completed });
              }} onEdit={(t)=>{ setShowForm(true); /* form will accept edit via props */ }} onDelete={deleteTask} onUpdate={updateTask} />
            </div>
            <div className="hidden md:block">
              <div className="p-4 bg-white/4 rounded-xl border border-white/6">
                <h3 className="text-white font-semibold mb-2">Stats</h3>
                <p className="text-sm text-indigo-100/80">Total tasks: <span className="font-bold">{tasks.length}</span></p>
                <p className="text-sm text-indigo-100/80">Completed: <span className="font-bold">{tasks.filter(t=>t.completed).length}</span></p>
              </div>
            </div>
          </div>
        </div>

        {showForm && (
          <TaskForm
            close={() => setShowForm(false)}
            addTask={addTask}
          />
        )}

        <p className="mt-6 text-center text-sm text-indigo-100/70">Built with ❤️ — AI (IBM Granite) used in development only.</p>
      </motion.div>
    </div>
  );
}
