"use client";

import React, { useState } from "react";
import { X, Loader2, Plus, Trash2, Target, Upload } from "lucide-react";
import { motion } from "motion/react";

// Matches your full data structure
interface ProjectFormData {
  title: string;
  location: string;
  description: string;
  fullDescription: string;
  image: string;
  progress: number;
  beneficiaries: string;
  timeline: string;
  objectives: string[];
  impact: string[];
}

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (data: FormData) => Promise<void>; 
  onClose: () => void;
  isSubmitting: boolean;
}

export const ProjectForm = ({ initialData, onSubmit, onClose, isSubmitting }: ProjectFormProps) => {
  
  const [formData, setFormData] = useState<ProjectFormData>({
    title: initialData?.title || "",
    location: initialData?.location || "",
    description: initialData?.description || "",
    fullDescription: initialData?.fullDescription || "",
    image: initialData?.image || "",
    progress: initialData?.progress || 0,
    beneficiaries: initialData?.beneficiaries || "",
    timeline: initialData?.timeline || "",
    objectives: initialData?.objectives?.length > 0 ? [...initialData.objectives] : [""],
    impact: initialData?.impact?.length > 0 ? [...initialData.impact] : [""]
  });

  
  const [previewImage, setPreviewImage] = useState<string>(initialData?.image || "");
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
    setFormData({ ...formData, image: "" });
  };

  const handleArrayChange = (index: number, value: string, type: 'objectives' | 'impact') => {
    const newArr = [...formData[type]];
    newArr[index] = value;
    setFormData({ ...formData, [type]: newArr });
  };

  const addArrayField = (type: 'objectives' | 'impact') => {
    setFormData({ ...formData, [type]: [...formData[type], ""] });
  };

  const removeArrayField = (index: number, type: 'objectives' | 'impact') => {
    if (formData[type].length <= 1) return;
    setFormData({ 
      ...formData, 
      [type]: formData[type].filter((_: string, i: number) => i !== index) 
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("description", formData.description);
    data.append("fullDescription", formData.fullDescription);
    data.append("progress", formData.progress.toString());
    data.append("beneficiaries", formData.beneficiaries);
    data.append("timeline", formData.timeline);
    
    // Send arrays as JSON strings
    data.append("objectives", JSON.stringify(formData.objectives.filter(s => s.trim() !== "")));
    data.append("impact", JSON.stringify(formData.impact.filter(s => s.trim() !== "")));

    if (newFile) {
      data.append("image", newFile);
    } else {
      data.append("existingImage", formData.image);
    }

    onSubmit(data);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1e293b] p-6 md:p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-4xl mx-auto"
    >
      <div className="flex justify-between items-center mb-8 border-b border-slate-700/50 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><Target size={24} /></div>
          <h2 className="text-xl font-bold text-white">{initialData ? "Update Project" : "New Initiative"}</h2>
        </div>
        <button onClick={onClose} className="text-white p-2 hover:bg-red-500/20 bg-red-500 rounded-full transition-all cursor-pointer"><X size={24} /></button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500">Project Title</label>
          <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500">Location</label>
          <input required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none" />
        </div>

        {/* Image Upload Area */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500">Cover Image</label>
          {previewImage ? (
            <div className="relative h-56 w-full rounded-xl overflow-hidden border border-slate-700 group">
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button type="button" onClick={handleRemoveImage} className="bg-rose-500 text-white p-3 rounded-full hover:scale-110 transition-transform"><Trash2 size={20} /></button>
              </div>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-56 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-emerald-500/50 bg-[#0f172a] transition-all">
              <Upload size={28} className="text-slate-500 mb-2" />
              <span className="text-slate-400 font-medium">Select project image</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          )}
        </div>

        {/* Description & Full Description */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500">Short Card Description</label>
          <textarea rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-white outline-none" />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500">Full Project Details</label>
          <textarea rows={4} value={formData.fullDescription} onChange={e => setFormData({...formData, fullDescription: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-white outline-none" placeholder="Explain the project in detail..." />
        </div>

        {/* Stats & Timeline */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500">Progress (%)</label>
          <input type="number" max="100" min="0" value={formData.progress} onChange={e => setFormData({...formData, progress: parseInt(e.target.value) || 0})} className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-white outline-none" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500">Timeline (e.g. 2024-2026)</label>
          <input value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-white outline-none" />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500">Beneficiaries (e.g. 12,000+)</label>
          <input value={formData.beneficiaries} onChange={e => setFormData({...formData, beneficiaries: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-white outline-none" />
        </div>

        {/* Dynamic Lists (Objectives & Impact) */}
        {(['objectives', 'impact'] as const).map((type) => (
          <div key={type} className="space-y-3 bg-[#0f172a]/50 p-5 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase text-slate-500">{type}</label>
              <button type="button" onClick={() => addArrayField(type)} className="text-emerald-400 text-xs font-bold flex items-center gap-1 hover:text-emerald-300"><Plus size={14} /> Add</button>
            </div>
            {formData[type].map((val, i) => (
              <div key={i} className="flex gap-2">
                <input value={val} onChange={e => handleArrayChange(i, e.target.value, type)} className="flex-1 bg-[#0f172a] border border-slate-700 rounded-lg p-2 text-sm text-white focus:border-emerald-500 outline-none" />
                <button type="button" onClick={() => removeArrayField(i, type)} className="text-rose-500 hover:bg-rose-500/10 p-2 rounded-lg"><Trash2 size={18}/></button>
              </div>
            ))}
          </div>
        ))}

        <button disabled={isSubmitting} type="submit" className="md:col-span-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all mt-4 flex justify-center items-center shadow-lg shadow-emerald-900/20 cursor-pointer">
          {isSubmitting ? <><Loader2 className="animate-spin mr-2" /> Saving...</> : (initialData ? "Update Project" : "Publish Project")}
        </button>
      </form>
    </motion.div>
  );
};