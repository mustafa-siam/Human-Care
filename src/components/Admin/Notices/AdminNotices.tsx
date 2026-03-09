"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Pencil, Loader2, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import Swal from "sweetalert2";

import { useNotices } from "@/components/Hooks/useNotices";
import { moveNoticeToTrash, upsertNotice } from "@/app/ServerActions/notice";
import NoticeForm from "./NoticeForm";

export default function AdminNotices() {
  const { notices, latestNotices, loading, refresh } = useNotices();
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allNotices = [...latestNotices, ...notices];

  const handleEdit = (notice: any) => {
    setEditingNotice(notice);
    setShowForm(true);
  };

  // Soft delete (move to trash)
  const handleTrash = async (id: string) => {
    const result = await Swal.fire({
      title: "Move notice to trash?",
      text: "You can restore it later from trash.",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, move to trash",
    });

    if (result.isConfirmed) {
      const res = await moveNoticeToTrash(id);
      if (res.success) {
        toast.success("Notice moved to trash");
        refresh();
      } else {
        toast.error(res.error || "Failed to move notice");
      }
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await upsertNotice(formData);
      if (res.success) {
        toast.success(editingNotice ? "Notice updated successfully" : "Notice published");
        setShowForm(false);
        setEditingNotice(null);
        refresh();
      } else {
        toast.error(res.error || "Failed to save notice");
      }
    } catch (err) {
      toast.error("Unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && allNotices.length === 0) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1e293b] p-6 rounded-2xl border border-slate-800 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <Megaphone className="text-emerald-500" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Notice Board</h1>
            <p className="text-slate-400 text-sm">Manage public announcements</p>
          </div>
        </div>

        <div className="flex gap-2">
           {/* Trash Link */}
          <Link
            href="/admin/notices/trash"
            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg transition"
          >
            <Trash2 size={20} /> Trash Bin
          </Link>
          {/* New Notice */}
          {!showForm && (
            <button
              onClick={() => { setEditingNotice(null); setShowForm(true); }}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg transition"
            >
              <Plus size={20} /> New Notice
            </button>
          )}

         
        </div>
      </div>

      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <NoticeForm
              key={editingNotice?.id || "new"}
              initialData={editingNotice}
              onClose={() => { setShowForm(false); setEditingNotice(null); }}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Desktop Table */}
            <div className="hidden md:block bg-[#1e293b] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-8 py-5">Notice</th>
                      <th className="px-8 py-5">Date</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {allNotices.map((notice) => (
                      <tr key={notice.id} className="group hover:bg-slate-800/30 transition">
                        <td className="px-8 py-5 flex items-center gap-4">
                          {notice.image && <img src={notice.image} className="w-12 h-12 rounded-lg object-cover border border-slate-700" />}
                          <div className="flex flex-col">
                            <span className="font-bold text-white group-hover:text-emerald-400 transition line-clamp-1 max-w-xs">{notice.slug}</span>
                            <span className="text-[10px] uppercase text-slate-500 mt-1 truncate max-w-xs">{notice.type}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-slate-400 text-sm">{new Date(notice.date).toLocaleDateString()}</td>
                        <td className="px-8 py-5">
                          {notice.latest ? (
                            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">Featured</span>
                          ) : (
                            <span className="px-3 py-1 bg-slate-700/30 text-slate-500 text-xs rounded-full">Archived</span>
                          )}
                        </td>
                        <td className="px-8 py-5 text-right space-x-2">
                          <button onClick={() => handleEdit(notice)} className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all"><Pencil size={18} /></button>
                          <button onClick={() => handleTrash(notice.id)} className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg cursor-pointer"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {allNotices.length === 0 && !loading && (
                <div className="p-12 text-center">
                  <Megaphone className="text-slate-600 mx-auto mb-4" size={40} />
                  <p className="text-slate-400 text-sm">No notices available. Create your first notice.</p>
                </div>
              )}
            </div>

            {/* Mobile Cards */}
            <div className="flex flex-col gap-4 md:hidden">
              {allNotices.map((notice) => (
                <div key={notice.id} className="bg-[#1e293b] border border-slate-800 rounded-2xl p-4 shadow hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    {notice.image && <img src={notice.image} className="w-16 h-16 rounded-lg object-cover border border-slate-700" />}
                    <div className="flex-1">
                      <div className="font-bold text-white truncate">{notice.slug}</div>
                      <div className="text-slate-400 text-xs truncate">{notice.type}</div>
                      <div className="text-slate-400 text-sm mt-1">{new Date(notice.date).toLocaleDateString()}</div>
                      <div className="mt-1">
                        {notice.latest ? (
                          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">Featured</span>
                        ) : (
                          <span className="px-2 py-1 bg-slate-700/30 text-slate-500 text-xs rounded-full">Archived</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={() => handleEdit(notice)} className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all"><Pencil size={16} /></button>
                    <button onClick={() => handleTrash(notice.id)} className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}