import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Reports() {
  const reports = [
    { title: 'Personnel Growth', value: '142', detail: '+8 vs last month', trend: 'up' },
    { title: 'Salary Expenditure', value: 'AED 412k', detail: '-2% operational savings', trend: 'down' },
    { title: 'Turnover Rate', value: '2.4%', detail: 'Industry Avg: 4.1%', trend: 'down' },
    { title: 'Compliance Score', value: '100%', detail: 'Metric: Full SIF Match', trend: 'up' },
  ];

  return (
    <div className="p-8 h-full flex flex-col space-y-8 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            Analytics & Reports
          </h2>
          <p className="text-slate-500 font-medium">Deep-dive into organizational metrics and behavioral trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-slate-200 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Jan 2024 - Dec 2024
          </button>
          <button className="bg-blue-600 text-white px-8 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{report.title}</p>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-2xl font-black text-slate-900">{report.value}</span>
              <div className={`flex items-center gap-0.5 text-[10px] font-bold mb-1 ${report.trend === 'up' ? 'text-emerald-500' : 'text-blue-500'}`}>
                {report.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {report.detail.split(' ')[0]}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">{report.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-[11px]">Workforce Distribution</h3>
            <Layers className="w-4 h-4 text-slate-300" />
          </div>
          <div className="space-y-6">
            {[
              { label: 'Technical Operations', value: 45, color: 'bg-blue-600' },
              { label: 'Logistics & Fleet', value: 35, color: 'bg-indigo-500' },
              { label: 'Facilities Management', value: 15, color: 'bg-emerald-500' },
              { label: 'Administrative', value: 5, color: 'bg-amber-400' },
            ].map((d, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-600">{d.label}</span>
                  <span className="text-slate-900">{d.value}%</span>
                </div>
                <div className="h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${d.value}%` }}
                    className={`h-full ${d.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-black italic tracking-tight">Predictive Modelling</h4>
                <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Beta Engine v1.2</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-auto italic">
              "Based on current trends, your operational cost could decrease by <span className="text-white font-bold decoration-blue-600 underline">8.4%</span> by utilizing automated WPS matching systems in the next quarter."
            </p>
            <button className="mt-10 w-full bg-white text-slate-950 font-black py-4 rounded-full text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl shadow-white/5">
              Generate PDF Forecast
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
