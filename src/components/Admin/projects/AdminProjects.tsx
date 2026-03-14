"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, MapPin} from "lucide-react";
import { motion } from "motion/react";
import { useProjects } from "@/components/Hooks/useProjects";
import { softDeleteProject, upsertProject } from "@/app/ServerActions/project";
import { ProjectForm } from "./ProjectForm";
import { ProgressBar } from "@/components/Hooks/ProgressBar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AdminProjectsPage() {
  const router = useRouter();
  const { projects, loading, refresh } = useProjects();

  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const confirmDelete = async (id: string) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This project will be moved to trash!",
    showCancelButton: true,
    confirmButtonColor: "#e11d48",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    executeDelete(id); // call softDeleteProject
  }
};

  const executeDelete = async (id: string) => {
  const res = await softDeleteProject(id);
  if (res.success) {
    toast.success("Project moved to trash");
    refresh(); // refresh list
  } else {
    toast.error("Failed to delete project");
  }
};

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (editingProject?.id) formData.append("id", editingProject.id);

      const res = await upsertProject(formData);
      if (res.success) {
        toast.success(editingProject ? "Project updated" : "Project created");
        setShowForm(false);
        setEditingProject(null);
        refresh();
      } else toast.error(res.error || "Error saving project");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && projects.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Project Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Create, update, or remove initiatives.
          </p>
        </div>

        <div className="flex gap-2">
          {/* Trash Bin Button */}
          <button
            onClick={() => router.push("/admin/projects/trash")}
            className="flex items-center gap-2  bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-rose-500/20 cursor-pointer"
          >
            <Trash2 size={18} /> Trash
          </button>

          {/* New Project Button */}
          {!showForm && (
            <button
              onClick={() => {
                setEditingProject(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
            >
              <Plus size={20} /> New Project
            </button>
          )}
        </div>
      </div>

      {/* Form */}
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
          {/* Desktop Table */}
          <div className="hidden md:block">
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
                    <td className="px-8 py-5 flex items-center gap-4">
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
                    </td>
                    <td className="px-8 py-5 text-slate-400 text-sm gap-2">
                      {project.location}
                    </td>
                    <td className="px-8 py-5">
                      <ProgressBar progress={project.progress} showText className="w-32" />
                    </td>
                    <td className="px-8 py-5 text-right space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="p-2.5 text-cyan-400 cursor-pointer hover:bg-cyan-400/10 rounded-xl transition-all"
                        title="Edit Project"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => confirmDelete(project.id)}
                        className="p-2.5 text-rose-400 cursor-pointer hover:bg-rose-400/10 rounded-xl transition-all"
                        title="Move to Trash"
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
          <div className="md:hidden flex flex-col gap-4 p-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-20 rounded-lg bg-slate-900 overflow-hidden border border-slate-700">
                    <img
                      src={project.image}
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-slate-200">{project.title}</h2>
                    <div className="flex items-center gap-1 text-slate-400 text-sm mt-1">
                      <MapPin size={14} className="text-emerald-500" />
                      {project.location}
                    </div>
                    <div className="mt-2">
                      <ProgressBar progress={project.progress} showText className="w-full" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => confirmDelete(project.id)}
                    className="p-2 text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

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