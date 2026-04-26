import { FileText, Download, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

interface AgreementsModuleProps {
  employees: any[];
}

export default function AgreementsModule({ employees }: AgreementsModuleProps) {
  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <FileText className="w-8 h-8 text-blue-600" />
          Employment Agreements
        </h2>
        <p className="text-slate-500 font-medium">Generate and track legal contracts for your workforce based on master data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Signed Agreements</p>
          <p className="text-2xl font-black text-slate-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pending Signature</p>
          <p className="text-2xl font-black text-slate-900">{employees.length}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
            <Download className="w-6 h-6" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Ready for Export</p>
          <p className="text-2xl font-black text-slate-900">{employees.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <h3 className="font-black text-xs uppercase tracking-widest text-slate-400">Personnel Status</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Employee Name</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {employees.length > 0 ? employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-blue-50/10 transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-900">{emp[Object.keys(emp)[1]] || 'Unknown'}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {emp.id}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest outline outline-1 outline-amber-100">
                      Signature Pending
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                        <Eye className="w-4 h-4" /> Preview
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                        Generate
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="p-20 text-center text-slate-300 font-bold">No employees registered in master database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
