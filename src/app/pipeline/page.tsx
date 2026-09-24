import React, { useState } from 'react';
import AppShell from '@/components/AppShell';
import { 
  MoreHorizontal, 
  GripVertical, 
  CheckCircle2, 
  AlertCircle, 
  Clock,
  Filter,
  Search
} from 'lucide-react';

const COLUMNS = [
  { id: 'raw', title: 'Raw Footage', color: 'bg-gray-500' },
  { id: 'first-cut', title: 'First Cut', color: 'bg-blue-500' },
  { id: 'internal-review', title: 'Internal Review', color: 'bg-yellow-500' },
  { id: 'client-approved', title: 'Client Approved', color: 'bg-green-500' },
  { id: 'scheduled', title: 'Scheduled', color: 'bg-purple-500' },
];

const MOCK_PROJECTS = [
  { 
    id: 'p1', 
    title: 'Hormozi Acquisition Hook', 
    client: 'Alex Hormozi', 
    type: 'Ad', 
    status: 'raw', 
    editor: 'Sarah K.', 
    priority: 'Critical',
    qc: { audio: false, caption: false, hook: false }
  },
  { 
    id: 'p2', 
    title: 'MrBeast Extreme Challenge', 
    client: 'MrBeast', 
    type: 'Organic', 
    status: 'first-cut', 
    editor: 'Mike J.', 
    priority: 'High',
    qc: { audio: true, caption: false, hook: false }
  },
  { 
    id: 'p3', 
    title: 'Lifestyle Vibe Reel', 
    client: 'Iman Gadzhi', 
    type: 'Organic', 
    status: 'internal-review', 
    editor: 'Sarah K.', 
    priority: 'Medium',
    qc: { audio: true, caption: true, hook: false }
  },
  { 
    id: 'p4', 
    title: 'Productivity Hack Ad', 
    client: 'Ali Abdaal', 
    type: 'Ad', 
    status: 'client-approved', 
    editor: 'Dave L.', 
    priority: 'Low',
    qc: { audio: true, caption: true, hook: true }
  },
  { 
    id: 'p5', 
    title: 'CEO Morning Routine', 
    client: 'Diary of a CEO', 
    type: 'Organic', 
    status: 'scheduled', 
    editor: 'Mike J.', 
    priority: 'Medium',
    qc: { audio: true, caption: true, hook: true }
  },
];

const ProjectCard = ({ project }) => {
  const isAd = project.type === 'Ad';
  
  return (
    <div className="glass-card p-4 mb-4 group hover:border-white/30 transition-all cursor-grab active:cursor-grabbing relative">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isAd ? 'bg-blue-400' : 'bg-purple-500'}`} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            {project.type}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical size={14} className="text-gray-600" />
          <MoreHorizontal size={14} className="text-gray-600" />
        </div>
      </div>

      <h4 className="font-bold text-sm mb-1 group-hover:text-[#9333ea] transition-colors">
        {project.title}
      </h4>
      <p className="text-xs text-gray-500 mb-4">{project.client}</p>

      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex -space-x-2">
          <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-bold">
            {project.editor.charAt(0)}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {project.status === 'internal-review' && (
            <div className="flex gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${project.qc.audio ? 'bg-green-500' : 'bg-gray-600'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${project.qc.caption ? 'bg-green-500' : 'bg-gray-600'}`} />
              <div className={`w-1.5 h-1.5 rounded-full ${project.qc.hook ? 'bg-green-500' : 'bg-gray-600'}`} />
            </div>
          )}
          <span className={`text-[10px] font-bold ${
            project.priority === 'Critical' ? 'text-red-400' : 'text-gray-500'
          }`}>
            {project.priority}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function PipelineBoard() {
  const [projects] = useState(MOCK_PROJECTS);

  return (
    <AppShell>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Content Pipeline</h1>
          <p className="text-gray-400">Manage production flow from raw to scheduled</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Filter pipeline..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#9333ea] transition-all"
            />
          </div>
          <button className="glass-card px-4 py-2 flex items-center gap-2 text-sm font-medium hover:bg-white/10 transition-colors">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
        {COLUMNS.map((col) => (
          <div key={col.id} className="flex-shrink-0 w-80 snap-start">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${col.color}`} />
                <h3 className="font-bold text-sm uppercase tracking-widest text-gray-300">
                  {col.title}
                </h3>
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-500 font-mono">
                  {projects.filter(p => p.status === col.id).length}
                </span>
              </div>
              <button className="text-gray-500 hover:text-white transition-colors">
                <Plus size={16} />
              </button>
            </div>

            <div className="min-h-[calc(100vh-250px)] bg-white/[0.02] rounded-2xl p-2 border border-white/5">
              {projects
                .filter(p => p.status === col.id)
                .map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))
              }
              {projects.filter(p => p.status === col.id).length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-20">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-500 mb-2 flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <p className="text-xs font-medium">No projects in this stage</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}

// Helper component for the plus icon since I used it in the JSX
function Plus({ size = 20, className = "" }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
