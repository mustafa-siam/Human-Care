"use client";

import React, { useState } from "react";
import { Trash2, Users, Loader2, RotateCcw, ShieldAlert, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { useTeam } from "@/components/Hooks/useTeam";
import { restoreTeamMember, deleteTeamPermanent } from "@/app/ServerActions/team";
import Link from "next/link";

export default function AdminTeamTrash() {
  const { team, loading, refresh } = useTeam(undefined, true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);

  const deletedMembers = team.filter((member) => member.isDeleted);

  const handleRestore = async (id: string) => {
    setProcessingId(id);
    try {
      const res = await restoreTeamMember(id);
      if (res.success) {
        toast.success("Team member restored");
        refresh();
      } else {
        toast.error(res.error || "Restore failed");
      }
    } catch (err) {
      toast.error("Unexpected error occurred");
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
        const res = await deleteTeamPermanent(id);
        if (res.success) {
          toast.success("Member removed from database");
          refresh();
        } else {
          toast.error(res.error || "Delete failed");
        }
      } catch (err) {
        toast.error("Unexpected error occurred");
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (!deletedMembers.length) return toast("Trash is already empty");

    const result = await Swal.fire({
      title: "Purge Trash?",
      text: `You are about to permanently delete ${deletedMembers.length} members.`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Yes, Purge All",
      background: "#1e293b",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        setDeletingAll(true);
        // Using Promise.all for faster concurrent deletion
        await Promise.all(deletedMembers.map((m) => deleteTeamPermanent(m.id)));
        toast.success("Trash purged successfully");
        refresh();
      } catch (err) {
        toast.error("Failed to clear trash");
      } finally {
        setDeletingAll(false);
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
      <p className="text-slate-400 animate-pulse">Loading deleted members...</p>
    </div>
  );

  if (deletedMembers.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 px-4 text-center">
      <div className="bg-slate-800/50 p-6 rounded-full">
        <Users className="text-slate-600" size={48} />
      </div>
      <div>
        <h3 className="text-white font-medium text-lg">Trash is empty</h3>
        <p className="text-slate-500 text-sm max-w-xs">There are no deleted team members to display or restore.</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6 md:py-10">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#1e293b] p-5 md:p-6 rounded-2xl border border-slate-800 gap-4 shadow-lg">
        <div className="flex items-center gap-3">
  <Link
    href="/admin/dashboard/team" 
    className="group p-3 bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white rounded-2xl transition-all"
  >
    <ArrowLeft
      size={20} 
      className="group-hover:-translate-x-1 transition-transform" 
    />
  </Link>

  <div>
    <h1 className="text-xl md:text-2xl font-bold text-red-500">Team Trash </h1>
  <p className="text-xs text-slate-400"> {deletedMembers.length} member found </p>
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
        <motion.div 
          key="trash-content" 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0 }}
        >
          {/* Desktop Table View (Hidden on Mobile) */}
          <div className="hidden md:block overflow-hidden bg-[#1e293b] rounded-2xl border border-slate-800 shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-5">Member</th>
                  <th className="px-8 py-5">Role & Expertise</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {deletedMembers.map(member => (
                  <tr key={member.id} className="group hover:bg-slate-800/30 transition-all">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                          <img src={member.image || "/placeholder-user.png"} alt="" className="object-cover w-full h-full" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-slate-200 truncate">{member.name}</span>
                          <span className="text-[11px] text-slate-500 truncate">{member.email || "No email"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-slate-300 font-medium">{member.role}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{member.expertise}</div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleRestore(member.id)}
                          disabled={processingId === member.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all disabled:opacity-50"
                        >
                          <RotateCcw size={14} /> Restore
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(member.id)}
                          disabled={processingId === member.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all disabled:opacity-50"
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

          {/* Mobile Card View (Hidden on Desktop) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {deletedMembers.map(member => (
              <div key={member.id} className="bg-[#1e293b] p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                    <img src={member.image || "/placeholder-user.png"} alt="" className="object-cover w-full h-full" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-200 truncate">{member.name}</h3>
                    <p className="text-xs text-slate-500 truncate">{member.email}</p>
                    <div className="mt-1 inline-block px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-medium">
                      {member.role}
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleRestore(member.id)}
                    disabled={processingId === member.id}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-semibold active:scale-95 transition-transform"
                  >
                    <RotateCcw size={16} /> Restore
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(member.id)}
                    disabled={processingId === member.id}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 text-sm font-semibold active:scale-95 transition-transform"
                  >
                    <Trash2 size={16} /> Delete
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