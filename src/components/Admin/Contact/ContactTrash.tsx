"use client";

import { useState } from "react";
import { Trash2, X, Calendar, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { restoreContact, deleteContactPermanent } from "@/app/ServerActions/contact";
import { useContacts } from "@/components/Hooks/useContact";

export default function AdminContactTrash() {
  const { contacts: trashedContacts, loading, refresh } = useContacts(undefined, true); // fetch trashed
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [deletingAll, setDeletingAll] = useState(false);

  const handleRestore = async (id: string) => {
    const res = await restoreContact(id);
    if (res.success) {
      toast.success("Message restored");
      refresh();
    }
  };

  const handlePermanentDelete = async (id: string) => {
    const res = await deleteContactPermanent(id);
    if (res.success) {
      toast.success("Message permanently deleted");
      refresh();
    }
  };

  const handleDeleteAll = async () => {
  if (!trashedContacts.length) return toast("Trash is already empty");

  // Show Sonner toast confirmation
  toast(`Delete all messages permanently?`, {
    action: {
      label: "Delete All",
      onClick: async () => {
        try {
          setDeletingAll(true);
          for (const msg of trashedContacts) {
            await deleteContactPermanent(msg.id);
          }
          toast.success("All trashed messages deleted");
          refresh();
        } catch (error) {
          console.error(error);
          toast.error("Failed to delete all messages");
        } finally {
          setDeletingAll(false);
        }
      },
    },
    cancel: {
      label: "Cancel",
      onClick: () => toast.dismiss(),
    },
  });
};

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Trash2 className="animate-spin text-rose-500" size={40} />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Trash2 className="text-rose-500" /> Trash
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage all deleted messages</p>
        </div>

        <button
          onClick={handleDeleteAll}
          disabled={deletingAll}
          className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-semibold transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Trash2 size={18} /> {deletingAll ? "Deleting..." : "Delete All"}
        </button>
      </div>

      {/* Trashed Messages */}
      <div className="flex flex-col gap-4">
        {trashedContacts.length === 0 && (
          <div className="text-slate-400 text-center py-10">Trash is empty</div>
        )}

        {trashedContacts.map((c: any) => (
          <div
            key={c.id}
            onClick={() => setSelectedMessage(c)}
            className="bg-[#1e293b] border border-slate-800 rounded-2xl p-4 shadow hover:shadow-lg cursor-pointer transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-white text-sm">{c.name}</div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleRestore(c.id); }}
                  className="p-1 text-emerald-400 hover:bg-emerald-400/10 rounded transition-all"
                >
                  Restore
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePermanentDelete(c.id); }}
                  className="p-1 text-rose-400 hover:bg-rose-400/10 rounded transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="text-slate-400 text-xs mb-1">{c.email}</div>
            <div className="text-emerald-400 text-xs font-semibold mb-1">{c.subject}</div>
            <div className="text-slate-500 text-[10px] flex items-center gap-1">
              <Calendar size={12} /> {new Date(c.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl md:max-w-2xl bg-[#1e293b] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Modal Content */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-800/30">
                <div>
                  <h2 className="text-2xl font-bold text-white leading-tight">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2.5 py-1 rounded-full">
                      <User size={12} /> {selectedMessage.name}
                    </span>
                    <span className="text-slate-500 text-xs flex items-center gap-1">
                      <Calendar size={12} /> {new Date(selectedMessage.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Email Address</p>
                    <p className="text-slate-200 text-sm break-all">{selectedMessage.email}</p>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Phone Number</p>
                    <p className="text-slate-200 text-sm">{selectedMessage.phone || "Not provided"}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest flex items-center gap-2">
                    Message
                  </p>
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap italic">
                    "{selectedMessage.message}"
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-800/20 border-t border-slate-800 flex justify-end gap-2">
                <button
                  onClick={() => handleRestore(selectedMessage.id)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all cursor-pointer"
                >
                  Restore
                </button>
                <button
                  onClick={() => handlePermanentDelete(selectedMessage.id)}
                  className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold transition-all cursor-pointer"
                >
                  Delete Permanently
                </button>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}