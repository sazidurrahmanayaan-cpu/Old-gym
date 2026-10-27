import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  UserPlus, 
  DollarSign, 
  ArrowUpRight, 
  Calendar, 
  CreditCard,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const OverviewAnalytics: React.FC = () => {
  const { members, leads, transactions } = useGym();
  const [selectedMonth, setSelectedMonth] = useState('September 2026');

  // Compute live metrics
  const activeMembersCount = members.filter(m => m.status === 'Active').length;
  
  // Total Monthly Revenue calculation
  const totalMonthlyRevenue = transactions
    .filter(t => t.status === 'Paid')
    .reduce((sum, t) => sum + t.amount, 0);

  // Pending Payments calculation
  const pendingPayments = transactions
    .filter(t => t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0);

  // New Leads this month
  const newLeadsCount = leads.filter(l => l.status === 'New').length;

  // Plan Breakdown
  const monthlyRevenue = members
    .filter(m => m.plan === 'Monthly' && m.status === 'Active')
    .reduce((sum, m) => sum + m.amount, 0);

  const quarterlyRevenue = members
    .filter(m => m.plan === '3 Months' && m.status === 'Active')
    .reduce((sum, m) => sum + m.amount, 0);

  const yearlyRevenue = members
    .filter(m => m.plan === 'Yearly VIP' && m.status === 'Active')
    .reduce((sum, m) => sum + m.amount, 0);

  const activeTotalPool = (monthlyRevenue + quarterlyRevenue + yearlyRevenue) || 1;
  const monthlyPct = Math.round((monthlyRevenue / activeTotalPool) * 100);
  const quarterlyPct = Math.round((quarterlyRevenue / activeTotalPool) * 100);
  const yearlyPct = Math.round((yearlyRevenue / activeTotalPool) * 100);

  // 6-Month Comparison Data
  const monthlyChartData = [
    { month: 'Apr', revenue: 42000, members: 28, growth: '+12%' },
    { month: 'May', revenue: 48500, members: 32, growth: '+15%' },
    { month: 'Jun', revenue: 54000, members: 37, growth: '+11%' },
    { month: 'Jul', revenue: 61000, members: 42, growth: '+13%' },
    { month: 'Aug', revenue: 69500, members: 48, growth: '+14%' },
    { month: 'Sep', revenue: 78500, members: 54, growth: '+13%' }
  ];

  const maxRevenue = Math.max(...monthlyChartData.map(d => d.revenue));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Monthly Revenue */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-neutral-800 hover:border-[#D4AF37]/50 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Total Monthly Revenue</span>
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/15 text-[#FFD700]">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-3xl font-extrabold text-white tabular-nums">
              ৳{totalMonthlyRevenue.toLocaleString()}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Members Count */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-neutral-800 hover:border-[#D4AF37]/50 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Active Lifters</span>
            <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-3xl font-extrabold text-white tabular-nums">
              {activeMembersCount} <span className="text-base text-neutral-400 font-normal">Enrolled</span>
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <span>94% member retention rate</span>
            </div>
          </div>
        </div>

        {/* Card 3: Pending Payments */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-neutral-800 hover:border-amber-500/50 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Pending Dues</span>
            <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-3xl font-extrabold text-amber-300 tabular-nums">
              ৳{pendingPayments.toLocaleString()}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-amber-400/90">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>1 member invoice pending</span>
            </div>
          </div>
        </div>

        {/* Card 4: New Leads This Month */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-neutral-800 hover:border-emerald-500/50 transition-all shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">New Leads / Trials</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400">
              <UserPlus className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-heading text-3xl font-extrabold text-white tabular-nums">
              {newLeadsCount} <span className="text-base text-emerald-400 font-normal">Active</span>
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{leads.length} total inquiries logged</span>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Revenue Comparison Chart & Plan Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Interactive Revenue Graph (8 cols) */}
        <div className="lg:col-span-8 p-6 sm:p-7 rounded-3xl bg-[#121212] border border-neutral-800 flex flex-col justify-between shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFD700]">
                <TrendingUp className="w-4 h-4" />
                <span>Financial Growth Trajectory</span>
              </div>
              <h3 className="font-heading text-xl font-bold uppercase text-white mt-0.5">
                Monthly Income Analytics (Munshiganj)
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs rounded-xl px-3 py-1.5 focus:border-[#D4AF37] focus:outline-none"
              >
                <option value="September 2026">Last 6 Months (2026)</option>
                <option value="August 2026">Q2 - Q3 Performance</option>
                <option value="Full Year 2026">Full Year 2026</option>
              </select>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="pt-4 pb-2">
            <div className="h-56 flex items-end justify-between gap-3 sm:gap-6 pt-6 px-2 border-b border-neutral-800">
              {monthlyChartData.map((item) => {
                const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
                const isCurrent = item.month === 'Sep';

                return (
                  <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-center bg-black/90 border border-neutral-700 p-1.5 rounded-lg shadow-xl whitespace-nowrap pointer-events-none mb-1">
                      <p className="text-white font-bold">৳{item.revenue.toLocaleString()}</p>
                      <p className="text-neutral-400">{item.members} Members</p>
                      <p className="text-emerald-400">{item.growth}</p>
                    </div>

                    {/* Bar */}
                    <div className="w-full max-w-[48px] rounded-t-xl overflow-hidden bg-neutral-900 flex flex-col justify-end transition-all duration-300 group-hover:scale-105">
                      <div
                        className={`w-full transition-all duration-500 rounded-t-xl ${
                          isCurrent
                            ? 'bg-gold-gradient shadow-lg shadow-amber-500/30'
                            : 'bg-neutral-700 hover:bg-[#D4AF37]/80'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    {/* Month Label */}
                    <span className={`text-xs font-mono font-medium ${isCurrent ? 'text-[#FFD700] font-bold' : 'text-neutral-400'}`}>
                      {item.month}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-3 px-2">
              <span>Baseline: ৳30,000 / mo</span>
              <span className="text-[#FFD700] font-mono font-semibold">Peak Month: September (৳78,500)</span>
            </div>
          </div>
        </div>

        {/* Plan Breakdown & Earnings Split (4 cols) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-3xl bg-[#121212] border border-neutral-800 flex flex-col justify-between shadow-xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFD700] mb-1">
              <CreditCard className="w-4 h-4" />
              <span>Revenue Distribution</span>
            </div>
            <h3 className="font-heading text-xl font-bold uppercase text-white">
              Earnings By Plan Type
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Active membership contribution across subscription tiers.
            </p>
          </div>

          <div className="space-y-4">
            {/* Yearly VIP */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Yearly VIP (৳8,000)</span>
                <span className="font-mono text-[#FFD700] font-bold">৳{yearlyRevenue.toLocaleString()} ({yearlyPct}%)</span>
              </div>
              <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-full bg-gold-gradient rounded-full" style={{ width: `${yearlyPct}%` }} />
              </div>
            </div>

            {/* 3 Months */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">3 Months (৳2,500)</span>
                <span className="font-mono text-amber-300 font-bold">৳{quarterlyRevenue.toLocaleString()} ({quarterlyPct}%)</span>
              </div>
              <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${quarterlyPct}%` }} />
              </div>
            </div>

            {/* Monthly */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Monthly (৳1,000)</span>
                <span className="font-mono text-neutral-300 font-bold">৳{monthlyRevenue.toLocaleString()} ({monthlyPct}%)</span>
              </div>
              <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-full bg-neutral-600 rounded-full" style={{ width: `${monthlyPct}%` }} />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs space-y-1">
            <span className="text-neutral-400">Quarterly & Annual lifters represent</span>
            <p className="font-bold text-[#FFD700] text-sm">
              {yearlyPct + quarterlyPct}% of Total Gym Revenue
            </p>
          </div>
        </div>

      </div>

      {/* Recent Transactions Ledger */}
      <div className="rounded-3xl bg-[#121212] border border-neutral-800 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading text-lg font-bold uppercase text-white">
              Recent Transactions & Inflow
            </h3>
            <p className="text-xs text-neutral-400">
              Live audit record of member subscriptions and payment collections.
            </p>
          </div>

          <span className="text-xs font-mono text-neutral-400 bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800 self-start sm:self-auto">
            {transactions.length} Total Logs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-900/70 border-b border-neutral-800 text-neutral-400 uppercase font-mono tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Txn ID</th>
                <th className="py-3.5 px-6">Member</th>
                <th className="py-3.5 px-6">Plan</th>
                <th className="py-3.5 px-6">Method</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Amount</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
              {transactions.slice(0, 6).map((txn) => (
                <tr key={txn.id} className="hover:bg-neutral-900/40 transition-colors">
                  <td className="py-3.5 px-6 font-mono text-[#D4AF37] font-semibold">
                    {txn.id}
                  </td>
                  <td className="py-3.5 px-6 font-semibold text-white">
                    {txn.memberName}
                  </td>
                  <td className="py-3.5 px-6 text-neutral-300">
                    {txn.plan}
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 font-mono text-[11px]">
                      {txn.method}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 font-mono text-neutral-400">
                    {txn.date}
                  </td>
                  <td className="py-3.5 px-6 font-mono font-bold text-white tabular-nums">
                    ৳{txn.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        txn.status === 'Paid'
                          ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                          : 'bg-amber-950/60 border-amber-800 text-amber-300'
                      }`}
                    >
                      {txn.status === 'Paid' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-amber-400" />
                      )}
                      <span>{txn.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
