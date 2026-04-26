import { 
  Terminal, 
  Search, 
  History, 
  MapPin, 
  Clock, 
  Monitor,
  Layout
} from 'lucide-react';

export default function ActivityLogs() {
  const events = [
    { time: '14:24 PM', event: 'SIF Extraction Initiated', user: 'Azam Zahid', location: 'Dubai HQ', ip: '192.168.1.1' },
    { time: '12:02 PM', event: 'Master Schema Modified', user: 'Sarah Miller', location: 'Remote (UK)', ip: '82.12.44.1' },
    { time: '09:45 AM', event: 'Employee #1043 Registered', user: 'PRO Bot (AI)', location: 'Cloud Engine', ip: 'internal' },
    { time: '09:30 AM', event: 'System Start: Version 2.4', user: 'System', location: 'AWS Middle-East', ip: '0.0.0.0' },
  ];

  return (
    <div className="p-8 h-full flex flex-col space-y-8 overflow-y-auto">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <History className="w-8 h-8 text-blue-600" />
          Event Horizon
        </h2>
        <p className="text-slate-500 font-medium">Immutable record of every atomic transaction within the institutional OS.</p>
      </div>

      <div className="bg-slate-950 rounded-[2.5rem] border border-slate-800 shadow-2xl p-4 overflow-hidden flex flex-col flex-1">
        <div className="p-4 border-b border-white/5 flex items-center gap-6 justify-between">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                <Terminal className="w-5 h-5 text-emerald-400" />
             </div>
             <p className="text-[11px] font-black text-white uppercase tracking-widest">Real-time Stream [LIVE]</p>
           </div>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/20" />
              <input type="text" placeholder="Filter stream..." className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-[10px] font-bold text-white outline-none focus:border-blue-500 transition-all w-48" />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide py-4 px-2 space-y-2 font-mono">
           {events.map((e, i) => (
             <div key={i} className="flex gap-6 p-4 hover:bg-white/5 rounded-2xl transition-all cursor-default border border-transparent hover:border-white/5 group">
                <div className="w-16 shrink-0 pt-1">
                  <span className="text-[10px] font-black text-blue-500 select-none">[{e.time}]</span>
                </div>
                <div className="flex-1 space-y-1">
                   <p className="text-[12px] font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                     {e.event} <span className="text-white/20 ml-2 font-medium">/ authorized by {e.user}</span>
                   </p>
                   <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-widest text-white/30">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {e.location}</span>
                      <span className="flex items-center gap-1.5"><Monitor className="w-3 h-3" /> {e.ip}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Latency: 42ms</span>
                   </div>
                </div>
                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Layout className="w-4 h-4 text-emerald-500/50" />
                </div>
             </div>
           ))}
           <div className="p-4 pt-10 text-[10px] text-emerald-500/30 flex items-center gap-3 select-none">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              STREAMING DATA FROM CLOUD INSTANCE AZ-UAE-N1...
           </div>
        </div>
      </div>
    </div>
  );
}
