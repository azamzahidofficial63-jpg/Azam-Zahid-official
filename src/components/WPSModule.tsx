import { Landmark, DollarSign, ArrowUpRight, TrendingUp, History } from 'lucide-react';

interface WPSModuleProps {
  employees: any[];
}

export default function WPSModule({ employees }: WPSModuleProps) {
  return (
    <div className="p-8 h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <Landmark className="w-8 h-8 text-blue-600" />
          WPS & Payroll
        </h2>
        <p className="text-slate-500 font-medium">Compliance-ready salary tracking and SIF file generation for the UAE banking system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-900 p-6 rounded-[2rem] text-white">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Payroll</p>
          <p className="text-2xl font-black">AED 0.00</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Paid this month</p>
          <p className="text-2xl font-black text-emerald-600">0</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
            <History className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Pending WPS</p>
          <p className="text-2xl font-black text-amber-600">{employees.length}</p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Next Cycle</p>
          <p className="text-2xl font-black text-blue-600">05 May</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-black text-sm uppercase tracking-widest">Salary Disbursement Registry</h3>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            Generate SIF File
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Employee Name</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Basic Salary</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Allowance</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Net</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {employees.length > 0 ? employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-blue-50/10 transition-colors">
                  <td className="px-8 py-6">
                    <p className="text-sm font-bold text-slate-900">{emp[Object.keys(emp)[1]] || 'Unknown'}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">LABOR ID: {emp['Labor ID'] || 'N/A'}</p>
                  </td>
                  <td className="px-8 py-6 font-bold text-slate-600">0.00</td>
                  <td className="px-8 py-6 font-bold text-slate-600">0.00</td>
                  <td className="px-8 py-6 font-black text-slate-900 italic">AED 0.00</td>
                  <td className="px-8 py-6 text-right">
                    <span className="bg-slate-100 text-slate-400 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                      Unpaid
                    </span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="p-20 text-center text-slate-300 font-bold">No workforce data available for payroll processing.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
