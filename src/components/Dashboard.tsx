
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { testAIConnection } from '../services/aiService';

export default function Dashboard() {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const handleTestAI = async () => {
    setTesting(true);
    const result = await testAIConnection();
    setTestResult(result);
    setTesting(false);
    setTimeout(() => setTestResult(null), 5000);
  };

  const stats = [
    { label: 'Total Employees', value: '142', change: '+12% this month', icon: Users, color: 'blue' },
    { label: 'Pending Agreements', value: '28', change: '8 high priority', icon: FileText, color: 'amber' },
    { label: 'WPS Compliance', value: '98.2%', change: 'Target: 100%', icon: CheckCircle2, color: 'emerald' },
    { label: 'Avg. Processing Time', value: '4.2m', change: '-1.5m vs last cycle', icon: Clock, color: 'indigo' },
  ];

  return (
    <div className="p-8 h-full flex flex-col space-y-8 overflow-y-auto">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <LayoutDashboard className="w-8 h-8 text-blue-600" />
          Executive Suite
        </h2>
        <p className="text-slate-500 font-medium">Real-time intelligence from your HR and PRO operations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-default"
          >
            <div className={`w-12 h-12 bg-${stat.color}-50 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 mb-1">{stat.value}</p>
            <p className={`text-[10px] font-bold text-${stat.color}-600`}>{stat.change}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <div className="xl:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Processing Efficiency</h3>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Yearly</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest underline">Monthly</span>
            </div>
          </div>
          <div className="h-64 flex items-end gap-2 px-10">
            {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((h, i) => (
              <div key={i} className="flex-1 bg-slate-50 relative group">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-all ${i === 11 ? 'bg-blue-600' : 'bg-slate-200 group-hover:bg-slate-300'}`}
                />
              </div>
            ))}
          </div>
          <button 
            onClick={handleTestAI}
            disabled={testing}
            className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
              testResult?.includes('Failed') 
                ? 'bg-rose-50 border-rose-200 text-rose-600' 
                : testResult 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Zap className={`w-3 h-3 ${testing ? 'animate-pulse' : ''}`} />
            {testing ? 'Testing...' : testResult || 'Test AI Core'}
          </button>
        </div>

        {/* AI Action Box */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between group shadow-xl shadow-blue-900/20">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-black mb-3 italic">Geometric AI Insights</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-slate-300">
                  <span className="font-bold text-white uppercase tracking-widest">WPS Gap Detected:</span> 12 employees in Al Safa branch are missing validated IBANs.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-slate-300">
                  <span className="font-bold text-white uppercase tracking-widest">Optimization Suggestion:</span> Batch agreement generation could save 4 hours this month.
                </p>
              </div>
            </div>
          </div>
          <button className="mt-8 bg-blue-600 text-white font-black py-4 rounded-full text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            Run AI Optimization
          </button>
          
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl group-hover:scale-125 transition-transform" />
        </div>
      </div>
    </div>
  );
}
