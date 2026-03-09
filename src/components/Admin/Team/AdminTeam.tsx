"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import Link from "next/link";

import { useTeam } from "@/components/Hooks/useTeam";
import { moveTeamToTrash, upsertTeam } from "@/app/ServerActions/team";
import { TeamForm } from "./TeamForm";

export default function AdminTeamPage() {
  const { team, loading, refresh } = useTeam();

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setShowForm(true);
  };

  /**
   * MOVE TO TRASH CONFIRMATION
   */
  const handleDelete = async (member: any) => {
    const result = await Swal.fire({
      title: "Move to Trash?",
      text: `${member.name} will be moved to trash.`,
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, move",
    });

    if (result.isConfirmed) {
      executeMoveToTrash(member.id);
    }
  };

  /**
   * EXECUTE MOVE TO TRASH
   */
  const executeMoveToTrash = async (id: string) => {
    try {
      const res = await moveTeamToTrash(id);

      if (res.success) {
        toast.success("Team member moved to Trash");
        refresh();
      } else {
        toast.error("Failed to move member");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    }
  };

  /**
   * FORM SUBMIT
   */
  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      if (editingMember?.id) formData.append("id", editingMember.id);

      const res = await upsertTeam(formData);

      if (res.success) {
        toast.success(
          editingMember ? "Member updated successfully" : "New member added"
        );

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

  if (loading && team.length === 0)
    return (
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
            <Users className="text-emerald-500" size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Team Management
            </h1>
            <p className="text-slate-400 text-sm">
              Manage your organization's core members
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          {/* Trash Button */}
          <Link
            href="/admin/team/trash"
            className="flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl font-semibold transition-all"
          >
            <Trash2 size={18} />
            Trash Bin
          </Link>

          {!showForm && (
            <button
              onClick={() => {
                setEditingMember(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg transition-all"
            >
              <Plus size={20} /> Add Member
            </button>
          )}
        </div>
      </div>

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
          <motion.div key="team-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Desktop Table */}
            <div className="hidden md:block bg-[#1e293b] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
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
                      <tr
                        key={member.id}
                        className="group hover:bg-slate-800/30 transition-all"
                      >
                        <td className="px-8 py-5 flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-slate-900 overflow-hidden border border-slate-700">
                            <img
                              src={member.image || "/placeholder-user.png"}
                              alt={member.name}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <div className="flex flex-col">
                            <span className="font-bold text-slate-200">
                              {member.name}
                            </span>

                            <span className="text-[10px] uppercase text-slate-500 mt-1">
                              {member.email || "No email"}
                            </span>
                          </div>
                        </td>

                        <td className="px-8 py-5">
                          <div className="text-slate-300 font-medium">
                            {member.role}
                          </div>

                          <div className="text-xs text-slate-500 mt-1">
                            {member.expertise}
                          </div>
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

              {team.length === 0 && !loading && (
                <div className="p-12 text-center">
                  <Users className="text-slate-600 mx-auto mb-4" size={40} />
                  <p className="text-slate-400 text-sm">
                    No team members found in the directory.
                  </p>
                </div>
              )}
            </div>

            {/* Mobile Cards */}
            <div className="flex flex-col gap-4 md:hidden">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-[#1e293b] border border-slate-800 rounded-2xl p-4 shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg overflow-hidden border border-slate-700">
                      <img
                        src={member.image || "/placeholder-user.png"}
                        alt={member.name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="font-bold text-white">
                        {member.name}
                      </div>

                      <div className="text-slate-400 text-xs">
                        {member.email || "No email"}
                      </div>

                      <div className="text-slate-300 text-sm mt-1">
                        {member.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 text-cyan-400 cursor-pointer hover:bg-cyan-400/10 rounded-lg"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(member)}
                      className="p-2 cursor-pointer text-rose-400 hover:bg-rose-400/10 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
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