"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ShieldCheck, UserCog, Loader2 } from "lucide-react";
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
      fetchUsers(); // Refresh list
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
      </div>

      <div className="bg-[#1f2937] rounded-xl overflow-hidden border border-slate-800">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 text-slate-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={user.imageUrl} className="h-8 w-8 rounded-full" alt="" />
                  <span className="font-medium">{user.name}</span>
                </td>
                <td className="px-6 py-4 text-slate-400">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    user.role === 'admin' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-slate-900 border border-slate-700 text-sm rounded-lg p-1 text-slate-300 focus:ring-emerald-500"
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
    </div>
  );
}