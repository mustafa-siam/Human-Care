"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, Loader2, ImageIcon, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"; 
import { useGallery } from "@/components/Hooks/useGallery"; 
import { toast } from "sonner";
import { deleteGalleryItem, upsertGalleryItem } from "@/app/ServerActions/galleryItem";
import GalleryForm from "./GalleryForm";

export default function AdminGalleryPage() {
  const { items, loading, refresh } = useGallery();
  
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  // Replaced window.confirm with Sonner interactive toast
  const handleDeleteRequest = (id: number, title: string) => {
    toast(`Delete "${title}"?`, {
      description: "Are you sure you want to delete this ?",
      action: {
        label: "Delete",
        onClick: () => executeDelete(id),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.dismiss(),
      },
    });
  };

  const executeDelete = async (id: number) => {
    const res = await deleteGalleryItem(id);
    if (res.success) {
      toast.success("Item deleted successfully");
      refresh();
    } else {
      toast.error("Failed to delete item");
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      if (editingItem?.id) {
        formData.append("id", editingItem.id.toString());
      }

      const res = await upsertGalleryItem(formData);
      
      if (res.success) {
        toast.success(editingItem ? "Gallery updated" : "Photo published");
        setShowForm(false);
        setEditingItem(null);
        refresh();
      } else {
        toast.error(res.error || "Error saving gallery item");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && items.length === 0) return (
    <div className="flex flex-col items-center justify-center h-96 gap-4">
      <Loader2 className="animate-spin text-emerald-500" size={40} />
      <p className="text-slate-400 font-medium">Fetching gallery database...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Gallery Management</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your visual impact stories.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Plus size={20} /> New Photo
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
            <GalleryForm
              initialData={editingItem}
              isSubmitting={isSubmitting}
              onClose={() => setShowForm(false)}
              onSubmit={handleFormSubmit}
            />
          </motion.div>
        ) : (
          <motion.div 
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#1e293b] rounded-2xl border border-slate-800 overflow-hidden shadow-xl"
          >
            <table className="w-full text-left border-separate border-spacing-0">
              <thead className="bg-slate-800/50 text-slate-400 text-[10px] uppercase font-bold tracking-[0.15em] border-b border-slate-800">
                <tr>
                  <th className="px-8 py-5">Media</th>
                  <th className="px-8 py-5">Category</th>
                  <th className="px-8 py-5 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {items.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-800/30 transition-all">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-16 rounded-lg bg-slate-900 overflow-hidden relative border border-slate-700 shadow-inner">
                          <img 
                            src={item.url} 
                            alt="" 
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" 
                          />
                        </div>
                        <span className="font-bold text-slate-200">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-400 text-sm">
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-emerald-500" />
                        <span className="capitalize">{item.category}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right space-x-2">
                      <button 
                        onClick={() => handleEdit(item)} 
                        className="p-2.5 text-cyan-400 hover:bg-cyan-400/10 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-cyan-400/20"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteRequest(item.id, item.title)} 
                        className="p-2.5 text-rose-400 hover:bg-rose-400/10 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-rose-400/20"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {items.length === 0 && !loading && (
              <div className="p-24 text-center">
                <ImageIcon className="mx-auto text-slate-700 mb-4" size={48} />
                <p className="text-slate-500 text-sm">Database is empty.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}