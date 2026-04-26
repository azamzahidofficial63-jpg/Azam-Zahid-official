import { 
  Users, 
  Shield, 
  Key, 
  MoreHorizontal, 
  Plus, 
  Search,
  CheckCircle2,
  Workflow
} from 'lucide-react';

export default function UsersRoles() {
  const members = [
    { name: 'Azam Zahid', email: 'azam.admin@smartwps.ai', role: 'Super Admin', status: 'Active' },
    { name: 'Sarah Miller', email: 's.miller@hr.alsafa.ae', role: 'HR Manager', status: 'Active' },
    { name: 'John Doe', email: 'j.doe@compliance.pro', role: 'PRO Agent', status: 'Inactive' },
  ];

  return (
    <div className="p-8 h-full flex flex-col space-y-8 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Workflow className="w-8 h-8 text-blue-600" />
            Governance & Roles
          </h2>
          <p className="text-slate-500 font-medium">Manage access vectors and define organizational permissions.</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-3">
          <Plus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
           <div className="relative z-10">
              <Shield className="w-10 h-10 text-blue-600 mb-6" />
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-[11px] mb-2">Role Architecture</h4>
              <p className="text-[10px] text-slate-400 font-medium mb-6">Define customized permission matrices for different departments.</p>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Manage matrices</button>
           </div>
           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
           <div className="relative z-10">
              <Key className="w-10 h-10 text-emerald-500 mb-6" />
              <h4 className="font-black text-slate-900 uppercase tracking-widest text-[11px] mb-2">Auth Protocols</h4>
              <p className="text-[10px] text-slate-400 font-medium mb-6">MFA coverage and biometric session validation settings.</p>
              <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">View protocols</button>
           </div>
           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-50 rounded-full blur-2xl group-hover:scale-110 transition-transform" />
        </div>

        <div className="bg-slate-900 p-8 rounded-[2rem] text-white overflow-hidden relative group">
           <div className="relative z-10">
              <Users className="w-10 h-10 text-blue-500 mb-6" />
              <h4 className="font-black uppercase tracking-widest text-[11px] mb-2">Active Sessions</h4>
              <p className="text-[10px] text-slate-400 font-medium mb-6 italic">12 members are currently processing organizational data in the UAE region.</p>
              <button className="text-[10px] font-black text-white hover:text-blue-400 uppercase tracking-widest transition-colors">Audit trail</button>
           </div>
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl group-hover:scale-110 transition-transform" />
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
            <input type="text" placeholder="Filter by email or role..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-3 text-xs font-bold focus:ring-4 focus:ring-blue-600/5 transition-all outline-none" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F4F7F9]">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Institutional Member</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Governance Role</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {members.map((m, i) => (
                <tr key={i} className="hover:bg-blue-50/10 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-400">
                        {m.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-none mb-1">{m.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 italic bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{m.role}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${m.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300'}`} />
                       <span className={`text-[10px] font-black uppercase tracking-widest ${m.status === 'Active' ? 'text-slate-900' : 'text-slate-400'}`}>{m.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-xl text-slate-300 hover:text-slate-900 transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
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
