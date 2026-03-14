"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, UserCog, Loader2, Mail, Shield } from "lucide-react";
import { getUsers, updateUserRole } from "@/app/ServerActions/user";

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateUserRole(userId, newRole);
      toast.success(`Role updated to ${newRole}`);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 gap-4">
      <Loader2 className="animate-spin text-emerald-400" size={40} />
      <p className="text-slate-400 animate-pulse">Loading users...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <p className="text-slate-400 text-sm">{users.length} total users</p>
      </div>

      {/* DESKTOP TABLE VIEW (Visible on md and up) */}
      <div className="hidden md:block bg-[#1f2937] rounded-xl overflow-hidden border border-slate-800 shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 text-slate-400 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={user.imageUrl} className="h-10 w-10 rounded-full border border-slate-700" alt={user.name} />
                  <span className="font-medium text-slate-200">{user.name}</span>
                </td>
                <td className="px-6 py-4 text-slate-400">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${
                    user.role === 'admin' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  }`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <select 
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-sm rounded-lg p-1.5 text-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW (Visible on small screens only) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users.map((user) => (
          <div key={user.id} className="bg-[#1f2937] p-5 rounded-xl border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center gap-4">
              <img src={user.imageUrl} className="h-12 w-12 rounded-full border-2 border-slate-700" alt={user.name} />
              <div>
                <h3 className="text-slate-200 font-semibold">{user.name}</h3>
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest mt-1 ${
                  user.role === 'admin' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                }`}>
                  {user.role.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-400 px-1">
              <Mail size={14} />
              <span className="truncate">{user.email}</span>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <label className="text-xs text-slate-500 uppercase font-bold mb-2 block">Change Permissions</label>
              <select 
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-sm rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="user">Assign User Role</option>
                <option value="admin">Assign Admin Role</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}