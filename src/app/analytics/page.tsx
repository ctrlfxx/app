import React from 'react';
import AppShell from '@/components/AppShell';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Award, 
  Activity,
  Instagram
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const PERFORMANCE_DATA = [
  { name: 'Week 1', organic: 4000, ads: 2400 },
  { name: 'Week 2', organic: 3000, ads: 1398 },
  { name: 'Week 3', organic: 2000, ads: 9800 },
  { name: 'Week 4', organic: 2780, ads: 3908 },
  { name: 'Week 5', organic: 1890, ads: 4800 },
  { name: 'Week 6', organic: 2390, ads: 3800 },
];

const VIRAL_WINNERS = [
  { 
    title: 'How to scale to $10k/mo', 
    retention: '68%', 
    views: '1.2M', 
    type: 'Organic', 
    metric: '+12% growth' 
  },
  { 
    title: 'The Secret of High-Ticket Sales', 
    retention: '54%', 
    views: '840K', 
    type: 'Ad', 
    metric: '4.2% CTR' 
  },
  { 
    title: 'Morning Routine for CEOs', 
    retention: '51%', 
    views: '2.1M', 
    type: 'Organic', 
    metric: '+25% shares' 
  },
];

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg">
            <Instagram size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Social Intelligence</h1>
            <p className="text-gray-400">Instagram Growth & Retention Analytics</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 glass-card text-sm font-medium text-gray-300">
            Last 30 Days
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Growth Comparison</h3>
            <div className="flex gap-4 text-xs font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span>Organic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-400" />
                <span>Ads</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_DATA}>
                <defs>
                  <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#161616', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="organic" stroke="#9333ea" fillOpacity={1} fill="url(#colorOrganic)" strokeWidth={3} />
                <Area type="monotone" dataKey="ads" stroke="#60a5fa" fillOpacity={1} fill="url(#colorAds)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center gap-2 mb-6">
            <Award size={20} className="text-yellow-500" />
            <h3 className="text-xl font-bold">Viral Winners</h3>
          </div>
          <p className="text-sm text-gray-400 mb-6">Videos with retention rate &gt; 50% to be replicated</p>
          
          <div className="space-y-4">
            {VIRAL_WINNERS.map((winner, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    winner.type === 'Organic' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {winner.type}
                  </span>
                  <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                    <TrendingUp size={12} />
                    {winner.metric}
                  </span>
                </div>
                <p className="text-sm font-bold mb-3 group-hover:text-[#9333ea] transition-colors">{winner.title}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Activity size={12} />
                    <span>Retention: <b className="text-gray-300">{winner.retention}</b></span>
                  </div>
                  <span className="text-xs font-bold text-gray-300">{winner.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
