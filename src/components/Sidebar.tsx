import { 
  LayoutDashboard, 
  Building2, 
  Wand2, 
  Users2, 
  Wallet, 
  UploadCloud, 
  Merge, 
  FileCheck, 
  Mail, 
  BarChart3, 
  LayoutTemplate, 
  Settings, 
  History,
  Workflow
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'company', label: 'Company Setup', icon: Building2 },
  { id: 'master-builder', label: 'AI Master Builder', icon: Wand2, badge: 'New' },
  { id: 'employees', label: 'Employees', icon: Users2 },
  { id: 'salary', label: 'Salary Management', icon: Wallet },
  { id: 'wps', label: 'WPS / MOHRE Upload', icon: UploadCloud },
  { id: 'matching', label: 'Matching Engine', icon: Merge },
  { id: 'agreements', label: 'Agreements', icon: FileCheck },
  { id: 'automation', label: 'Email Automation', icon: Mail },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
  { id: 'users', label: 'Users & Roles', icon: Workflow },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'activity', label: 'Activity Logs', icon: History },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white text-slate-600 flex flex-col h-screen fixed left-0 top-0 z-40 border-r border-slate-200">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
          H
        </div>
        <div>
          <h1 className="text-lg font-black text-slate-900 tracking-tight leading-none">HR-PRO <span className="text-blue-600 font-black">OS</span></h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">Geometric Builder</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 text-xs font-bold uppercase tracking-wider transition-all group relative ${
              activeTab === item.id 
                ? 'text-blue-600' 
                : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-blue-600' : 'text-slate-300 group-hover:text-blue-400'}`} />
            <span>{item.label}</span>
            {item.badge && (
              <span className="ml-auto bg-blue-50 text-blue-600 text-[9px] px-1.5 py-0.5 rounded uppercase font-black tracking-normal">
                {item.badge}
              </span>
            )}
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Company Instance</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
              <Building2 className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">Al Safa Cleaning</p>
              <p className="text-[10px] text-slate-400 truncate">Main Branch</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
