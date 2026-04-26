import { useState, useRef } from 'react';
import { FieldDefinition } from '../types';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  MoreHorizontal, 
  UserPlus,
  FileSpreadsheet,
  ChevronRight,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Papa from 'papaparse';

interface WorkforceMasterProps {
  fields: FieldDefinition[];
  employees: any[];
  onUpdateEmployees: (employees: any[]) => void;
}

export default function WorkforceMaster({ fields, employees, onUpdateEmployees }: WorkforceMasterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Record<string, any>>({});
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<null | 'success' | 'error'>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddEmployee = () => {
    const updatedEmployees = [...employees, { ...newEmployee, id: Date.now().toString() }];
    onUpdateEmployees(updatedEmployees);
    setNewEmployee({});
    setIsAddModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setImportStatus(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const newData = results.data as any[];
        
        // Basic mapping: match headers to field names
        const formattedData = newData.map(row => {
          const emp: Record<string, any> = { id: Math.random().toString(36).substr(2, 9) };
          fields.forEach(field => {
            // Try exact match or case-insensitive match
            const sourceKey = Object.keys(row).find(k => 
              k.toLowerCase() === field.name.toLowerCase()
            );
            if (sourceKey) {
              emp[field.name] = row[sourceKey];
            }
          });
          return emp;
        });

        const updatedEmployees = [...employees, ...formattedData];
        onUpdateEmployees(updatedEmployees);
        
        setImporting(false);
        setImportStatus('success');
        setTimeout(() => setImportStatus(null), 3000);
        
        if (fileInputRef.current) fileInputRef.current.value = '';
      },
      error: () => {
        setImporting(false);
        setImportStatus('error');
        setTimeout(() => setImportStatus(null), 3000);
      }
    });
  };

  const filteredEmployees = employees.filter(emp => 
    Object.values(emp).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-8 h-full flex flex-col">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
        accept=".csv" 
        className="hidden" 
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Workforce Master
          </h2>
          <p className="text-slate-500 font-medium">Manage your team and their profile data based on your custom structure.</p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={importing}
            className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shadow-sm border ${
              importStatus === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-600' 
                : importStatus === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {importing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : importStatus === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : importStatus === 'error' ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {importing ? 'Importing...' : importStatus === 'success' ? 'Imported' : importStatus === 'error' ? 'Failed' : 'Bulk Import'}
          </button>
          
          <button className="bg-white border border-slate-200 px-5 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
            <Download className="w-4 h-4" /> Export
          </button>
          
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
          >
            <Plus className="w-5 h-5" /> Add Employee
          </button>
        </div>
      </div>

      {/* Stats Table Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Workforce', value: employees.length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Personnel', value: employees.length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'On Leave', value: 0, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Missing Fields', value: 0, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Controls Area */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name, ID or any field..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all border border-slate-100">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all border border-slate-100">
            <FileSpreadsheet className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="flex-1 overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-slate-50/50 sticky top-0 z-10">
              <tr>
                {fields.map(field => (
                  <th key={field.id} className="px-6 py-5 text-[10px] uppercase tracking-widest font-black text-slate-400 border-b border-slate-100">
                    {field.name}
                  </th>
                ))}
                <th className="px-6 py-5 text-right text-[10px] uppercase tracking-widest font-black text-slate-400 border-b border-slate-100">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredEmployees.length > 0 ? filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-blue-50/10 transition-colors group">
                  {fields.map(field => (
                    <td key={field.id} className="px-6 py-5">
                      <span className="text-sm font-bold text-slate-700">{emp[field.name] || '-'}</span>
                    </td>
                  ))}
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={fields.length + 1} className="p-20 text-center">
                    <div className="max-w-xs mx-auto">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-slate-200" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1">No employees found</h4>
                      <p className="text-sm text-slate-400 mb-6 font-medium">Start building your database by adding your first workforce member.</p>
                      <button 
                        onClick={() => setIsAddModalOpen(true)}
                        className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 justify-center mx-auto"
                      >
                        Add Employee <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Employee Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Add New Employee</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Personnel Registration</p>
                  </div>
                </div>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto grid grid-cols-2 gap-6">
                {fields.map(field => (
                  <div key={field.id} className="space-y-2">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">{field.name}</label>
                    {field.type === 'dropdown' ? (
                      <select 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all outline-none appearance-none"
                        onChange={(e) => setNewEmployee(prev => ({ ...prev, [field.name]: e.target.value }))}
                      >
                        <option value="">Select Option</option>
                        {field.options?.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input 
                        type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                        placeholder={`Enter ${field.name}`}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all outline-none"
                        onChange={(e) => setNewEmployee(prev => ({ ...prev, [field.name]: e.target.value }))}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-end gap-4">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-3 font-black text-slate-400 uppercase tracking-widest text-xs hover:text-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddEmployee}
                  className="bg-blue-600 text-white px-10 py-3.5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
                >
                  Register Employee
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
