import React from 'react';
import { Briefcase, Users, Heart, ArrowUpRight } from "lucide-react";

const DashboardPage = () => {
  const stats = [
    { label: "Active Projects", value: "12", icon: <Briefcase className="text-emerald-400" />, trend: "+2 this month" },
    { label: "Lives Impacted", value: "50,000+", icon: <Users className="text-cyan-400" />, trend: "Real-time data" },
    { label: "Donations", value: "৳4.2M", icon: <Heart className="text-rose-400" />, trend: "+15% vs last year" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400 mt-2">Here is what is happening with Human Care Global today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-[#0f172a] border border-slate-800 hover:border-emerald-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">{stat.icon}</div>
              <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full flex items-center gap-1">
                {stat.trend} <ArrowUpRight size={12} />
              </span>
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Placeholder for Recent Activity */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-8">
        <h3 className="text-xl font-semibold mb-6">Recent Updates</h3>
        <div className="text-slate-500 text-sm italic">No recent updates. Start by editing the Hero section or adding a Project.</div>
      </div>
    </div>
  );
};

export default DashboardPage;