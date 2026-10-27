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
  Menu,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    setCurrentView, 
    leads, 
    members 
  } = useGym();

  const [activeSection, setActiveSection] = useState<'overview' | 'members' | 'content' | 'leads' | 'supabase'>('overview');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
                  Admin
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-200 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-[#D4AF37]/50 transition-all cursor-pointer"
            >
              <span className="hidden md:inline">View Public Website</span>
              <span className="md:hidden">Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>

            {/* Exit Admin Button */}
            <button
              onClick={() => setCurrentView('public')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer"
              title="Exit Admin Panel"
            >
              <LogOut className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Exit Admin</span>
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

    </div>
  );
};
