import React, { useState } from 'react';
import { useGym, Member } from '../../context/GymContext';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  Phone, 
  MessageCircle, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  X,
  Calendar,
  CreditCard
} from 'lucide-react';

export const MemberManagement: React.FC = () => {
  const { members, addMember, updateMember, deleteMember, renewMember } = useGym();
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  // New Member Form state
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPlan, setNewPlan] = useState<Member['plan']>('3 Months');
  const [newJoinDate, setNewJoinDate] = useState(new Date().toISOString().split('T')[0]);
  const [newStatus, setNewStatus] = useState<Member['status']>('Active');
  const [newNotes, setNewNotes] = useState('');

  // Renewal quick popover / prompt
  const [renewingId, setRenewingId] = useState<string | null>(null);

  // Filtered members list
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery) ||
      member.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPlan = filterPlan === 'All' || member.plan === filterPlan;
    const matchesStatus = filterStatus === 'All' || member.status === filterStatus;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleAddNewMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || !newPhone.trim()) return;

    let amount = 1000;
    let monthsToAdd = 1;
    if (newPlan === '3 Months') {
      amount = 2500;
      monthsToAdd = 3;
    } else if (newPlan === 'Yearly VIP') {
      amount = 8000;
      monthsToAdd = 12;
    }

    const start = new Date(newJoinDate);
    const end = new Date(newJoinDate);
    end.setMonth(end.getMonth() + monthsToAdd);

    addMember({
      fullName: newFullName.trim(),
      phone: newPhone.trim(),
      plan: newPlan,
      amount,
      joinDate: newJoinDate,
      expiryDate: end.toISOString().split('T')[0],
      status: newStatus,
      notes: newNotes.trim()
    });

    // Reset & close
    setNewFullName('');
    setNewPhone('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const handleSaveEditMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    updateMember(editingMember.id, {
      fullName: editingMember.fullName,
      phone: editingMember.phone,
      plan: editingMember.plan,
      status: editingMember.status,
      notes: editingMember.notes
    });

    setEditingMember(null);
  };

  const handleRenew = (memberId: string, months: number) => {
    renewMember(memberId, months);
    setRenewingId(null);
  };

  const getStatusBadge = (status: Member['status']) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/70 border border-emerald-800 text-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Active
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-950/70 border border-rose-800 text-rose-300">
            <Clock className="w-3 h-3 text-rose-400" />
            Expired
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/70 border border-amber-800 text-amber-300">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Controls: Search, Filters & Add Member Button */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#121212] p-5 rounded-3xl border border-neutral-800 shadow-xl">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone or member ID (e.g. OGM-101)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Group */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Plan filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400">Plan:</span>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-white text-xs rounded-xl px-3 py-2 focus:border-[#D4AF37] focus:outline-none"
            >
              <option value="All">All Plans</option>
              <option value="Monthly">Monthly</option>
              <option value="3 Months">3 Months</option>
              <option value="Yearly VIP">Yearly VIP</option>
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 text-white text-xs rounded-xl px-3 py-2 focus:border-[#D4AF37] focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Add New Member Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-amber-500/20 active:scale-95 ml-auto lg:ml-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Member Table */}
      <div className="rounded-3xl bg-[#121212] border border-neutral-800 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#FFD700]" />
            <h3 className="font-heading text-lg font-bold uppercase text-white">
              Old Gym Registered Lifters ({filteredMembers.length})
            </h3>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            Munshiganj Roster
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400 uppercase font-mono tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Member ID</th>
                <th className="py-3.5 px-5">Lifter Name</th>
                <th className="py-3.5 px-5">Contact</th>
                <th className="py-3.5 px-5">Plan</th>
                <th className="py-3.5 px-5">Enrolled</th>
                <th className="py-3.5 px-5">Expires</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-500">
                    No members match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-neutral-900/40 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-[#D4AF37] font-semibold">
                      {member.id}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-white">{member.fullName}</div>
                      {member.notes && (
                        <div className="text-[11px] text-neutral-500 truncate max-w-xs">{member.notes}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-neutral-300">{member.phone}</span>
                        <a
                          href={`https://wa.me/880${member.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-emerald-950/60 text-emerald-400 hover:text-white border border-emerald-800/60 transition-colors"
                          title="WhatsApp Lifter"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`tel:${member.phone}`}
                          className="p-1 rounded bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                          title="Call Lifter"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      <span className="font-medium text-neutral-200">{member.plan}</span>
                      <div className="text-[10px] text-neutral-500 font-mono">৳{member.amount}</div>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-neutral-400">
                      {member.joinDate}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-neutral-300">
                      {member.expiryDate}
                    </td>
                    <td className="py-3.5 px-5">
                      {getStatusBadge(member.status)}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Quick Renew Popover Toggle */}
                        <button
                          onClick={() => setRenewingId(renewingId === member.id ? null : member.id)}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-[#D4AF37]/20 text-[#FFD700] border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors cursor-pointer"
                          title="Renew Membership"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => setEditingMember(member)}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
                          title="Edit Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${member.fullName} (${member.id}) from members roster?`)) {
                              deleteMember(member.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950/60 text-neutral-400 hover:text-rose-400 border border-neutral-800 transition-colors cursor-pointer"
                          title="Delete Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Renewal dropdown row */}
                      {renewingId === member.id && (
                        <div className="mt-2 p-2 rounded-xl bg-black border border-[#D4AF37]/60 shadow-xl flex items-center justify-end gap-1.5 text-[11px] animate-in fade-in">
                          <span className="text-neutral-400 mr-1">Extend:</span>
                          <button
                            onClick={() => handleRenew(member.id, 1)}
                            className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-[#D4AF37] hover:text-black text-white border border-neutral-700 cursor-pointer"
                          >
                            +1 Mo
                          </button>
                          <button
                            onClick={() => handleRenew(member.id, 3)}
                            className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-[#D4AF37] hover:text-black text-white border border-neutral-700 cursor-pointer"
                          >
                            +3 Mo
                          </button>
                          <button
                            onClick={() => handleRenew(member.id, 12)}
                            className="px-2 py-0.5 rounded bg-gold-gradient text-black font-bold cursor-pointer"
                          >
                            +1 Yr VIP
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-[#141414] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">Member Registry</span>
              <h3 className="font-heading text-2xl font-bold uppercase text-white">Add New Lifter</h3>
              <p className="text-xs text-neutral-400">Enroll a new member into Old Gym Munshiganj database.</p>
            </div>

            <form onSubmit={handleAddNewMember} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="e.g. Shakib Al Hasan"
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Membership Plan</label>
                  <select
                    value={newPlan}
                    onChange={(e) => setNewPlan(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Monthly">Monthly (৳1,000)</option>
                    <option value="3 Months">3 Months (৳2,500)</option>
                    <option value="Yearly VIP">Yearly VIP (৳8,000)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Initial Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Active">Active (Paid)</option>
                    <option value="Pending">Pending Payment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Start Date</label>
                <input
                  type="date"
                  value={newJoinDate}
                  onChange={(e) => setNewJoinDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Member Notes / Locker Info</label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Locker #12, morning routine"
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
              >
                Enroll Member & Generate Invoice
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-[#141414] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setEditingMember(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FFD700]">Update Roster</span>
              <h3 className="font-heading text-2xl font-bold uppercase text-white">Edit {editingMember.fullName}</h3>
              <p className="text-xs text-neutral-400">ID: {editingMember.id}</p>
            </div>

            <form onSubmit={handleSaveEditMember} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingMember.fullName}
                  onChange={(e) => setEditingMember({ ...editingMember, fullName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={editingMember.phone}
                  onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs font-mono focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Plan</label>
                  <select
                    value={editingMember.plan}
                    onChange={(e) => setEditingMember({ ...editingMember, plan: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="3 Months">3 Months</option>
                    <option value="Yearly VIP">Yearly VIP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Status</label>
                  <select
                    value={editingMember.status}
                    onChange={(e) => setEditingMember({ ...editingMember, status: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Notes / Locker</label>
                <input
                  type="text"
                  value={editingMember.notes || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, notes: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:bg-gold-gradient-hover transition-all cursor-pointer shadow-md"
              >
                Save Member Changes
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
