"use client";

import React, { useState } from "react";
import { Plus, Trash2, Pencil, Loader2, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useNotices } from "@/components/Hooks/useNotices";
import { deleteNotice, upsertNotice } from "@/app/ServerActions/notice";
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

  const confirmDelete = (id: string) => {
    toast("Are you sure you want to delete this notice?", {
      action: {
        label: "Delete",
        onClick: () => executeDelete(id),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
      duration: 5000,
    });
  };

  const executeDelete = async (id: string) => {
    const res = await deleteNotice(id);

    if (res.success) {
      toast.success("Notice deleted successfully");
      refresh();
    } else {
      toast.error("Failed to delete notice");
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      const res = await upsertNotice(formData);

      if (res.success) {
        toast.success(
          editingNotice ? "Notice updated successfully" : "Notice published"
        );

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

  if (loading && allNotices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
        <p className="text-slate-400">Loading notices...</p>
      </div>
    );
  }

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

        {!showForm && (
          <button
            onClick={() => {
              setEditingNotice(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition"
          >
            <Plus size={20} /> New Notice
          </button>
        )}
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
              onClose={() => {
                setShowForm(false);
                setEditingNotice(null);
              }}
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1e293b] rounded-2xl border border-slate-800 overflow-hidden shadow-xl"
          >
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
                    <tr
                      key={notice.id}
                      className="group hover:bg-slate-800/30 transition"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          {notice.image && (
                            <img
                              src={notice.image}
                              className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                            />
                          )}
                          <div className="flex flex-col">
                            <span className="font-bold text-white group-hover:text-emerald-400 transition line-clamp-1">
                              {notice.slug}
                            </span>
                            <span className="text-[10px] uppercase text-slate-500 mt-1">
                              {notice.type}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-8 py-5 text-slate-400 text-sm">
                        {new Date(notice.date).toLocaleDateString()}
                      </td>

                      <td className="px-8 py-5">
                        {notice.latest ? (
                          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
                            Featured
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-slate-700/30 text-slate-500 text-xs rounded-full">
                            Archived
                          </span>
                        )}
                      </td>

                      <td className="px-8 py-5 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(notice)}
                          className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => confirmDelete(notice.id)}
                          className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {allNotices.length === 0 && !loading && (
              <div className="p-24 text-center">
                <Megaphone className="text-slate-600 mx-auto mb-4" size={40} />
                <p className="text-slate-400 text-sm">
                  No notices available. Create your first notice.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}