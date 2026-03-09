// components/AdminNoticeTrash.tsx
"use client";

import { useState } from "react";
import { Trash2, Loader2, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { useNotices } from "@/components/Hooks/useNotices";
import { restoreNotice, deleteNoticePermanent } from "@/app/ServerActions/notice";

export default function AdminNoticeTrash() {
  const { notices: trashedNotices, loading, refresh } = useNotices(undefined, true); // fetch only trashed
  const [deletingAll, setDeletingAll] = useState(false);

  const handleRestore = async (id: string) => {
    const res = await restoreNotice(id);
    if (res.success) {
      toast.success("Notice restored");
      refresh();
    } else {
      toast.error("Restore failed");
    }
  };

  const handlePermanentDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Permanently delete this notice?",
      text: "This action cannot be undone!",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete permanently",
    });
    if (!result.isConfirmed) return;

    const res = await deleteNoticePermanent(id);
    if (res.success) {
      toast.success("Notice permanently deleted");
      refresh();
    } else {
      toast.error("Delete failed");
    }
  };

  const handleDeleteAll = async () => {
    if (!trashedNotices.length) return toast("Trash is empty");

    const result = await Swal.fire({
      title: "Delete all notices?",
      text: "This will permanently delete all trashed notices!",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete all!",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingAll(true);
      for (const notice of trashedNotices) {
        await deleteNoticePermanent(notice.id);
      }
      toast.success("All trashed notices deleted");
      refresh();
    } catch (error) {
      toast.error("Failed to delete all notices");
    } finally {
      setDeletingAll(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  );

  if (!trashedNotices.length) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Megaphone className="text-slate-600" size={48} />
      <p className="text-slate-400 text-sm">Trash is empty.</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#1e293b] p-6 rounded-2xl border border-slate-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trash2 className="text-rose-500" /> Notice Trash
        </h1>
        <button
          onClick={handleDeleteAll}
          disabled={deletingAll}
          className="flex items-center gap-2 bg-rose-600 cursor-pointer hover:bg-rose-500 text-white px-4 py-2 rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={18} /> {deletingAll ? "Deleting..." : "Delete All"}
        </button>
      </div>

      {/* Trashed Notices Table */}
      <AnimatePresence>
        <motion.div key="trash-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="overflow-x-auto bg-[#1e293b] rounded-2xl border border-slate-800 shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-5">Notice</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {trashedNotices.map(notice => (
                  <tr key={notice.id} className="group hover:bg-slate-800/30 transition-all cursor-pointer">
                    <td className="px-8 py-5 flex items-center gap-4">
                      {notice.image && (
                        <img
                          src={notice.image}
                          className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-200 truncate max-w-xs">{notice.slug}</span>
                        <span className="text-[10px] uppercase text-slate-500 truncate max-w-xs">{notice.type}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-400 text-sm">{new Date(notice.date).toLocaleDateString()}</td>
                    <td className="px-8 py-5 text-right space-x-2">
                      <button
                        onClick={() => handleRestore(notice.id)}
                        className="p-2 text-emerald-400 cursor-pointer hover:bg-emerald-400/10 rounded-lg transition-all"
                      >
                        Restore
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(notice.id)}
                        className="p-2 text-rose-400 cursor-pointer hover:bg-rose-400/10 rounded-lg transition-all"
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