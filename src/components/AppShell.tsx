import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Video, 
  BarChart3, 
  Settings,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

const SidebarItem = ({ icon: Icon, label, href, active = false }) => (
  <Link 
    href={href} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-[#9333ea] text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]' 
        : 'text-gray-400 hover:bg-[#161616] hover:text-white'
    }`}
  >
    <Icon size={20} className={`${active ? 'text-white' : 'group-hover:text-white'}`} />
    <span className="font-medium">{label}</span>
  </Link>
);

export default function AppShell({ children }) {
  return (
    <div className="flex h-screen bg-background text-white overflow-hidden">
      {/* Slim Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-[#0f0f0f] flex flex-col p-4 gap-8">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-8 h-8 bg-[#9333ea] rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(147,51,234,0.5)]">
            <Video size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">EditFlow <span className="text-[#9333ea]">Pro</span></span>
        </div>

        <nav className="flex flex-col gap-2">
          <SidebarItem icon={LayoutDashboard} label="Command Center" href="/" active />
          <SidebarItem icon={Users} label="Client CRM" href="/clients" />
          <SidebarItem icon={Video} label="Pipeline" href="/pipeline" />
          <SidebarItem icon={BarChart3} label="Analytics" href="/analytics" />
          <SidebarItem icon={Settings} label="Settings" href="/settings" />
        </nav>

        <div className="mt-auto p-4 bg-[#161616] bg-opacity-60 backdrop-blur-md border border-white/10 rounded-2xl">
          <p className="text-xs text-gray-500 mb-2">System Status</p>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-300">All systems active</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 sticky top-0 bg-[#0f0f0f]/80 backdrop-blur-md z-10">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
              Sept 24, 2026
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9333ea] to-purple-400 border border-white/20" />
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
