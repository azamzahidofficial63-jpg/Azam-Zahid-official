import { Search, Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { auth } from '../lib/firebase';

export default function Header() {
  const user = auth.currentUser;

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 sticky top-0 z-30 shrink-0">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search documents, entities, or commands..." 
            className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-600/10 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <span className="text-blue-600">Builder</span>
          <span className="hover:text-slate-900 cursor-pointer">Payroll</span>
          <span className="hover:text-slate-900 cursor-pointer">Portal</span>
        </nav>

        <div className="h-4 w-px bg-slate-200"></div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
          </button>
          
          <button className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
            <img 
              src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'admin'}`} 
              alt="User" 
              className="w-8 h-8 rounded-xl border border-slate-100 bg-white"
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-black text-slate-900 leading-none mb-0.5">{user?.displayName || 'Admin'}</p>
              <p className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter">Super Admin</p>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
