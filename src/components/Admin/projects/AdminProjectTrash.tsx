"use client";

import React, { useState } from "react";
import { Trash2, Loader2,} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { useProjects } from "@/components/Hooks/useProjects";
import { restoreProject, deleteProjectPermanent } from "@/app/ServerActions/project";

export default function AdminProjectTrash() {
  const { projects: trashedProjects, loading, refresh } = useProjects(undefined, true); // fetch only trashed projects
  const [deletingAll, setDeletingAll] = useState(false);

  const handleRestore = async (id: string) => {
    const res = await restoreProject(id);
    if (res.success) {
      toast.success("Project restored");
      refresh();
    } else {
      toast.error("Restore failed");
    }
  };

  const handlePermanentDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Permanently delete this project?",
      text: "This action cannot be undone!",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete permanently",
    });
    if (!result.isConfirmed) return;

    const res = await deleteProjectPermanent(id);
    if (res.success) {
      toast.success("Project permanently deleted");
      refresh();
    } else {
      toast.error("Delete failed");
    }
  };

  const handleDeleteAll = async () => {
    if (!trashedProjects.length) return toast("Trash is empty");

    const result = await Swal.fire({
      title: "Delete all projects?",
      text: "This will permanently delete all trashed projects!",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete all!",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingAll(true);
      for (const project of trashedProjects) {
        await deleteProjectPermanent(project.id);
      }
      toast.success("All trashed projects deleted");
      refresh();
    } catch (error) {
      toast.error("Failed to delete all projects");
    } finally {
      setDeletingAll(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  );

  if (!trashedProjects.length) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Trash2 className="text-slate-600" size={48} />
      <p className="text-slate-400 text-sm">Trash is empty.</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#1e293b] p-6 rounded-2xl border border-slate-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trash2 className="text-rose-500" /> Project Trash
        </h1>
        <button
          onClick={handleDeleteAll}
          disabled={deletingAll}
          className="flex items-center gap-2 cursor-pointer bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={18} /> {deletingAll ? "Deleting..." : "Delete All"}
        </button>
      </div>

      {/* Trashed Projects Table */}
      <AnimatePresence>
        <motion.div key="trash-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="overflow-x-auto bg-[#1e293b] rounded-2xl border border-slate-800 shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-5">Project</th>
                  <th className="px-8 py-5">Location</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {trashedProjects.map(project => (
                  <tr key={project.id} className="group hover:bg-slate-800/30 transition-all cursor-pointer">
                    <td className="px-8 py-5 flex items-center gap-4">
                      {project.image && (
                        <img
                          src={project.image}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                        />
                      )}
                      <span className="font-bold text-slate-200 truncate max-w-xs">{project.title}</span>
                    </td>
                    <td className="px-8 py-5 text-slate-400 text-sm">{project.location}</td>
                    <td className="px-8 py-5 text-right space-x-2">
                      <button
                        onClick={() => handleRestore(project.id)}
                        className="p-2 text-emerald-400 cursor-pointer hover:bg-emerald-400/10 rounded-lg transition-all"
                        title="Restore Project"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(project.id)}
                        className="p-2 text-rose-400 cursor-pointer hover:bg-rose-400/10 rounded-lg transition-all"
                        title="Delete Permanently"
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