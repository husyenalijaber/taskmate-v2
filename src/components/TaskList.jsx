import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Trash2, Edit3 } from 'lucide-react';

export default function TaskList({ tasks = [], onToggle, onDelete, onEdit, onUpdate }) {
  return (
    <div>
      <AnimatePresence>
        {tasks.length === 0 ? (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center py-12 text-indigo-100/80">
            No tasks yet — add your first task ✨
          </motion.div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {tasks.map(task => (
              <motion.div key={task.id} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:8}} layout className={`flex items-start justify-between p-4 rounded-xl ${task.completed ? 'bg-gradient-to-r from-emerald-600/40 to-emerald-500/30' : 'bg-white/4'} border border-white/6`}>
                <div className="flex items-start gap-3">
                  <button onClick={()=>onToggle(task.id)} className={`mt-1 p-1 rounded-md ${task.completed ? 'bg-emerald-600/30' : 'bg-white/6'}`}>
                    <CheckCircle2 />
                  </button>
                  <div>
                    <h3 className={`font-semibold ${task.completed ? 'line-through text-indigo-200/70' : 'text-white'}`}>{task.title}</h3>
                    {task.desc && <p className="text-sm text-indigo-100/70 mt-1">{task.desc}</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>onEdit?.(task)} className="p-2 rounded-md hover:bg-white/6"><Edit3/></button>
                  <button onClick={()=>onDelete(task.id)} className="p-2 rounded-md hover:bg-red-600/20 text-red-400"><Trash2/></button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
