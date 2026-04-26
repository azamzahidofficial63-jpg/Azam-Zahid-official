import { 
  Mail, 
  Send, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Zap,
  BarChart2
} from 'lucide-react';
import { motion } from 'motion/react';

export default function EmailAutomation() {
  const automations = [
    { title: 'Salary Slip Delivery', trigger: 'WPS Sync Complete', status: 'Active', sent: 1240 },
    { title: 'Agreement Renewal Alert', trigger: 'Expiry - 30 Days', status: 'Active', sent: 85 },
    { title: 'Onboarding Welcome', trigger: 'New Registration', status: 'Paused', sent: 412 },
  ];

  return (
    <div className="p-8 h-full flex flex-col space-y-8 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Mail className="w-8 h-8 text-blue-600" />
            Neural Communications
          </h2>
          <p className="text-slate-500 font-medium">Automate workforce engagement and compliance notifications through AI.</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-3">
          <Zap className="w-4 h-4" /> New Automation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col h-full">
           <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <BarChart2 className="w-6 h-6 text-blue-600" />
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Deliveries</p>
           <p className="text-2xl font-black text-slate-900 mb-4">12,842</p>
           <div className="mt-auto pt-6 border-t border-slate-50">
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                 <CheckCircle2 className="w-3 h-3" /> 99.8% Reach Score
              </span>
           </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col h-full">
           <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
              <Send className="w-6 h-6 text-emerald-600" />
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Queued Transmissions</p>
           <p className="text-2xl font-black text-slate-900 mb-4">42</p>
           <div className="mt-auto pt-6 border-t border-slate-50">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                 <Clock className="w-3 h-3" /> Next batch in 14m
              </span>
           </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl shadow-blue-900/20 text-white relative overflow-hidden">
           <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                 <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black italic mb-2 tracking-tight">AI Writer Core</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed mb-6 font-medium">
                Our AI automatically drafts context-aware emails for legal alerts and employee milestones.
              </p>
              <button className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors">
                 Customize Voice
              </button>
           </div>
           <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex-1">
         <div className="p-8 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Automation Pipelines</h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="bg-slate-50/50">
                  <tr>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Trigger Event</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Total Sent</th>
                     <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Control</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {automations.map((a, i) => (
                     <tr key={i} className="hover:bg-blue-50/10 transition-colors group">
                        <td className="px-8 py-6">
                           <p className="text-sm font-bold text-slate-900 leading-none mb-1">{a.title}</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">{a.trigger}</p>
                        </td>
                        <td className="px-8 py-6">
                           <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest outline outline-1 ${a.status === 'Active' ? 'bg-emerald-50 text-emerald-600 outline-emerald-100' : 'bg-slate-50 text-slate-400 outline-slate-100'}`}>
                              {a.status}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-center tabular-nums text-sm font-bold text-slate-600">{a.sent}</td>
                        <td className="px-8 py-6 text-right">
                           <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Edit Logic</button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
