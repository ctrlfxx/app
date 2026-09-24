"use client";

import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Search, 
  Zap, 
  AlertCircle,
  User,
  Plus,
  Minus
} from 'lucide-react';

const INITIAL_EDITORS = [
  { id: '1', name: 'Sarah K.', email: 'sarah@editflow.pro', capacity: 8, max: 10, specialty: 'Short-form Ads' },
  { id: '2', name: 'Mike J.', email: 'mike@editflow.pro', capacity: 10, max: 10, specialty: 'Organic Entertainment' },
  { id: '3', name: 'Dave L.', email: 'dave@editflow.pro', capacity: 4, max: 10, specialty: 'Cinematic Vlogs' },
  { id: '4', name: 'Elena R.', email: 'elena@editflow.pro', capacity: 6, max: 10, specialty: 'Educational Content' },
];

const getBandwidthColor = (cap, max) => {
  const ratio = cap / max;
  if (ratio >= 0.9) return 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
  if (ratio >= 0.6) return 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]';
  return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]';
};

export default function EditorManager() {
  const [editors, setEditors] = useState(INITIAL_EDITORS);

  const adjustCapacity = (id, amount) => {
    setEditors(prev => prev.map(editor => {
      if (editor.id === id) {
        const newCap = Math.max(0, Math.min(editor.max, editor.capacity + amount));
        return { ...editor, capacity: newCap };
      }
      return editor;
    }));
  };

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Talent Manager</h1>
          <p className="text-gray-400">Monitor editor bandwidth and resource allocation</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserPlus size={20} />
          Onboard Editor
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.03]">
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-400 font-bold">Editor</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-400 font-bold">Specialty</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-400 font-bold">Bandwidth Control</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-400 font-bold">Status</th>
                <th className="px-6 py-4 text-xs uppercase tracking-wider text-gray-400 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {editors.map((editor) => (
                  <motion.tr 
                    key={editor.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold border border-white/10">
                          {editor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{editor.name}</p>
                          <p className="text-xs text-gray-500">{editor.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">{editor.specialty}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => adjustCapacity(editor.id, -1)}
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <div className="w-12 text-center font-mono text-xs font-bold">
                            {editor.capacity}
                          </div>
                          <button 
                            onClick={() => adjustCapacity(editor.id, 1)}
                            className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div 
                            initial={false}
                            animate={{ width: `${(editor.capacity / editor.max) * 100}%` }}
                            className={`h-full transition-all duration-500 ${getBandwidthColor(editor.capacity, editor.max)}`} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getBandwidthColor(editor.capacity, editor.max)}`} />
                        <span className="text-xs text-gray-400">
                          {editor.capacity / editor.max >= 0.9 ? 'Full' : editor.capacity / editor.max >= 0.6 ? 'Busy' : 'Available'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        disabled={editor.capacity >= editor.max}
                        className={`text-xs font-bold transition-all duration-200 ${
                          editor.capacity >= editor.max 
                            ? 'text-gray-600 cursor-not-allowed' 
                            : 'text-[#9333ea] hover:underline opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        {editor.capacity >= editor.max ? 'Capacity Full' : 'Assign Project →'}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
