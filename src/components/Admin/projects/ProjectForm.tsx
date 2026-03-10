"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateHeroContent } from "@/app/ServerActions/Hero";
import { toast } from "sonner";
import { X, Loader2, Target } from "lucide-react";

type HeroFormProps = {
  initialData: any;
};

export default function HeroForm({ initialData }: HeroFormProps) {
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { isDirty, isSubmitting } 
  } = useForm();

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [hasImageChanges, setHasImageChanges] = useState(false);

  // --- Sync initial data ---
  useEffect(() => {
    if (initialData) {
      const normalizedData = { ...initialData, id: "singleton" };
      reset(normalizedData);
      setExistingImages(normalizedData.images || []);
      setPreviewImages(normalizedData.images || []);
      setNewFiles([]);
      setHasImageChanges(false);
    }
  }, [initialData, reset]);

  // --- Handle file select ---
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setNewFiles((prev) => [...prev, ...files]);
    const blobPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...blobPreviews]);
    setHasImageChanges(true);
  }

  // --- Remove image ---
  function handleRemoveImage(index: number) {
    const imageToRemove = previewImages[index];
    
    if (imageToRemove.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove);
    }

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    if (existingImages.includes(imageToRemove)) {
      setExistingImages((prev) => prev.filter((img) => img !== imageToRemove));
    } else {
      const blobIndex = previewImages.length - newFiles.length;
      const newIndex = index - blobIndex;
      if (newIndex >= 0) {
        setNewFiles((prev) => prev.filter((_, i) => i !== newIndex));
      }
    }
    setHasImageChanges(true);
  }

  // --- Submit ---
  async function onSubmit(data: any) {
    const toastId = toast.loading("Syncing hero content...");

    try {
      const formData = new FormData();
      
      // Ensure "singleton" ID is sent
      formData.append("id", "singleton");
      formData.append("badgeText", data.badgeText || "");
      formData.append("headline", data.headline || "");
      formData.append("description", data.description || "");
      formData.append("livesImpacted", data.livesImpacted || "");
      formData.append("projectsCount", data.projectsCount || "");
      formData.append("yearsActive", data.yearsActive || "");
      formData.append("donateLink", data.donateLink || "https://qrinux.com/");

      formData.append("existingImages", JSON.stringify(existingImages));
      newFiles.forEach((file) => formData.append("images", file));

      const response = await updateHeroContent(formData);

      if (response.success) {
        toast.success("Changes saved successfully!", { 
          id: toastId,
          description: "The homepage hero section is now updated.",
          icon: <Target size={18} className="text-emerald-500" />
        });

        setNewFiles([]);
        setHasImageChanges(false);
        reset({ ...data, images: existingImages, id: "singleton" });
      } else {
        toast.error("Update failed", { 
          id: toastId, 
          description: response.error || "Please try again." 
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Network error", { id: toastId });
    }
  }

  const inputStyle =
    "w-full bg-[#0F172A] border border-white/10 rounded-lg p-3 text-white focus:border-[#10B981] outline-none transition-all placeholder:text-white/20";
  const labelStyle =
    "block text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Badge Text</label>
          <input {...register("badgeText")} className={inputStyle} placeholder="e.g. Since 2010 • Impact" />
        </div>
        <div>
          <label className={labelStyle}>Headline</label>
          <input {...register("headline")} className={inputStyle} placeholder="Main hero title" />
        </div>
      </div>

      <div>
        <label className={labelStyle}>Description</label>
        <textarea {...register("description")} rows={4} className={inputStyle} placeholder="Short bio or mission statement..." />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Donate Link</label>
          <input 
            {...register("donateLink")} 
            type="url"
            placeholder="https://qrinux.com/" 
            className={inputStyle} 
          />
        </div>
        <div>
          <label className={labelStyle}>Lives Impacted</label>
          <input {...register("livesImpacted")} className={inputStyle} placeholder="e.g. 50K+" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Projects Count</label>
          <input {...register("projectsCount")} className={inputStyle} placeholder="e.g. 120+" />
        </div>
        <div>
          <label className={labelStyle}>Years Active</label>
          <input {...register("yearsActive")} className={inputStyle} placeholder="e.g. 15+" />
        </div>
      </div>

      <div>
        <label className={labelStyle}>Hero Gallery Images</label>
        <label className="relative flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-[#10B981] transition-colors group bg-[#0F172A]">
          <span className="text-white/40 group-hover:text-[#10B981] text-sm font-medium">Click to select new photos</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {previewImages.map((img, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden border border-white/10 group aspect-video">
            <img src={img} alt="preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-500 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-lg"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={(!isDirty && !hasImageChanges) || isSubmitting}
        className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
          (!isDirty && !hasImageChanges) || isSubmitting
            ? "bg-slate-800 text-white/30 cursor-not-allowed"
            : "bg-[#10B981] hover:bg-[#059669] text-white cursor-pointer shadow-lg shadow-[#10B981]/10"
        }`}
      >
        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : null}
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}