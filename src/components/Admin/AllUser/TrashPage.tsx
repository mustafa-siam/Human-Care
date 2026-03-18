"use client";

import React, { useEffect, useState } from "react";
import {
  Trash2,
  Loader2,
  RotateCcw,
  ShieldAlert,
  Users,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import {
  getDeletedUsers,
  restoreUser,
  permanentDeleteUser,
} from "@/app/ServerActions/user";
import Link from "next/link";

export default function AdminUserTrashPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);

  const fetchTrash = async () => {
    setLoading(true);
    try {
      const data = await getDeletedUsers();
      setUsers(data);
    } catch {
      toast.error("Failed to load trash users");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  
  const handleRestore = async (id: string) => {
    setProcessingId(id);
    try {
      await restoreUser(id);
      toast.success("User restored");
      fetchTrash();
    } catch {
      toast.error("Restore failed");
    } finally {
      setProcessingId(null);
    }
  };

  
  const handlePermanentDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete permanently",
      background: "#1e293b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      setProcessingId(id);
      try {
        await permanentDeleteUser(id);
        toast.success("User permanently deleted");
        fetchTrash();
      } catch {
        toast.error("Delete failed");
      } finally {
        setProcessingId(null);
      }
    }
  };

  
  const handleDeleteAll = async () => {
    if (!users.length) return toast("Trash is empty");

    const result = await Swal.fire({
      title: "Purge Trash?",
      text: `Delete ${users.length} users permanently.`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Yes, Purge All",
      background: "#1e293b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      setDeletingAll(true);
      try {
        await Promise.all(users.map((u) => permanentDeleteUser(u.id)));
        toast.success("Trash emptied");
        fetchTrash();
      } catch {
        toast.error("Failed to clear trash");
      } finally {
        setDeletingAll(false);
      }
    }
  };

  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
        
      </div>
    );
  }
  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
        <div className="bg-slate-800/50 p-6 rounded-full">
          <Users className="text-slate-600" size={48} />
        </div>
        <h3 className="text-white font-medium text-lg">
          Trash is empty
        </h3>
        <p className="text-slate-500 text-sm">
          No deleted users found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#1e293b] p-5 md:p-6 rounded-2xl border border-slate-800 gap-4 shadow-lg">
        <div className="flex items-center gap-3">
  <Link
    href="/admin/dashboard/users" 
    className="group p-3 bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-2xl transition-all"
  >
    <ArrowLeft
      size={20} 
      className="group-hover:-translate-x-1 transition-transform" 
    />
  </Link>

  <div>
    <h1 className="text-xl md:text-2xl font-bold text-red-500"> User Trash </h1>
  <p className="text-xs text-slate-400"> {users.length} users found </p>
  </div>
</div>
        <button
          onClick={handleDeleteAll}
          disabled={deletingAll}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 font-medium text-sm"
        >
          {deletingAll ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <ShieldAlert size={18} />
          )}
          {deletingAll ? "Purging..." : "Empty Trash"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          
          {/* DESKTOP */}
          <div className="hidden md:block overflow-hidden bg-[#1e293b] rounded-2xl border border-slate-800 shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase">
                <tr>
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Email</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/30">
                    <td className="px-8 py-5 flex items-center gap-4">
                      <div className="h-11 w-11 rounded-lg overflow-hidden border border-slate-700">
                        <img src={user.imageUrl} className="w-full h-full object-cover" />
                      </div>

                      <span className="text-slate-200 font-bold">
                        {user.name}
                      </span>
                    </td>

                    <td className="px-8 py-5 text-slate-400">
                      {user.email}
                    </td>

                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleRestore(user.id)}
                          disabled={processingId === user.id}
                          className="flex items-center gap-1 px-3 py-1 text-sm text-emerald-400 hover:bg-emerald-400/10 rounded-lg"
                        >
                          <RotateCcw size={14} /> Restore
                        </button>

                        <button
                          onClick={() => handlePermanentDelete(user.id)}
                          disabled={processingId === user.id}
                          className="flex items-center gap-1 px-3 py-1 text-sm text-rose-400 hover:bg-rose-400/10 rounded-lg"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-[#1e293b] p-5 rounded-2xl border border-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl overflow-hidden border border-slate-700">
                    <img src={user.imageUrl} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-slate-200 font-bold">
                      {user.name}
                    </h3>

                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-1">
                      <Mail size={12} />
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button
                    onClick={() => handleRestore(user.id)}
                    className="flex items-center justify-center gap-2 py-2 bg-emerald-500/10 text-emerald-400 rounded-xl"
                  >
                    <RotateCcw size={16} /> Restore
                  </button>

                  <button
                    onClick={() => handlePermanentDelete(user.id)}
                    className="flex items-center justify-center gap-2 py-2 bg-rose-500/10 text-rose-400 rounded-xl"
                  >
                    <Trash2 size={16} />  delete
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