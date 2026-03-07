"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { X, Trash2, Loader2, Upload, ImageIcon, Tag, Calendar, AlignLeft, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

interface GalleryFormData {
  id?: string;
  title: string;
  category: string;
  description: string;
  date: string;
}

interface GalleryFormProps {
  initialData?: any;
  onSubmit: (data: FormData) => Promise<void>;
  onClose: () => void;
  isSubmitting: boolean;
}

const CATEGORIES = ['education', 'healthcare', 'water', 'emergency', 'community'];

export default function GalleryForm({
  initialData,
  onSubmit,
  onClose,
  isSubmitting,
}: GalleryFormProps) {
  
  const formatDateForInput = (dateInput: any) => {
    if (!dateInput) return "";
    const d = new Date(dateInput);
    return d.toISOString().split("T")[0];
  };

  const { register, handleSubmit, formState: { errors } } = useForm<GalleryFormData>({
    defaultValues: {
      id: initialData?.id?.toString() || "",
      title: initialData?.title || "",
      category: initialData?.category || "education",
      description: initialData?.description || "",
      date: formatDateForInput(initialData?.date),
    },
  });

  /* ---------- IMAGE STATE ---------- */
  const [previewImage, setPreviewImage] = useState<string>(initialData?.url || "");
  const [newFile, setNewFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setNewFile(null);
    setPreviewImage("");
  };

  /* ---------- SUBMIT ---------- */
  const handleFormSubmit = async (values: GalleryFormData) => {
    // If no image is selected and no existing image exists, stop submission
    if (!previewImage) {
      alert("Please upload an image first");
      return;
    }

    const data = new FormData();
    if (initialData?.id) data.append("id", initialData.id.toString());
    
    data.append("title", values.title);
    data.append("category", values.category);
    data.append("description", values.description);
    data.append("date", values.date);

    if (newFile) {
      data.append("image", newFile);
    } else {
      data.append("existingImage", initialData?.url || "");
    }

    await onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#1e293b] p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-4xl mx-auto"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
            <ImageIcon size={20} />
          </div>
          {initialData ? "Update Gallery Item" : "Add to Gallery"}
        </h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition cursor-pointer p-2 hover:bg-slate-800 rounded-full">
          <X size={22} />
        </button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* TITLE */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
              <ImageIcon size={14} className="text-emerald-500" /> Image Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="e.g. Distribution in Sylhet"
              className={`w-full bg-[#0f172a] border ${errors.title ? 'border-rose-500' : 'border-slate-700'} rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all`}
            />
            {errors.title && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-wider">{errors.title.message}</p>}
          </div>

          {/* CATEGORY */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
              <Tag size={14} className="text-emerald-500" /> Album Category
            </label>
            <div className="relative">
              <select
                {...register("category")}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 pr-10 text-white outline-none appearance-none cursor-pointer capitalize"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>

          {/* DATE with Internal Icon */}
          <div className="space-y-2">
<label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
<Calendar size={14} /> Event Date
</label>
 <input type="date"{...register("date", { required: true })} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all" />
 </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
             Photo Attachment
          </label>
          {previewImage ? (
            <div className="relative h-64 rounded-xl overflow-hidden border border-slate-700 group shadow-inner">
              <img src={previewImage} className="w-full h-full object-cover" alt="Preview" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button type="button" onClick={handleRemoveImage} className="bg-rose-500 text-white p-3 rounded-full hover:scale-110 transition-transform cursor-pointer shadow-lg">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-emerald-500 transition bg-[#0f172a] group">
              <Upload className="text-slate-500 mb-2 group-hover:text-emerald-500 transition-colors" />
              <span className="text-slate-400 font-medium">Click to upload photo</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
            <AlignLeft size={14} className="text-emerald-500" /> Short Caption
          </label>
          <textarea
            rows={3}
            {...register("description")}
            placeholder="Briefly describe this moment..."
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-white outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex justify-center items-center transition shadow-lg shadow-emerald-900/20 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Processing...
            </>
          ) : initialData ? (
            "Update Gallery Entry"
          ) : (
            "Publish to Gallery"
          )}
        </button>
      </form>
    </motion.div>
  );
}