"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

import { useTeam } from "@/components/Hooks/useTeam";
import { deleteTeam, upsertTeam } from "@/app/ServerActions/team";
import { TeamForm } from "./TeamForm";

export default function AdminTeamPage() {
  // 1. Hook Integration
  const { team, loading, refresh } = useTeam();

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  // 2. Edit Handler
  const handleEdit = (member: any) => {
    setEditingMember(member);
    setShowForm(true);
  };

  // 3. Delete Confirmation (Matches your Notices logic)
  const handleDelete = (member: any) => {
    toast(`Delete ${member.name}?`, {
      description: "Are you sure you want to delete this notice?",
      action: {
        label: "Delete",
        onClick: () => executeDelete(member.id),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
      duration: 5000,
    });
  };

  // 3.5 Execution of Delete
  const executeDelete = async (id: string) => {
    try {
      const res = await deleteTeam(id);
      if (res.success) {
        toast.success("Team member removed successfully");
        refresh();
      } else {
        toast.error(res.error || "Failed to delete member");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    }
  };

  // 4. Form Submit Handler
  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (editingMember?.id) {
        formData.append("id", editingMember.id);
      }

      const res = await upsertTeam(formData);

      if (res.success) {
        toast.success(editingMember ? "Member updated successfully" : "New member added");
        setShowForm(false);
        setEditingMember(null);
        refresh();
      } else {
        toast.error(res.error || "Error saving member");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. Loading State
  if (loading && team.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
        <p className="text-slate-400 font-medium">Loading Team Directory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[#1e293b] p-6 rounded-2xl border border-slate-800 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl">
            <Users className="text-emerald-500" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Team Management</h1>
            <p className="text-slate-400 text-sm">Manage your organization's core members</p>
          </div>
        </div>

        {!showForm && (
          <button
            onClick={() => {
              setEditingMember(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all cursor-pointer"
          >
            <Plus size={20} /> Add Member
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {showForm ? (
          <motion.div
            key="team-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <TeamForm
              key={editingMember?.id || "new"}
              initialData={editingMember}
              isSubmitting={isSubmitting}
              onClose={() => {
                setShowForm(false);
                setEditingMember(null);
              }}
              onSubmit={handleFormSubmit}
            />
          </motion.div>
        ) : (
          <motion.div
            key="team-table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1e293b] rounded-2xl border border-slate-800 overflow-hidden shadow-xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-8 py-5">Member</th>
                    <th className="px-8 py-5">Role & Expertise</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {team.map((member) => (
                    <tr key={member.id} className="group hover:bg-slate-800/30 transition-all">
                      <td className="px-8 py-5 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-slate-900 overflow-hidden relative border border-slate-700">
                          <img
                            src={member.image || "/placeholder-user.png"}
                            alt={member.name}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-200 group-hover:text-emerald-400 transition">
                            {member.name}
                          </span>
                          <span className="text-[10px] uppercase text-slate-500 mt-1">
                            {member.email || "No email"}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="text-slate-300 font-medium">{member.role}</div>
                        <div className="text-xs text-slate-500 mt-1">{member.expertise}</div>
                      </td>
                      <td className="px-8 py-5 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all cursor-pointer"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(member)}
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

            {/* Empty State */}
            {team.length === 0 && !loading && (
              <div className="p-24 text-center">
                <Users className="text-slate-600 mx-auto mb-4" size={40} />
                <p className="text-slate-400 text-sm">No team members found in the directory.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}