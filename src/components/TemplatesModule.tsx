import { 
  LayoutTemplate, 
  Plus, 
  Search, 
  FileBox, 
  MoreVertical,
  Zap,
  Globe
} from 'lucide-react';

export default function TemplatesModule() {
  const templates = [
    { title: 'Standard UAE Logistics', fields: 24, used: 12, industry: 'Logistics' },
    { title: 'Facility Management OS', fields: 18, used: 5, industry: 'Cleaning' },
    { title: 'Construction Labor Master', fields: 32, used: 8, industry: 'Construction' },
  ];

  return (
    <div className="p-8 h-full flex flex-col space-y-8 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <LayoutTemplate className="w-8 h-8 text-blue-600" />
            Blueprint Library
          </h2>
          <p className="text-slate-500 font-medium">Reusable organizational structures and global data schemas.</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-3">
          <Plus className="w-4 h-4" /> New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((t, i) => (
          <div key={i} className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm group hover:shadow-xl hover:shadow-slate-200/50 transition-all relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100">
                     <FileBox className="w-6 h-6 text-blue-600" />
                  </div>
                  <MoreVertical className="w-5 h-5 text-slate-300 cursor-pointer" />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1 tracking-tight">{t.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">{t.industry}</p>
                <div className="flex items-center gap-6">
                   <div>
                      <p className="text-sm font-black text-slate-900">{t.fields}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Fields</p>
                   </div>
                   <div className="w-px h-6 bg-slate-100" />
                   <div>
                      <p className="text-sm font-black text-slate-900">{t.used}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Instances</p>
                   </div>
                </div>
             </div>
             <button className="mt-8 w-full py-3 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                Apply Template
             </button>
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[4rem] -mr-12 -mt-12 transition-transform group-hover:scale-110" />
          </div>
        ))}

        <div className="bg-slate-950 rounded-[2.5rem] border border-slate-800 p-8 flex flex-col justify-center items-center text-center group shadow-2xl shadow-blue-900/20 relative overflow-hidden">
           <Globe className="w-16 h-16 text-blue-600 mb-6 group-hover:scale-110 transition-transform" />
           <h4 className="text-xl font-black text-white italic mb-2 tracking-tight">Global Market</h4>
           <p className="text-slate-400 text-xs leading-relaxed max-w-[200px] font-medium">
             Download community-verified schemas from the HR-PRO global repository.
           </p>
           <button className="mt-8 flex items-center gap-2 text-blue-400 font-black text-[10px] uppercase tracking-widest hover:text-white transition-colors">
              Enter Marketplace <Zap className="w-3 h-3 fill-blue-400" />
           </button>
        </div>
      </div>
    </div>
  );
}
