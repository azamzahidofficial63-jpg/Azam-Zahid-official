import { 
  Merge, 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Database
} from 'lucide-react';
import { motion } from 'motion/react';

export default function MatchingEngine() {
  const matches = [
    { source: 'WPS_SIF_MAY.csv', target: 'Workforce_Master', score: '100%', status: 'matched' },
    { source: 'Bank_Statement_01.pdf', target: 'Salary_Registry', score: '94%', status: 'partial' },
    { source: 'MOHRE_Registration.xlsx', target: 'Employee_Data', score: '--', status: 'pending' },
  ];

  return (
    <div className="p-8 h-full flex flex-col space-y-8 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Merge className="w-8 h-8 text-blue-600" />
            Neural Matching Engine
          </h2>
          <p className="text-slate-500 font-medium">Coordinate disparate data sources into a unified organizational truth.</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-3">
          <RefreshCw className="w-4 h-4" /> Start Global Sync
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input type="text" placeholder="Search sync history..." className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-5 py-3 text-xs font-bold focus:ring-4 focus:ring-blue-600/5 outline-none transition-all" />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl text-[10px] font-black text-emerald-600 border border-emerald-100 uppercase tracking-widest">
              <CheckCircle2 className="w-3 h-3" /> Ready to Sync
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F4F7F9]">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Data Source (Extraction)</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Target Entity</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Match Probability</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Action Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {matches.map((match, i) => (
                <tr key={i} className="hover:bg-blue-50/10 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center">
                        <Database className="w-4 h-4 text-slate-400" />
                      </div>
                      <span className="text-sm font-bold text-slate-800">{match.source}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                      <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{match.target}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className="w-24 h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: match.score === '--' ? '0%' : match.score }}
                            className={`h-full ${match.status === 'matched' ? 'bg-emerald-500' : 'bg-amber-400'} rounded-full`}
                          />
                       </div>
                       <span className="text-[10px] font-black text-slate-400">{match.score}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {match.status === 'matched' ? (
                        <div className="text-emerald-500 font-black text-[9px] uppercase tracking-widest flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3" /> Fully Synced
                        </div>
                      ) : match.status === 'partial' ? (
                        <div className="text-amber-500 font-black text-[9px] uppercase tracking-widest flex items-center gap-1.5 underline cursor-pointer">
                          <AlertCircle className="w-3 h-3" /> Manual Resolve
                        </div>
                      ) : (
                        <div className="text-slate-300 font-black text-[9px] uppercase tracking-widest flex items-center gap-1.5 italic">
                          <RefreshCw className="w-3 h-3 animate-spin" /> Queued
                        </div>
                      )}
                    </div>
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
