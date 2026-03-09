"use client";

import React, { useState } from "react";
import { Trash2, X, Loader2, Users, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { useTeam } from "@/components/Hooks/useTeam";
import { restoreTeamMember, deleteTeamPermanent } from "@/app/ServerActions/team";

export default function AdminTeamTrash() {
  const { team, loading, refresh } = useTeam(undefined,true); // pass true to fetch trashed members
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);

  const deletedMembers = team.filter(member => member.isDeleted);

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
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setProcessingId(null);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This team member will be permanently deleted!",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete!",
    });

    if (result.isConfirmed) {
      setProcessingId(id);
      try {
        const res = await deleteTeamPermanent(id);
        if (res.success) {
          toast.success("Team member permanently deleted");
          refresh();
        } else {
          toast.error(res.error || "Delete failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("Unexpected error occurred");
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleDeleteAll = async () => {
    if (!deletedMembers.length) return toast("Trash is already empty");

    const result = await Swal.fire({
      title: "Delete all trashed members?",
      text: "This will permanently delete all trashed team members!",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete all!",
    });

    if (result.isConfirmed) {
      try {
        setDeletingAll(true);
        for (const member of deletedMembers) {
          await deleteTeamPermanent(member.id);
        }
        toast.success("All trashed members deleted");
        refresh();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete all members");
      } finally {
        setDeletingAll(false);
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  );

  if (deletedMembers.length === 0) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Users className="text-slate-600" size={48} />
      <p className="text-slate-400 text-sm">Trash is empty.</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center bg-[#1e293b] p-6 rounded-2xl border border-slate-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trash2 className="text-rose-500" /> Team Trash
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleDeleteAll}
            disabled={deletingAll}
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={18} /> {deletingAll ? "Deleting..." : "Delete All"}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key="trash-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="overflow-x-auto bg-[#1e293b] rounded-2xl border border-slate-800 shadow-xl">
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
                    <td className="px-8 py-5 flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg overflow-hidden border border-slate-700">
                        <img src={member.image || "/placeholder-user.png"} alt={member.name} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-200 truncate max-w-xs">{member.name}</span>
                        <span className="text-[10px] uppercase text-slate-500 truncate max-w-xs">{member.email || "No email"}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="text-slate-300 font-medium truncate max-w-xs">{member.role}</div>
                      <div className="text-xs text-slate-500 mt-1 truncate max-w-xs">{member.expertise}</div>
                    </td>
                    <td className="px-8 py-5 text-right space-x-2">
                      <button
                        onClick={() => handleRestore(member.id)}
                        disabled={processingId === member.id}
                        className="p-2 cursor-pointer text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(member.id)}
                        disabled={processingId === member.id}
                        className="p-2 cursor-pointer text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}