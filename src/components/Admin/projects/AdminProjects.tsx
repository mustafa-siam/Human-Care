"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useProjects } from "@/components/Hooks/useProjects";
import { deleteProject, upsertProject } from "@/app/ServerActions/project";
import { ProjectForm } from "./ProjectForm";
import { ProgressBar } from "@/components/Hooks/ProgressBar";
import { toast } from "sonner";

export default function AdminProjectsPage() {
  const { projects, loading, refresh } = useProjects();

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setShowForm(true);
  };

  // SONNER DELETE CONFIRMATION
  const confirmDelete = (id: string) => {
    toast("Are you sure you want to delete this project?", {
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
    const res = await deleteProject(id);

    if (res.success) {
      toast.success("Project deleted successfully");
      refresh();
    } else {
      toast.error("Failed to delete project");
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);

    try {
      if (editingProject?.id) {
        formData.append("id", editingProject.id);
      }

      const res = await upsertProject(formData);

      if (res.success) {
        toast.success(editingProject ? "Project updated" : "Project created");
        setShowForm(false);
        setEditingProject(null);
        refresh();
      } else {
        toast.error(res.error || "Error saving project");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && projects.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
        <p className="text-slate-400 font-medium">Fetching database...</p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Project Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Create, update, or remove initiatives.
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => {
              setEditingProject(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Plus size={20} /> New Project
          </button>
        )}
      </div>

      {/* FORM */}
      {showForm ? (
        <ProjectForm
          initialData={editingProject}
          isSubmitting={isSubmitting}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#1e293b] rounded-2xl border border-slate-800 overflow-hidden shadow-xl"
        >
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-slate-800/50 text-slate-400 text-[10px] uppercase font-bold tracking-[0.15em] border-b border-slate-800">
              <tr>
                <th className="px-8 py-5">Initiative</th>
                <th className="px-8 py-5">Location</th>
                <th className="px-8 py-5">Completion</th>
                <th className="px-8 py-5 text-right">Manage</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="group hover:bg-slate-800/30 transition-all"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-16 rounded-lg bg-slate-900 overflow-hidden relative border border-slate-700 shadow-inner">
                        <img
                          src={project.image}
                          alt=""
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <span className="font-bold text-slate-200">
                        {project.title}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-5 text-slate-400 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-emerald-500" />
                      {project.location}
                    </div>
                  </td>

                  <td className="px-8 py-5">
                    <ProgressBar
                      progress={project.progress}
                      showText={true}
                      className="w-32"
                    />
                  </td>

                  <td className="px-8 py-5 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2.5 text-cyan-400 hover:bg-cyan-400/10 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-cyan-400/20"
                      title="Edit Project"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => confirmDelete(project.id)}
                      className="p-2.5 text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-rose-400/20"
                      title="Delete Project"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {projects.length === 0 && !loading && (
            <div className="p-24 text-center">
              <div className="text-slate-600 mb-2 text-4xl">📭</div>
              <p className="text-slate-500 text-sm">
                Your impact history is currently empty.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}