"use client";

import { useState } from "react";
import { Trash2, Mail, Calendar, X, User, MessageSquare, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { moveToTrash } from "@/app/ServerActions/contact";
import { useContacts } from "@/components/Hooks/useContact";
import Link from "next/link";
import Swal from "sweetalert2";

export default function AdminContacts() {
  const { contacts, loading, refresh } = useContacts(undefined, false); // fetch active contacts
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const confirmMoveToTrash = async (
  e: React.MouseEvent,
  id: string,
  name: string
) => {
  e.stopPropagation();

  const result = await Swal.fire({
    title: "Move to Trash?",
    text: `${name} Message will be moved to trash.`,
    showCancelButton: true,
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Yes, move it",
  });

  if (result.isConfirmed) {
    executeMoveToTrash(id);
  }
};

  const executeMoveToTrash = async (id: string) => {
    const res = await moveToTrash(id);
    if (res.success) {
      toast.success("Message moved to Trash");
      refresh();
      if (selectedMessage?.id === id) setSelectedMessage(null);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
    </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
  <div>
    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
      <Mail className="text-emerald-500" /> Contacts
    </h1>
    <p className="text-slate-400 text-sm mt-1">Manage all user messages</p>
  </div>

 <Link
  href="/admin/contacts/trash"
  className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-200"
>
  <Trash2 size={18} className="text-white" />
  Trash Bin
</Link>
</div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-[#1e293b] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <table className="w-full text-left border-separate border-spacing-0">
          <thead className="bg-slate-800/50 text-slate-400 text-[10px] uppercase font-bold tracking-[0.15em]">
            <tr>
              <th className="px-6 py-5">Sender</th>
              <th className="px-6 py-5">Subject</th>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {contacts.map((c: any) => (
              <tr
                key={c.id}
                onClick={() => setSelectedMessage(c)}
                className="group hover:bg-emerald-500/5 transition-all cursor-pointer"
              >
                <td className="px-6 py-5">
                  <div className="text-slate-200 font-bold text-sm">{c.name}</div>
                  <div className="text-slate-500 text-xs">{c.email}</div>
                </td>
                <td className="px-6 py-5 text-emerald-400 text-xs font-bold uppercase">{c.subject}</td>
                <td className="px-6 py-5 align-top whitespace-nowrap text-slate-400 text-xs">
                  {new Date(c.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-5 text-right">
                  <button
                    onClick={(e) => confirmMoveToTrash(e, c.id, c.name)}
                    className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {contacts.map((c: any) => (
          <div
            key={c.id}
            onClick={() => setSelectedMessage(c)}
            className="bg-[#1e293b] border border-slate-800 rounded-2xl p-4 shadow hover:shadow-lg cursor-pointer transition-all"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-bold text-white text-sm">{c.name}</div>
              <button
                onClick={(e) => confirmMoveToTrash(e, c.id, c.name)}
                className="p-1 text-rose-400 hover:bg-rose-400/10 rounded transition-all"
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Trash2 size={16} />
              </button>
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
                    <MessageSquare size={12} /> Full Message
                  </p>
                  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-slate-300 leading-relaxed whitespace-pre-wrap italic">
                    "{selectedMessage.message}"
                  </div>
                </div>
              </div>

              <div className="p-6 bg-slate-800/20 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all cursor-pointer"
                >
                  Done Reading
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}