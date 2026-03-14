 "use client";
import { useState } from "react";
import { Trash2, Loader2, Megaphone, RotateCcw, Calendar, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { useNotices } from "@/components/Hooks/useNotices";
import { restoreNotice, deleteNoticePermanent } from "@/app/ServerActions/notice";

export default function AdminNoticeTrash() {
  const { notices: trashedNotices, loading, refresh } = useNotices(undefined, true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [deletingAll, setDeletingAll] = useState(false);

  const handleRestore = async (id: string) => {
    setProcessingId(id);
    try {
      const res = await restoreNotice(id);
      if (res.success) {
        toast.success("Notice restored successfully");
        refresh();
      } else {
        toast.error("Restore failed");
      }
    } catch (err) {
      toast.error("Error restoring notice");
    } finally {
      setProcessingId(null);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Permanent Delete?",
      text: "You won't be able to revert this!",
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
      const res = await deleteNoticePermanent(id);
      if (res.success) {
        toast.success("Notice deleted forever");
        refresh();
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      toast.error("Error deleting notice");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDeleteAll = async () => {
    if (!trashedNotices.length) return toast("Trash is empty");

    const result = await Swal.fire({
      title: "Purge All Notices?",
      text: `Permanently delete all ${trashedNotices.length} notices?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      confirmButtonText: "Yes, Delete All",
      background: "#1e293b",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingAll(true);
      // Concurrent deletion for speed
      await Promise.all(trashedNotices.map((n) => deleteNoticePermanent(n.id)));
      toast.success("All notices purged");
      refresh();
    } catch (error) {
      toast.error("Failed to clear trash");
    } finally {
      setDeletingAll(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
      <p className="text-slate-400 animate-pulse">Scanning trash...</p>
    </div>
  );

  if (!trashedNotices.length) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 px-4 text-center">
      <div className="bg-slate-800/50 p-6 rounded-full">
        <Megaphone className="text-slate-600" size={48} />
      </div>
      <p className="text-slate-400 font-medium">No trashed notices found.</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-6 md:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#1e293b] p-5 md:p-6 rounded-2xl border border-slate-800 gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="bg-rose-500/10 p-2 rounded-lg">
            <Trash2 className="text-rose-500" size={24} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Notice Trash</h1>
            <p className="text-xs text-slate-500 md:hidden">Total: {trashedNotices.length}</p>
          </div>
        </div>
        <button
          onClick={handleDeleteAll}
          disabled={deletingAll}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 text-sm"
        >
          {deletingAll ? <Loader2 className="animate-spin" size={18} /> : <AlertCircle size={18} />}
          {deletingAll ? "Deleting..." : "Delete All"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          
          {/* DESKTOP TABLE VIEW */}
          <div className="hidden md:block overflow-hidden bg-[#1e293b] rounded-2xl border border-slate-800 shadow-xl">
            <table className="w-full text-left">
              <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-8 py-5">Notice Info</th>
                  <th className="px-8 py-5">Date</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {trashedNotices.map(notice => (
                  <tr key={notice.id} className="group hover:bg-slate-800/30 transition-all">
                    <td className="px-8 py-5 flex items-center gap-4">
                      {notice.image && (
                        <img src={notice.image} className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0" alt="" />
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-slate-200 truncate max-w-md">{notice.slug}</span>
                        <span className="text-[10px] font-semibold uppercase text-slate-500 tracking-wider">{notice.type}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-400 text-sm">
                      {new Date(notice.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleRestore(notice.id)}
                          disabled={processingId === notice.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all text-sm font-medium"
                        >
                          <RotateCcw size={14} /> Restore
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(notice.id)}
                          disabled={processingId === notice.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all text-sm font-medium"
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

          {/* MOBILE CARD VIEW */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {trashedNotices.map(notice => (
              <div key={notice.id} className="bg-[#1e293b] p-5 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
                <div className="flex items-start gap-4">
                  {notice.image && (
                    <img src={notice.image} className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0" alt="" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase text-emerald-500 tracking-widest mb-1">{notice.type}</div>
                    <h3 className="font-bold text-slate-100 text-base leading-snug truncate mb-2">{notice.slug}</h3>
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Calendar size={12} />
                      {new Date(notice.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => handleRestore(notice.id)}
                    disabled={processingId === notice.id}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-bold active:scale-95 transition-all disabled:opacity-50"
                  >
                    <RotateCcw size={16} /> Restore
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(notice.id)}
                    disabled={processingId === notice.id}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 text-rose-400 text-sm font-bold active:scale-95 transition-all disabled:opacity-50"
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