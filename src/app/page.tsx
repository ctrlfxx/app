import React from 'react';
import AppShell from '@/components/AppShell';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const KPI_DATA = [
  { label: 'Active Projects', value: '24', icon: Video, color: '#9333ea' },
  { label: 'Monthly Revenue', value: '$12,400', icon: DollarSign, color: '#10b981' },
  { label: 'Avg Turnaround', value: '42h', icon: Clock, color: '#f59e0b' },
  { label: 'Client Satisfaction', value: '98%', icon: CheckCircle, color: '#3b82f6' },
];

const RECENT_TASKS = [
  { client: 'Alex Hormozi', type: 'Ad', editor: 'Sarah K.', deadline: '2h left', priority: 'Critical' },
  { client: 'MrBeast', type: 'Organic', editor: 'Mike J.', deadline: '5h left', priority: 'High' },
  { client: 'Iman Gadzhi', type: 'Organic', editor: 'Sarah K.', deadline: '12h left', priority: 'Medium' },
  { client: 'Ali Abdaal', type: 'Ad', editor: 'Dave L.', deadline: '1d left', priority: 'Medium' },
  { client: 'Diary of a CEO', type: 'Organic', editor: 'Mike J.', deadline: '2d left', priority: 'Low' },
];

const Video = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/>
  </svg>
);

export default function Dashboard() {
  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {KPI_DATA.map((kpi, i) => (
          <div key={i} className="glass-card p-6 flex items-center gap-4 relative overflow-hidden group">
            <div className="p-3 rounded-2xl bg-white/5 text-white group-hover:scale-110 transition-transform">
              <kpi.icon size={24} style={{ color: kpi.color }} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">{kpi.label}</p>
              <p className="text-2xl font-bold">{kpi.value}</p>
            </div>
            <div 
              className="absolute bottom-0 right-0 w-24 h-24 opacity-10 blur-3xl rounded-full" 
              style={{ backgroundColor: kpi.color }}
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Goal Engine */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Monthly Goal Engine</h3>
              <p className="text-gray-400 text-sm">Tracking "Videos Produced" for September</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-[#9333ea]">32/50</span>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Completion</p>
            </div>
          </div>
          
          <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden mb-4">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 to-[#9333ea] transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(147,51,234,0.6)]" 
              style={{ width: '64%' }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>Start: 0</span>
            <span>Target: 50 Videos</span>
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle size={20} className="text-red-500" />
            <h3 className="text-lg font-bold">Urgent Deadlines</h3>
          </div>
          <div className="space-y-4">
            {RECENT_TASKS.map((task, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors cursor-pointer group">
                <div>
                  <p className="font-semibold text-sm group-hover:text-[#9333ea] transition-colors">{task.client}</p>
                  <p className="text-xs text-gray-500">{task.type} • {task.editor}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-red-400">{task.deadline}</p>
                  <p className="text-[10px] uppercase text-gray-600">{task.priority}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
