import { 
  Settings, 
  Shield, 
  Bell, 
  Palette, 
  Cloud, 
  Save,
  Database,
  Lock
} from 'lucide-react';

export default function SettingsModule() {
  return (
    <div className="p-8 h-full flex flex-col space-y-8 overflow-y-auto">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <Settings className="w-8 h-8 text-blue-600" />
          System Preferences
        </h2>
        <p className="text-slate-500 font-medium">Control institutional behavior and administrative security parameters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          {[
            { id: 'general', label: 'Institutional Bio', icon: Settings, active: true },
            { id: 'security', label: 'Vault & Access', icon: Shield, active: false },
            { id: 'notifications', label: 'Neural Alerts', icon: Bell, active: false },
            { id: 'appearance', label: 'Visual Genome', icon: Palette, active: false },
            { id: 'api', label: 'Cloud Endpoints', icon: Cloud, active: false },
          ].map((tab, i) => (
            <button key={i} className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${tab.active ? 'bg-white shadow-xl shadow-slate-200/50 text-blue-600 border border-slate-100' : 'text-slate-400 hover:text-slate-900'}`}>
              <tab.icon className={`w-4 h-4 ${tab.active ? 'text-blue-600' : 'text-slate-300'}`} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                <Database className="w-4 h-4 text-blue-600" />
              </div>
              Autonomous Storage Settings
            </h3>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[1.5rem] border border-slate-100">
                <div>
                  <p className="text-xs font-black text-slate-900 mb-1 uppercase tracking-widest">Dynamic Master Syncing</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Real-time schema balancing with AI suggestions.</p>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full relative p-1 cursor-pointer">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>

              <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[1.5rem] border border-slate-100">
                <div>
                  <p className="text-xs font-black text-slate-900 mb-1 uppercase tracking-widest">Force Encryption (UAE Standard)</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Encrypt PII fields using industry-standard AES-256.</p>
                </div>
                <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                   <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                </div>
              </div>

              <div className="pt-8 border-t border-slate-50 flex justify-end gap-4">
                <button className="px-8 py-3 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">Reset to Defaults</button>
                <button className="px-10 py-3.5 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Configuration
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex items-center gap-8 relative overflow-hidden group">
            <div className="w-20 h-20 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <Lock className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-black mb-1 italic tracking-tight underline decoration-blue-600 decoration-2">Vault Integration</h4>
              <p className="text-slate-400 text-[11px] leading-relaxed font-medium">
                Connect your institutional hardware security module (HSM) for supreme-tier digital signature protection.
              </p>
            </div>
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
