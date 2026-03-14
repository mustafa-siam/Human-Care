"use client";

import React, { useState } from "react";
import { Trash2, Loader2, RotateCcw, MapPin, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { useProjects } from "@/components/Hooks/useProjects";
import { restoreProject, deleteProjectPermanent } from "@/app/ServerActions/project";

export default function AdminProjectTrash() {
  const { projects: trashedProjects, loading, refresh } = useProjects(undefined, true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);

  const handleRestore = async (id: string) => {
    setProcessingId(id);
    try {
      const res = await restoreProject(id);
      if (res.success) {
        toast.success("Project restored");
        refresh();
      } else {
        toast.error("Restore failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setProcessingId(null);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Confirm Permanent Deletion",
      text: "This project will be gone forever!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it",
      background: "#1e293b",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    setProcessingId(id);
    try {
      const res = await deleteProjectPermanent(id);
      if (res.success) {
        toast.success("Project purged");
        refresh();
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteAll = async () => {
    if (!trashedProjects.length) return toast("Trash is already empty");

    const result = await Swal.fire({
      title: "Purge all projects?",
      text: `You are about to permanently delete ${trashedProjects.length} projects!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Yes, clear everything",
      background: "#1e293b",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingAll(true);
      // Faster concurrent deletion
      await Promise.all(trashedProjects.map((p) => deleteProjectPermanent(p.id)));
      toast.success("Trash cleared successfully");
      refresh();
    } catch (error) {
      toast.error("Failed to delete all projects");
    } finally {
      setDeletingAll(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
      <p className="text-slate-400">Loading trash...</p>
    </div>
  );

  if (!trashedProjects.length) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 px-4 text-center">
      <div className="bg-slate-800/50 p-6 rounded-full">
        <Trash2 className="text-slate-600" size={48} />
      </div>
      <p className="text-slate-400 font-medium">Your project trash is empty.</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6 md:py-10">
      {/* Header */}
      <div className="flex flex-col sm:row justify-between items-start sm:items-center bg-[#1e293b] p-5 md:p-6 rounded-2xl border border-slate-800 gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-rose-500/10 p-2 rounded-lg">
            <Trash2 className="text-rose-500" size={24} />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Project Trash</h1>
        </div>
        <button
          onClick={handleDeleteAll}
          disabled={deletingAll}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 text-sm"
        >
          {deletingAll ? <Loader2 className="animate-spin" size={18} /> : <AlertTriangle size={18} />}
          {deletingAll ? "Purging..." : "Empty All Projects"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          
          {/* DESKTOP TABLE (md and up) */}
          <div className="hidden md:block overflow-hidden bg-[#1e293b] rounded-2xl border border-slate-800 shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-5">Project Information</th>
                  <th className="px-8 py-5">Location</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {trashedProjects.map(project => (
                  <tr key={project.id} className="group hover:bg-slate-800/30 transition-all">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        {project.image ? (
                          <img src={project.image} className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0" alt="" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                            <MapPin className="text-slate-600" size={20} />
                          </div>
                        )}
                        <span className="font-bold text-slate-200 truncate max-w-xs">{project.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-400 text-sm">{project.location}</td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleRestore(project.id)}
                          disabled={processingId === project.id}
                          className="flex items-center gap-1 px-3 py-1.5 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all text-sm font-semibold disabled:opacity-50"
                        >
                          <RotateCcw size={14} /> Restore
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(project.id)}
                          disabled={processingId === project.id}
                          className="flex items-center gap-1 px-3 py-1.5 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all text-sm font-semibold disabled:opacity-50"
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

          {/* MOBILE CARDS (below md) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {trashedProjects.map(project => (
              <div key={project.id} className="bg-[#1e293b] p-5 rounded-2xl border border-slate-800 space-y-4 shadow-md">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-xl overflow-hidden border border-slate-700 shrink-0 bg-slate-800">
                    {project.image ? (
                      <img src={project.image} alt="" className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><MapPin className="text-slate-600" /></div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-slate-100 text-lg leading-tight mb-1 truncate">{project.title}</h3>
                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                      <MapPin size={12} />
                      <span className="truncate">{project.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => handleRestore(project.id)}
                    disabled={processingId === project.id}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-bold active:scale-95 transition-all"
                  >
                    <RotateCcw size={16} /> Restore
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(project.id)}
                    disabled={processingId === project.id}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 text-rose-400 text-sm font-bold active:scale-95 transition-all"
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