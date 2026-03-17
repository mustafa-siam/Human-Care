"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  Trash2,
  Loader2,
  Mail,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import Link from "next/link";

import {
  getUsers,
  updateUserRole,
  deleteUser,
} from "@/app/ServerActions/user";

export default function AdminUserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      toast.error("Failed to load users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const handleRoleChange = async (userId: string, role: string) => {
    setProcessingId(userId);
    try {
      await updateUserRole(userId, role);
      toast.success(`Role updated to ${role}`);
      fetchUsers();
    } catch {
      toast.error("Failed to update role");
    } finally {
      setProcessingId(null);
    }
  };

  
  const handleDelete = async (user: any) => {
    const result = await Swal.fire({
      title: "Move to Trash?",
      text: `${user.name} will be moved to trash.`,
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, move",
      background: "#1e293b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      setProcessingId(user.id);
      try {
        await deleteUser(user.id);
        toast.success("User moved to trash");
        fetchUsers();
      } catch {
        toast.error("Failed to delete user");
      } finally {
        setProcessingId(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1e293b] p-6 rounded-2xl border border-slate-800 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <Users className="text-emerald-500" size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              User Management
            </h1>
            <p className="text-slate-400 text-sm">
              Manage platform users & permissions
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <Link
            href="/admin/dashboard/users/trash"
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl font-semibold transition-all"
          >
            <Trash2 size={18} />
            Trash
          </Link>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key="user-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          
        
          <div className="hidden md:block bg-[#1e293b] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-8 py-5">User</th>
                    <th className="px-8 py-5">Email</th>
                    <th className="px-8 py-5 text-center">Role</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="group hover:bg-slate-800/30 transition-all"
                    >
                      {/* USER */}
                      <td className="px-8 py-5 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg overflow-hidden border border-slate-700">
                          <img
                            src={user.imageUrl}
                            alt=""
                            className="object-cover w-full h-full"
                          />
                        </div>

                        <div className="flex flex-col">
                          <span className="font-bold text-slate-200">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      
                      <td className="px-8 py-5 text-slate-400">
                        {user.email}
                      </td>

                      
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center items-center gap-2">
                           <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${
                      user.role === "admin"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {user.role.toUpperCase()}
                  </span>

                          <select
                            value={user.role}
                            disabled={processingId === user.id}
                            onChange={(e) =>
                              handleRoleChange(user.id, e.target.value)
                            }
                            className="bg-slate-900 border border-slate-700 text-sm rounded-lg px-2 py-1 text-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => handleDelete(user)}
                          disabled={processingId === user.id}
                          className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {processingId === user.id ? (
                            <Loader2 className="animate-spin" size={16} />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* EMPTY */}
            {users.length === 0 && (
              <div className="p-12 text-center">
                <Users className="text-slate-600 mx-auto mb-4" size={40} />
                <p className="text-slate-400 text-sm">
                  No users found in the system.
                </p>
              </div>
            )}
          </div>

          {/* MOBILE */}
          <div className="flex flex-col gap-4 md:hidden">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-[#1e293b] border border-slate-800 rounded-2xl p-4 shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg overflow-hidden border border-slate-700">
                    <img
                      src={user.imageUrl}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="font-bold text-white">
                      {user.name}
                    </div>

                    <div className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                      <Mail size={12} />
                      {user.email}
                    </div>

                    <div className="mt-2">
                      <select
                        value={user.role}
                        disabled={processingId === user.id}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-2 py-1 text-slate-300"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-3">
                  <button
                    onClick={() => handleDelete(user)}
                    disabled={processingId === user.id}
                    className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}