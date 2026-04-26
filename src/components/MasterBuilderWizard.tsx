import { useState, useEffect } from 'react';
import { 
  Wand2, 
  Plus, 
  Trash2, 
  GripVertical, 
  Save, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileSpreadsheet,
  Settings2,
  Building2,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FieldDefinition, FieldType } from '../types';
import { suggestMasterFields, suggestMissingFields } from '../services/aiService';

const STEPS = [
  { id: 1, label: 'Business Information', description: 'Tell us about your business' },
  { id: 2, label: 'AI Suggestions', description: 'AI suggests relevant fields' },
  { id: 3, label: 'Customize Fields', description: 'Edit and arrange fields' },
  { id: 4, label: 'Save & Use', description: 'Apply to your system' }
];

const FIELD_TYPES: { id: FieldType, label: string, color: string }[] = [
  { id: 'text', label: 'Text', color: 'bg-blue-50 text-blue-700' },
  { id: 'number', label: 'Number', color: 'bg-emerald-50 text-emerald-700' },
  { id: 'date', label: 'Date', color: 'bg-amber-50 text-amber-700' },
  { id: 'dropdown', label: 'Dropdown', color: 'bg-blue-50 text-blue-700' },
  { id: 'file', label: 'File Upload', color: 'bg-indigo-50 text-indigo-700' },
  { id: 'boolean', label: 'Yes / No', color: 'bg-pink-50 text-pink-700' },
  { id: 'email', label: 'Email', color: 'bg-sky-50 text-sky-700' },
  { id: 'phone', label: 'Phone', color: 'bg-rose-50 text-rose-700' }
];

interface MasterBuilderWizardProps {
  onSave?: (fields: FieldDefinition[]) => void;
  initialFields?: FieldDefinition[];
}

export default function MasterBuilderWizard({ onSave, initialFields }: MasterBuilderWizardProps) {
  const [currentStep, setCurrentStep] = useState(initialFields?.length ? 3 : 1);
  const [businessType, setBusinessType] = useState('');
  const [companyName, setCompanyName] = useState('Al Safa Delivery LLC');
  const [mainActivity, setMainActivity] = useState('Food / Parcel Delivery');
  const [fields, setFields] = useState<FieldDefinition[]>(initialFields?.length ? initialFields : []);
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const handleGenerateFields = async () => {
    setLoading(true);
    try {
      const suggested = await suggestMasterFields(businessType || mainActivity);
      const formatted = suggested.map((f, i) => ({
        ...f,
        id: Math.random().toString(36).substring(7),
        order: i,
        required: f.required ?? false
      })) as FieldDefinition[];
      setFields(formatted);
      setCurrentStep(3); // Skip step 2 for better UX in "Auto-generate" mode
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addField = () => {
    const newField: FieldDefinition = {
      id: Math.random().toString(36).substring(7),
      name: 'New Field',
      type: 'text',
      required: false,
      order: fields.length
    };
    setFields([...fields, newField]);
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<FieldDefinition>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  return (
    <div className="flex-1 p-8 bg-slate-50 min-h-screen overflow-y-auto">
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            <Wand2 className="w-3 h-3" />
            AI Custom Master Builder
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Create your own master data structure</h2>
          <p className="text-slate-500 font-medium mt-1">Each company is unique. Let AI help you build a perfect data model for your business.</p>
        </div>
        
        <div className="bg-white p-5 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-6 max-w-md">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Sparkles className="text-blue-600 w-6 h-6" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
              <CheckCircle2 className="w-3 h-3" />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-black text-slate-900 mb-1 uppercase tracking-wider">Hi Admin! 👋</p>
            <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
              I have created a master structure based on your business type. 
              You can customize it as per your requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-200 mb-10 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[800px]">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex items-center flex-1 last:flex-none group">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all ${
                  currentStep >= step.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'bg-slate-50 text-slate-300'
                }`}>
                  {currentStep > step.id ? <CheckCircle2 className="w-6 h-6" /> : `0${step.id}`}
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${currentStep >= step.id ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{step.description}</p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 bg-slate-50 mx-8 group-hover:bg-blue-50 transition-colors"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left/Main Column - Builder */}
        <div className="xl:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100"
              >
                <div className="max-w-xl mx-auto">
                  <div className="flex items-center gap-5 mb-10">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-[1.25rem] flex items-center justify-center shadow-inner">
                      <Building2 className="w-7 h-7" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 font-black block mb-1">Step 01: Business Intelligence</label>
                      <h3 className="text-2xl font-black text-slate-900">Define Business Type</h3>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Workforce Industry</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={businessType}
                          onChange={(e) => setBusinessType(e.target.value)}
                          placeholder="e.g. Delivery & Logistics, Construction..."
                          className="w-full bg-slate-50 border border-slate-200 rounded-[1.25rem] px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all outline-none"
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300">
                          <Wand2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Workforce Description</label>
                      <textarea 
                        value={mainActivity}
                        onChange={(e) => setMainActivity(e.target.value)}
                        placeholder="Define what your workforce primarily does on a daily basis..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-[1.25rem] px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all outline-none h-32 resize-none"
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-100 p-5 rounded-[1.5rem] flex items-start gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-blue-900 mb-1 uppercase tracking-wider">AI Strategy Engine</p>
                        <p className="text-[11px] text-blue-700/80 leading-relaxed font-medium">
                          Try to be specific about your workforce type (e.g. "On-site masons" vs just "workers") for more accurate field suggestions.
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={handleGenerateFields}
                      disabled={!businessType || loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-blue-200 transition-all flex items-center justify-center gap-3 group text-sm uppercase tracking-widest"
                    >
                      {loading ? 'AI IS OPTIMIZING...' : 'GENERATE MASTER'}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/30 border border-slate-100 overflow-hidden"
              >
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Customize Your Master Fields</h3>
                    <button className="text-[9px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg flex items-center gap-1.5 uppercase tracking-widest hover:bg-emerald-100 transition-colors">
                      <Sparkles className="w-3 h-3" /> AI Active
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                      <Settings2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50/50 text-[10px] uppercase tracking-widest font-black text-slate-400">
                      <tr>
                        <th className="px-8 py-5 w-12"></th>
                        <th className="px-8 py-5">Field Label</th>
                        <th className="px-8 py-5">Data Type</th>
                        <th className="px-8 py-5 text-center">Validation</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {fields.map((field) => (
                        <tr key={field.id} className="hover:bg-blue-50/10 transition-colors group">
                          <td className="px-8 py-6">
                            <GripVertical className="w-4 h-4 text-slate-200 cursor-move group-hover:text-slate-400 transition-colors" />
                          </td>
                          <td className="px-8 py-6">
                            <input 
                              type="text" 
                              value={field.name}
                              onChange={(e) => updateField(field.id, { name: e.target.value })}
                              className="bg-transparent border-none focus:ring-0 font-bold text-slate-700 w-full placeholder:text-slate-200"
                            />
                          </td>
                          <td className="px-8 py-6">
                            <select 
                              value={field.type}
                              onChange={(e) => updateField(field.id, { type: e.target.value as FieldType })}
                              className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-[11px] font-bold uppercase tracking-wider focus:ring-4 focus:ring-blue-600/5 focus:bg-white appearance-none cursor-pointer"
                            >
                              {FIELD_TYPES.map(t => (
                                <option key={t.id} value={t.id}>{t.label.toUpperCase()}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <div className="flex justify-center items-center gap-3">
                              <span className={`text-[9px] font-black uppercase tracking-widest ${field.required ? 'text-blue-600' : 'text-slate-300'}`}>
                                {field.required ? 'Mandatory' : 'Optional'}
                              </span>
                              <button 
                                onClick={() => updateField(field.id, { required: !field.required })}
                                className={`w-9 h-5 rounded-full transition-all relative ${field.required ? 'bg-blue-600' : 'bg-slate-200'}`}
                              >
                                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${field.required ? 'left-4.5' : 'left-0.5'}`} />
                              </button>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-slate-400 transition-all">
                                <Plus className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => removeField(field.id)}
                                className="p-2 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-lg text-slate-400 transition-all"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-8 bg-slate-50/50 border-t border-slate-50">
                  <button 
                    onClick={addField}
                    className="w-full border-2 border-dashed border-slate-200 text-slate-400 py-4 rounded-[1.5rem] hover:border-blue-400 hover:text-blue-600 hover:bg-white transition-all flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest bg-white/50"
                  >
                    <Plus className="w-5 h-5" /> Add Custom Field
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Helper Footers */}
          {currentStep === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/20 border border-slate-100 flex items-start gap-5">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                  <Wand2 className="text-blue-600 w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-[11px] mb-2 uppercase tracking-widest">Logic Justification</h4>
                  <ul className="text-xs text-slate-500 space-y-3 font-medium">
                    <li className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                      Based on your business type "{businessType}" these fields are critical for operational efficiency.
                    </li>
                    <li className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                      These fields ensure 100% compliance with WPS tracking and dynamic document generation.
                    </li>
                  </ul>
                </div>
              </div>

               <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/20 border border-slate-100">
                <h4 className="font-black text-slate-900 text-[11px] mb-4 uppercase tracking-widest">Intelligence Recommendations</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 hover:bg-blue-50/50 rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-blue-100">
                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shadow-sm">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <p className="text-[11px] text-slate-600 font-bold flex-1">Consider adding <span className="text-blue-600 underline">Bank / IBAN</span> for salary payments automation.</p>
                    <Plus className="w-4 h-4 text-slate-200 group-hover:text-blue-600" />
                  </div>
                  <div className="flex items-center gap-4 p-3 hover:bg-blue-50/50 rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-blue-100">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <p className="text-[11px] text-slate-600 font-bold flex-1">Add Phone Number for instant PRO alerts via WhatsApp.</p>
                    <Plus className="w-4 h-4 text-slate-200 group-hover:text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Live Preview */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/30 border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">Master Preview</h3>
              <button className="text-[10px] font-black text-blue-600 flex items-center gap-1.5 hover:underline uppercase tracking-widest">
                <Eye className="w-3.5 h-3.5" /> Full Screen
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-50 rounded-2xl bg-slate-50/30">
              <table className="w-full text-left border-collapse text-[10px]">
                <thead className="bg-[#F4F7F9]">
                  <tr>
                    {fields.length > 0 ? fields.slice(0, 4).map(f => (
                      <th key={f.id} className="px-5 py-4 font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">{f.name}</th>
                    )) : (
                      <>
                        <th className="px-5 py-4 font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Field 01</th>
                        <th className="px-5 py-4 font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Field 02</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map(row => (
                    <tr key={row} className="border-t border-slate-50/50 hover:bg-white transition-colors">
                      {fields.length > 0 ? fields.slice(0, 4).map((f, i) => (
                        <td key={f.id} className="px-5 py-4 text-slate-600 font-bold whitespace-nowrap">
                          {i === 0 ? `ID-${1000 + row}` : i === 1 ? `Employee ${row}` : i === 2 ? (f.type === 'date' ? '2024-01-01' : 'Sample') : '...'}
                        </td>
                      )) : (
                        <>
                          <td className="px-5 py-4 text-slate-300 italic">No fields</td>
                          <td className="px-5 py-4 text-slate-300 italic">No fields</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {fields.length === 0 && (
                <div className="p-16 text-center">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5 border-2 border-dashed border-slate-100 shadow-sm">
                    <Plus className="w-6 h-6 text-slate-200" />
                  </div>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Waiting for structure...</p>
                </div>
              )}
            </div>
            <p className="mt-6 text-[10px] font-bold text-slate-400 italic">Geometric balance ensures readability across thousands of employee records.</p>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20 group">
            <div className="relative z-10 transition-transform group-hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
                <FileSpreadsheet className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-2xl font-black mb-3 tracking-tight">Auto-Mapping Ready</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-10 font-medium">
                Our neural mapping engine will now match "Rider Name" to "Full Name" automatically during bulk Excel uploads.
              </p>
              <button className="w-full bg-white text-slate-900 font-black py-4 rounded-full hover:bg-blue-50 transition-all flex items-center justify-center gap-3 shadow-lg text-xs uppercase tracking-widest">
                VIEW ENGINE DOCS <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            {/* Geometric accents */}
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl" />
            <div className="absolute top-10 left-10 w-2 h-2 bg-blue-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Persistence Controls */}
      <div className="fixed bottom-0 left-64 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 p-6 flex items-center justify-between px-16 z-20">
        <button 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-widest text-[11px] hover:text-slate-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        
        <div className="flex items-center gap-5">
          <button className="text-slate-400 font-black uppercase tracking-widest text-[11px] px-6 py-2 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">Save as Template</button>
          <button className="bg-slate-50 text-slate-500 font-black uppercase tracking-widest text-[11px] px-8 py-3.5 rounded-full hover:bg-slate-100 transition-all border border-slate-100">Discard Changes</button>
          <button 
            onClick={() => {
              if(currentStep === 1) handleGenerateFields();
              else if(onSave) onSave(fields);
            }}
            className="bg-blue-600 text-white font-black uppercase tracking-widest text-[11px] px-12 py-3.5 rounded-full shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-3 leading-none"
          >
            {currentStep === 1 ? 'Start AI Generator' : 'Lock Master Structure'} <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
