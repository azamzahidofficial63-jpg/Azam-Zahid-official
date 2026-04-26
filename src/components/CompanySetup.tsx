import { 
  Building2, 
  MapPin, 
  Globe, 
  Languages, 
  ShieldCheck, 
  Save,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export default function CompanySetup() {
  return (
    <div className="p-8 h-full flex flex-col space-y-8 overflow-y-auto">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <Building2 className="w-8 h-8 text-blue-600" />
          Institutional Profile
        </h2>
        <p className="text-slate-500 font-medium">Configure your core organizational identity and legal metadata.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Company Name (License)</label>
                <input type="text" defaultValue="Al Safa Cleaning Services LLC" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 focus:bg-white outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Establishment ID</label>
                <input type="text" defaultValue="700/123/456" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 focus:bg-white outline-none transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Industry Classification</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 focus:bg-white outline-none transition-all appearance-none cursor-pointer">
                  <option>Facilities Management</option>
                  <option>Logistics & Transport</option>
                  <option>Technical Services</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Website</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input type="text" defaultValue="www.alsafa-cs.ae" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 focus:bg-white outline-none transition-all" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Regional Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Primary Language</label>
                <div className="flex gap-4">
                  <span className="bg-blue-600/10 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold border border-blue-600/20">English</span>
                  <span className="bg-slate-50 text-slate-400 px-4 py-2 rounded-xl text-xs font-bold border border-slate-100 hover:bg-slate-100 cursor-pointer">Arabic</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Currency Unit</label>
                <span className="text-sm font-black text-slate-900 block pt-1">AED (United Arab Emirates Dirham)</span>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Physical Headquarters</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-slate-300" />
                  <textarea defaultValue="Suite 404, Al Safa Business Tower, Sheikh Zayed Road, Dubai, UAE" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-5 py-3.5 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 focus:bg-white outline-none transition-all h-24 resize-none" />
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-200/50">
            <ShieldCheck className="w-12 h-12 mb-6" />
            <h4 className="text-xl font-black mb-2 italic">Entity Validation</h4>
            <p className="text-blue-100 text-[11px] leading-relaxed mb-8 opacity-80">
              Your company profile is <span className="text-white font-black underline">95% complete</span>. Finalizing the establishment ID will unlock advanced MOHRE automation.
            </p>
            <button className="w-full bg-white text-blue-600 font-black py-4 rounded-full text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Commit Profile
            </button>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
            <h4 className="font-black text-[11px] text-slate-900 uppercase tracking-widest mb-6">Verification Checklist</h4>
            <div className="space-y-4">
              {[
                { label: 'Trade License Upload', done: true },
                { label: 'Procuration Documented', done: true },
                { label: 'WPS MOA Linked', done: false },
                { label: 'Tax Registration (TRN)', done: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${item.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200 text-transparent'}`}>
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span className={`text-[11px] font-bold ${item.done ? 'text-slate-600' : 'text-slate-400 underline decoration-slate-200 select-none'}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
