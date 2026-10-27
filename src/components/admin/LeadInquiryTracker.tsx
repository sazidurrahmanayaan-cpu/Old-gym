import React, { useState } from 'react';
import { useGym, Lead } from '../../context/GymContext';
import { 
  UserCheck, 
  Phone, 
  MessageCircle, 
  Search, 
  Filter, 
  UserPlus, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const LeadInquiryTracker: React.FC = () => {
  const { leads, updateLeadStatus, convertLeadToMember, deleteLead } = useGym();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [convertingLead, setConvertingLead] = useState<Lead | null>(null);
  const [selectedPlanToConvert, setSelectedPlanToConvert] = useState<'Monthly' | '3 Months' | 'Yearly VIP'>('3 Months');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.interestedProgram.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'New':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 border border-amber-500/50 text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            New Inquiry
          </span>
        );
      case 'Contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/20 border border-blue-500/40 text-blue-300">
            <Clock className="w-3 h-3 text-blue-400" />
            Contacted
          </span>
        );
      case 'Converted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Converted
          </span>
        );
      case 'Archived':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-800 text-neutral-400">
            Archived
          </span>
        );
    }
  };

  const handleExecuteConvert = () => {
    if (!convertingLead) return;
    convertLeadToMember(convertingLead.id, selectedPlanToConvert);
    setConvertingLead(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner & Search Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#121212] p-5 rounded-3xl border border-neutral-800 shadow-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search inquiries by prospect name, phone, or goal..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 text-white text-xs rounded-xl px-3 py-2 focus:border-[#D4AF37] focus:outline-none"
          >
            <option value="All">All Inquiries ({leads.length})</option>
            <option value="New">New ({leads.filter(l => l.status === 'New').length})</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="rounded-3xl bg-[#121212] border border-neutral-800 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserCheck className="w-5 h-5 text-[#FFD700]" />
            <h3 className="font-heading text-lg font-bold uppercase text-white">
              Trial Passes & Contact Inquiries ({filteredLeads.length})
            </h3>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            Direct Lead Pipeline
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 uppercase font-mono tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Prospect Name</th>
                <th className="py-3.5 px-5">Phone (WhatsApp / Call)</th>
                <th className="py-3.5 px-5">Interested Program</th>
                <th className="py-3.5 px-5">Source</th>
                <th className="py-3.5 px-5">Received</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500">
                    No inquiries recorded yet. When users submit the "Free Trial Pass" or "Contact Us" forms, they appear here instantly.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-neutral-900/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-white">{lead.fullName}</div>
                      {lead.notes && (
                        <div className="text-[11px] text-neutral-500 truncate max-w-xs">{lead.notes}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-neutral-200">{lead.phone}</span>
                        {/* 1-Click WhatsApp Link */}
                        <a
                          href={`https://wa.me/880${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.fullName)}!%20This%20is%20Old%20Gym%20Munshiganj.%20We%20received%20your%20inquiry%20regarding%20${encodeURIComponent(lead.interestedProgram)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/40 transition-colors"
                          title="Open WhatsApp with Lead"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        {/* 1-Click Call Link */}
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1 rounded bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                          title="Call Lead Phone"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-neutral-200 font-medium">
                      {lead.interestedProgram}
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 font-mono text-[10px] text-neutral-400">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-neutral-400">
                      {lead.date}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(lead.status)}
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                          className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-[10px] rounded p-1"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                          <option value="Archived">Archived</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* 1-Click Convert to Member */}
                        {lead.status !== 'Converted' ? (
                          <button
                            onClick={() => setConvertingLead(lead)}
                            className="px-2.5 py-1 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37] text-[#FFD700] hover:text-black font-semibold text-[11px] border border-[#D4AF37]/40 transition-colors flex items-center gap-1 cursor-pointer"
                            title="Convert Prospect into Enrolled Member"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Enroll</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Enrolled
                          </span>
                        )}

                        {/* Delete Lead */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete lead from ${lead.fullName}?`)) {
                              deleteLead(lead.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950/60 text-neutral-400 hover:text-rose-400 border border-neutral-800 transition-colors cursor-pointer"
                          title="Delete Lead Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Convert Lead to Member Modal */}
      {convertingLead && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-md w-full bg-[#141414] border border-[#D4AF37]/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">Conversion Pipeline</span>
              <h3 className="font-heading text-2xl font-bold uppercase text-white mt-0.5">
                Enroll {convertingLead.fullName}
              </h3>
              <p className="text-xs text-neutral-400">
                Instantly convert this trial inquiry into a registered member of Old Gym Munshiganj.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Contact:</span>
                <span className="font-mono text-white">{convertingLead.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Expressed Interest:</span>
                <span className="text-[#FFD700] font-medium">{convertingLead.interestedProgram}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase text-neutral-300">
                Select Subscription Plan
              </label>
              <select
                value={selectedPlanToConvert}
                onChange={(e) => setSelectedPlanToConvert(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl bg-black border border-neutral-700 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="Monthly">Monthly (৳1,000)</option>
                <option value="3 Months">3 Months Package (৳2,500 - Recommended)</option>
                <option value="Yearly VIP">Yearly VIP (৳8,000)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setConvertingLead(null)}
                className="flex-1 py-3 rounded-xl text-xs font-semibold text-neutral-300 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteConvert}
                className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover cursor-pointer shadow-lg shadow-amber-500/20"
              >
                Confirm & Activate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
