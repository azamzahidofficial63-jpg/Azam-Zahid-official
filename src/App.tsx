import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MasterBuilderWizard from './components/MasterBuilderWizard';
import WorkforceMaster from './components/WorkforceMaster';
import AgreementsModule from './components/AgreementsModule';
import WPSModule from './components/WPSModule';
import Dashboard from './components/Dashboard';
import CompanySetup from './components/CompanySetup';
import Reports from './components/Reports';
import MatchingEngine from './components/MatchingEngine';
import SettingsModule from './components/SettingsModule';
import UsersRoles from './components/UsersRoles';
import ActivityLogs from './components/ActivityLogs';
import TemplatesModule from './components/TemplatesModule';
import EmailAutomation from './components/EmailAutomation';
import { FieldDefinition } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [masterFields, setMasterFields] = useState<FieldDefinition[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);

  // Load from localStorage if available
  useEffect(() => {
    const savedFields = localStorage.getItem('masterFields');
    const savedEmployees = localStorage.getItem('employees');
    if (savedFields) setMasterFields(JSON.parse(savedFields));
    if (savedEmployees) setEmployees(JSON.parse(savedEmployees));
  }, []);

  const handleUpdateEmployees = (newEmployees: any[]) => {
    setEmployees(newEmployees);
    localStorage.setItem('employees', JSON.stringify(newEmployees));
  };

  const handleSaveFields = (fields: FieldDefinition[]) => {
    setMasterFields(fields);
    localStorage.setItem('masterFields', JSON.stringify(fields));
    setActiveTab('employees'); // Switch to employees after saving
  };

  return (
    <div className="flex bg-[#F4F7F9] min-h-screen font-sans">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto relative scrollbar-hide">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'company' && <CompanySetup />}
          {activeTab === 'master-builder' && (
            <MasterBuilderWizard onSave={handleSaveFields} initialFields={masterFields} />
          )}
          {activeTab === 'employees' && (
            <WorkforceMaster fields={masterFields} employees={employees} onUpdateEmployees={handleUpdateEmployees} />
          )}
          {activeTab === 'agreements' && <AgreementsModule employees={employees} />}
          {activeTab === 'salary' && <WPSModule employees={employees} />}
          {activeTab === 'wps' && <WPSModule employees={employees} />}
          {activeTab === 'matching' && <MatchingEngine />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'templates' && <TemplatesModule />}
          {activeTab === 'users' && <UsersRoles />}
          {activeTab === 'settings' && <SettingsModule />}
          {activeTab === 'activity' && <ActivityLogs />}
          {activeTab === 'automation' && <EmailAutomation />}

          {/* Fallback */}
          {!['dashboard', 'company', 'master-builder', 'employees', 'agreements', 'salary', 'wps', 'matching', 'reports', 'templates', 'users', 'settings', 'activity', 'automation'].includes(activeTab) && (
            <div className="flex items-center justify-center h-full text-slate-400">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-200 border-dashed">
                  <span className="text-2xl font-bold">🛠️</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Module Active</h3>
                <p className="text-sm">This section is part of the SmartWPS core OS.</p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="mt-6 text-blue-600 font-black uppercase tracking-widest text-[10px] hover:underline"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
