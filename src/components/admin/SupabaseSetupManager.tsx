import React, { useState, useEffect } from 'react';
import { 
  Database, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Copy, 
  ExternalLink, 
  Key, 
  Server, 
  ShieldCheck, 
  AlertTriangle,
  UploadCloud,
  DownloadCloud,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { 
  SUPABASE_PROJECT_ID, 
  SUPABASE_REGION, 
  DEFAULT_SUPABASE_URL, 
  getSupabaseConfig, 
  saveSupabaseConfig, 
  testSupabaseConnection, 
  getSupabaseSqlMigration,
  syncMembersToSupabase,
  syncLeadsToSupabase,
  syncCoachesToSupabase,
  syncEquipmentToSupabase,
  fetchMembersFromSupabase,
  fetchLeadsFromSupabase,
  fetchCoachesFromSupabase,
  fetchEquipmentFromSupabase
} from '../../lib/supabase';
import { useGym } from '../../context/GymContext';

export const SupabaseSetupManager: React.FC = () => {
  const { 
    members, 
    leads, 
    setMembers, 
    setLeads, 
    coaches, 
    setCoaches, 
    equipment, 
    setEquipment 
  } = useGym();
  
  const [config, setConfig] = useState(getSupabaseConfig());
  const [anonKeyInput, setAnonKeyInput] = useState(config.anonKey);
  const [showKey, setShowKey] = useState(false);
  
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  
  const [syncingPush, setSyncingPush] = useState(false);
  const [syncingPull, setSyncingPull] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  
  const [copiedSql, setCopiedSql] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    // Run an initial quick health check on mount if key is available
    if (config.isConfigured) {
      testSupabaseConnection().then((res) => {
        setTestResult({ success: res.success, message: res.message });
      });
    }
  }, [config.isConfigured]);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(anonKeyInput);
    const updated = getSupabaseConfig();
    setConfig(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);

    // Immediately test connection
    if (updated.isConfigured) {
      setTesting(true);
      testSupabaseConnection().then((res) => {
        setTesting(false);
        setTestResult({ success: res.success, message: res.message });
      });
    } else {
      setTestResult(null);
    }
  };

  const handleTestPing = async () => {
    setTesting(true);
    setTestResult(null);
    const res = await testSupabaseConnection();
    setTesting(false);
    setTestResult({ success: res.success, message: res.message });
  };

  const handleCopySql = () => {
    const sql = getSupabaseSqlMigration();
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handlePushData = async () => {
    setSyncingPush(true);
    setSyncMessage(null);
    try {
      const membersOk = await syncMembersToSupabase(members);
      const leadsOk = await syncLeadsToSupabase(leads);
      const coachesOk = await syncCoachesToSupabase(coaches);
      const equipmentOk = await syncEquipmentToSupabase(equipment);

      if (membersOk && leadsOk) {
        setSyncMessage(`Successfully pushed ${members.length} members, ${leads.length} leads, ${coaches.length} coaches, and ${equipment.length} equipment items to Supabase!`);
      } else {
        setSyncMessage('Partial push. Please ensure tables exist in Supabase via the SQL Editor.');
      }
    } catch (err: any) {
      setSyncMessage(`Push error: ${err.message || 'Failed to sync'}`);
    } finally {
      setSyncingPush(false);
    }
  };

  const handlePullData = async () => {
    setSyncingPull(true);
    setSyncMessage(null);
    try {
      const fetchedMembers = await fetchMembersFromSupabase();
      const fetchedLeads = await fetchLeadsFromSupabase();
      const fetchedCoaches = await fetchCoachesFromSupabase();
      const fetchedEquipment = await fetchEquipmentFromSupabase();

      let msg = '';
      if (fetchedMembers && fetchedMembers.length > 0) {
        setMembers(fetchedMembers);
        msg += `Fetched ${fetchedMembers.length} members. `;
      }
      if (fetchedLeads && fetchedLeads.length > 0) {
        setLeads(fetchedLeads);
        msg += `Fetched ${fetchedLeads.length} leads. `;
      }
      if (fetchedCoaches && fetchedCoaches.length > 0) {
        setCoaches(fetchedCoaches);
        msg += `Fetched ${fetchedCoaches.length} coaches. `;
      }
      if (fetchedEquipment && fetchedEquipment.length > 0) {
        setEquipment(fetchedEquipment);
        msg += `Fetched ${fetchedEquipment.length} equipment. `;
      }

      if (!msg) {
        msg = 'No remote records found yet, or tables are not created.';
      }
      setSyncMessage(msg);
    } catch (err: any) {
      setSyncMessage(`Pull error: ${err.message || 'Failed to fetch'}`);
    } finally {
      setSyncingPull(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner: Supabase Project Details */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#131b14] via-[#111111] to-[#161616] border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.25)] shrink-0">
              <Database className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  PostgreSQL Cloud Backend
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active Setup
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white mt-0.5">
                Supabase <span className="text-emerald-400">Database Engine</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                Integrated real-time database for Old Gym Munshiganj members, leads, attendance, and revenue transactions.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-neutral-200 hover:text-white border border-neutral-700/80 transition-all cursor-pointer shadow-md"
            >
              <span>Supabase Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </a>

            <button
              onClick={handleTestPing}
              disabled={testing || !config.isConfigured}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-xs font-bold text-black uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-emerald-900/30 active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
              <span>{testing ? 'Testing...' : 'Test Connection'}</span>
            </button>
          </div>
        </div>

        {/* Project Metadata Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6 pt-6 border-t border-neutral-800/80">
          <div className="p-3.5 rounded-xl bg-black/60 border border-neutral-800/80">
            <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1.5">
              <Server className="w-3 h-3 text-emerald-400" />
              Project ID
            </span>
            <span className="text-sm font-mono font-bold text-white block mt-1">
              {SUPABASE_PROJECT_ID}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-neutral-800/80">
            <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Database Engine
            </span>
            <span className="text-sm font-mono font-bold text-white block mt-1">
              PostgreSQL (Supabase Cloud)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-black/60 border border-neutral-800/80">
            <span className="text-[10px] font-mono uppercase text-neutral-400 flex items-center gap-1.5">
              <Key className="w-3 h-3 text-emerald-400" />
              REST API URL
            </span>
            <span className="text-xs font-mono text-neutral-300 block mt-1 truncate" title={DEFAULT_SUPABASE_URL}>
              {DEFAULT_SUPABASE_URL}
            </span>
          </div>
        </div>

        {/* Live Test Status Banner */}
        {testResult && (
          <div className={`mt-4 p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
            testResult.success 
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' 
              : 'bg-rose-950/60 border-rose-800 text-rose-300'
          }`}>
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span className="font-medium">{testResult.message}</span>
          </div>
        )}
      </div>

      {/* Grid: Credentials & Sync Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: API Key Configuration */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-[#121212] border border-neutral-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold uppercase text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-400" />
                <span>Supabase Anon Public Key</span>
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                config.isConfigured 
                  ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                  : 'bg-amber-950 text-amber-400 border-amber-800'
              }`}>
                {config.isConfigured ? 'Key Configured' : 'Key Required'}
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Your Supabase <code className="text-neutral-200 font-mono">anon public</code> key is safe for client-side web apps protected by Row Level Security (RLS). You can find it in your{' '}
              <a 
                href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/settings/api`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 underline hover:text-emerald-300"
              >
                Supabase Project Settings → API
              </a>.
            </p>

            <form onSubmit={handleSaveKey} className="space-y-4">
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={anonKeyInput}
                  onChange={(e) => setAnonKeyInput(e.target.value)}
                  placeholder="Paste eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-3 p-1 text-neutral-400 hover:text-white"
                  title={showKey ? 'Hide key' : 'Show key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-500 font-mono">
                  Saved locally in browser storage
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider cursor-pointer transition-all active:scale-95 shadow-md shadow-emerald-950"
                >
                  {savedSuccess ? 'Saved ✓' : 'Save & Connect'}
                </button>
              </div>
            </form>
          </div>

          {/* Data Sync & Replication Box */}
          <div className="p-6 rounded-3xl bg-[#121212] border border-neutral-800 shadow-xl space-y-4">
            <h3 className="font-heading text-lg font-bold uppercase text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#D4AF37]" />
              <span>Data Sync & Replication</span>
            </h3>
            
            <p className="text-xs text-neutral-400 leading-relaxed">
              Synchronize your local gym records (Members: <strong className="text-white font-mono">{members.length}</strong>, Leads: <strong className="text-white font-mono">{leads.length}</strong>, Coaches: <strong className="text-white font-mono">{coaches.length}</strong>, Equipment: <strong className="text-white font-mono">{equipment.length}</strong>) with your live Supabase cloud database.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handlePushData}
                disabled={syncingPush || !config.isConfigured}
                className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 border border-neutral-800 hover:border-emerald-500/50 flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer group"
              >
                <UploadCloud className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-neutral-200">
                  {syncingPush ? 'Pushing...' : 'Push to Supabase'}
                </span>
                <span className="text-[10px] text-neutral-500">
                  Upload all records
                </span>
              </button>

              <button
                type="button"
                onClick={handlePullData}
                disabled={syncingPull || !config.isConfigured}
                className="p-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 border border-neutral-800 hover:border-amber-500/50 flex flex-col items-center justify-center gap-2 text-center transition-all cursor-pointer group"
              >
                <DownloadCloud className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-neutral-200">
                  {syncingPull ? 'Pulling...' : 'Pull from Supabase'}
                </span>
                <span className="text-[10px] text-neutral-500">
                  Download cloud records
                </span>
              </button>
            </div>

            {syncMessage && (
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-mono">
                {syncMessage}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: SQL Migration Runner */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-3xl bg-[#121212] border border-neutral-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold uppercase text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>Complete SQL Migration (xxjtlymnnlazljjelpdp)</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Defines <code className="text-emerald-400">members</code>, <code className="text-emerald-400">leads</code>, <code className="text-emerald-400">transactions</code>, <code className="text-emerald-400">coaches</code>, and <code className="text-emerald-400">equipment</code> with UUID PKs, Row Level Security, and CRUD policies.
                </p>
              </div>

              <button
                onClick={handleCopySql}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-emerald-400 border border-emerald-500/40 cursor-pointer transition-all active:scale-95 shrink-0"
              >
                {copiedSql ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy SQL</span>
                  </>
                )}
              </button>
            </div>

            {/* Table Schema Badges */}
            <div className="flex flex-wrap gap-2 text-[10px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-neutral-800 text-neutral-300">
                <strong className="text-emerald-400">members</strong>: id, name, phone (UNIQUE), package_type, status, join_date, expiry_date, fee_amount
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-neutral-800 text-neutral-300">
                <strong className="text-emerald-400">leads</strong>: id, full_name, phone, source, goal, package_interest, status
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-neutral-800 text-neutral-300">
                <strong className="text-emerald-400">transactions</strong>: id, member_name, phone, type, category, amount, date
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-neutral-800 text-neutral-300">
                <strong className="text-emerald-400">coaches</strong>: id, name, role, phone, specialty, status
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-neutral-800 text-neutral-300">
                <strong className="text-emerald-400">equipment</strong>: id, name, category, quantity, condition, last_serviced
              </span>
            </div>

            {/* SQL Snippet Preview */}
            <div className="relative rounded-2xl bg-black border border-neutral-800/90 p-4 font-mono text-[11px] text-neutral-300 overflow-x-auto max-h-[380px] scrollbar-thin">
              <pre className="text-neutral-400 leading-relaxed">
                {getSupabaseSqlMigration()}
              </pre>
            </div>

            {/* Instructions Steps */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-2 text-xs">
              <div className="flex items-center justify-between font-semibold text-neutral-200">
                <span>Migration Instructions:</span>
                <span className="text-[10px] text-neutral-500 font-mono">Saved in /supabase-migration.sql</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-neutral-400">
                <li>
                  Click{' '}
                  <a
                    href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql/new`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 underline font-medium"
                  >
                    Open Supabase SQL Editor
                  </a>
                </li>
                <li>Click <strong>Copy SQL</strong> above and paste into the editor window.</li>
                <li>Click <strong>Run</strong> in Supabase. Your tables, UUID keys & RLS security rules are instantly created!</li>
              </ol>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
