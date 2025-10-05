import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TaskForm({ addTask, close, editTask }) {
  const [title, setTitle] = useState(editTask ? editTask.title : '');
  const [desc, setDesc] = useState(editTask ? editTask.desc : '');

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDesc(editTask.desc);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask({ title: title.trim(), desc: desc.trim() });
    setTitle('');
    setDesc('');
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close}></div>
      <motion.form initial={{y:50, opacity:0}} animate={{y:0, opacity:1}} exit={{y:50, opacity:0}} onSubmit={handleSubmit} className="relative w-full md:w-2/3 bg-white rounded-t-2xl md:rounded-2xl p-6 md:p-8 shadow-2xl">
        <button type="button" onClick={close} className="absolute right-4 top-4 text-gray-500"><X/></button>
        <h2 className="text-xl font-semibold mb-4">Add new task</h2>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Task title" className="w-full mb-3 p-3 rounded-lg border border-gray-200" />
        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Notes (optional)" className="w-full mb-3 p-3 rounded-lg border border-gray-200" rows="4" />
        <div className="flex justify-end gap-3">
          <button type="button" onClick={close} className="py-2 px-4 rounded-lg bg-gray-100">Cancel</button>
          <button type="submit" className="py-2 px-4 rounded-lg bg-indigo-600 text-white">Save Task</button>
        </div>
      </motion.form>
    </div>
  );
}
