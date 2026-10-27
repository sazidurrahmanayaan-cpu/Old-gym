import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { GymLogo } from '../GymLogo';
import { OverviewAnalytics } from './OverviewAnalytics';
import { MemberManagement } from './MemberManagement';
import { MasterContentManager } from './MasterContentManager';
import { LeadInquiryTracker } from './LeadInquiryTracker';
import { SupabaseSetupManager } from './SupabaseSetupManager';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  UserCheck, 
  Database,
  ExternalLink, 
  LogOut, 
  ShieldCheck, 
  KeyRound,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Menu,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    setCurrentView, 
    logoutAdmin,
    leads, 
    members,
    changeAdminPassword,
    resetAdminPasswordToDefault,
    hasCustomPassword
  } = useGym();

  const [activeSection, setActiveSection] = useState<'overview' | 'members' | 'content' | 'leads' | 'supabase'>('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Settings & Change Password Modal
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmPassInput, setConfirmPassInput] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const newLeadsCount = leads.filter(l => l.status === 'New').length;
  const activeMembersCount = members.filter(m => m.status === 'Active').length;

  const navItems = [
    {
      id: 'overview',
      label: '1. Overview',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'members',
      label: '2. Members',
      icon: Users,
      badge: `${activeMembersCount} Active`
    },
    {
      id: 'content',
      label: '3. Content Editor',
      icon: Settings,
      badge: null
    },
    {
      id: 'leads',
      label: '4. Leads & Trials',
      icon: UserCheck,
      badge: newLeadsCount > 0 ? `${newLeadsCount} New` : null
    },
    {
      id: 'supabase',
      label: '5. Supabase Setup',
      icon: Database,
      badge: 'Connected'
    }
  ] as const;

  const handleOpenPasswordModal = () => {
    setCurrentPassInput('');
    setNewPassInput('');
    setConfirmPassInput('');
    setStatusMessage(null);
    setShowCurrentPass(false);
    setShowNewPass(false);
    setIsPasswordModalOpen(true);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (newPassInput !== confirmPassInput) {
      setStatusMessage({ type: 'error', text: 'New passwords do not match. Please verify.' });
      return;
    }

    if (newPassInput.length < 4) {
      setStatusMessage({ type: 'error', text: 'New password must be at least 4 characters long.' });
      return;
    }

    const result = changeAdminPassword(currentPassInput, newPassInput);
    if (result.success) {
      setStatusMessage({ type: 'success', text: result.message });
      setCurrentPassInput('');
      setNewPassInput('');
      setConfirmPassInput('');
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setStatusMessage(null);
      }, 2000);
    } else {
      setStatusMessage({ type: 'error', text: result.message });
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset admin password to default ("OldGym@2026")?')) {
      resetAdminPasswordToDefault();
      setStatusMessage({ type: 'success', text: 'Password reset to default: OldGym@2026' });
      setCurrentPassInput('');
      setNewPassInput('');
      setConfirmPassInput('');
      setTimeout(() => {
        setIsPasswordModalOpen(false);
        setStatusMessage(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans">
      
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-neutral-800/80 px-4 sm:px-6 lg:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <GymLogo size={40} showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                  Old Gym <span className="text-gold-gradient">Command Center</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-[#FFD700] border border-amber-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  Password Protected
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 font-mono hidden sm:block">
                Munshiganj Facility Management System
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* View Website Button */}
            <button
              onClick={() => setCurrentView('public')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-[#D4AF37]/50 transition-all cursor-pointer"
            >
              <span className="hidden md:inline">View Public Website</span>
              <span className="md:hidden">Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>

            {/* Password Settings Button */}
            <button
              onClick={handleOpenPasswordModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-[#FFD700] bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer"
              title="Admin Password Settings"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Password Settings</span>
            </button>

            {/* Lock & Exit Button */}
            <button
              onClick={() => {
                if (window.confirm('Lock Admin Panel and sign out? You will need your password to re-enter.')) {
                  logoutAdmin();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-rose-950/70 text-neutral-300 hover:text-rose-400 border border-neutral-800 hover:border-rose-700/60 transition-all cursor-pointer"
              title="Lock Admin Panel & Sign Out"
            >
              <LogOut className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Lock & Exit</span>
            </button>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-xl bg-neutral-900 text-neutral-300 border border-neutral-800"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-neutral-800 grid grid-cols-2 gap-2 animate-in fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`p-3 rounded-xl text-xs font-semibold text-left flex items-center justify-between border cursor-pointer ${
                    isActive
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive ? 'bg-black text-amber-300' : 'bg-neutral-800 text-amber-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Desktop Tab Navigation Bar */}
        <div className="hidden lg:flex items-center justify-between p-2 rounded-2xl bg-[#121212] border border-neutral-800 shadow-xl">
          <nav className="flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#D4AF37] text-black shadow-lg shadow-amber-500/20 font-extrabold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-black text-[#FFD700]' : 'bg-neutral-800 text-neutral-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 pr-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Database Online</span>
          </div>
        </div>

        {/* Section View Routing */}
        <div className="transition-all">
          {activeSection === 'overview' && <OverviewAnalytics />}
          {activeSection === 'members' && <MemberManagement />}
          {activeSection === 'content' && <MasterContentManager />}
          {activeSection === 'leads' && <LeadInquiryTracker />}
          {activeSection === 'supabase' && <SupabaseSetupManager />}
        </div>

      </div>

      {/* Admin Footer */}
      <footer className="bg-[#080808] border-t border-neutral-900 py-4 px-6 text-center text-xs text-neutral-500 font-mono">
        <p>Old Gym Health & Fitness Center · Internal Management Engine · HF2W+4J8, Munshiganj</p>
      </footer>

      {/* Password Settings Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-[#121212] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">Security Credentials</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                  hasCustomPassword 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  {hasCustomPassword ? 'Custom Password Active' : 'Default Password Active'}
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold uppercase text-white">
                Admin Password Settings
              </h3>
              <p className="text-xs text-neutral-400">
                Change or update your master password to protect the Old Gym Admin Panel.
              </p>
            </div>

            {statusMessage && (
              <div className={`mb-4 p-3 rounded-xl border text-xs flex items-center gap-2 ${
                statusMessage.type === 'success' 
                  ? 'bg-emerald-950/80 border-emerald-800 text-emerald-300' 
                  : 'bg-rose-950/80 border-rose-800 text-rose-300'
              }`}>
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1 flex items-center justify-between">
                  <span>Current Password *</span>
                  <span className="text-[10px] text-neutral-500 font-mono">Default: OldGym@2026</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    required
                    value={currentPassInput}
                    onChange={(e) => setCurrentPassInput(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-white p-1"
                  >
                    {showCurrentPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  New Password (min 4 characters) *
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    required
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-2.5 top-2.5 text-neutral-400 hover:text-white p-1"
                  >
                    {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Confirm New Password *
                </label>
                <input
                  type={showNewPass ? 'text' : 'password'}
                  required
                  value={confirmPassInput}
                  onChange={(e) => setConfirmPassInput(e.target.value)}
                  placeholder="Re-type new password"
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 border border-neutral-800 text-xs font-mono transition-colors cursor-pointer"
                  title="Reset to default password"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Default</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white text-xs font-bold uppercase transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gold-gradient hover:bg-gold-gradient-hover text-black text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    Save Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
