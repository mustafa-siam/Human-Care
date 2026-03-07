"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateHeroContent } from "@/app/ServerActions/Hero";
import { toast } from "sonner";
import { X } from "lucide-react";

type HeroFormProps = {
  initialData: any;
};

export default function HeroForm({ initialData }: HeroFormProps) {
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm();

  // Real images from database only
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // Blob previews for UI only
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // Real File objects
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const [hasImageChanges, setHasImageChanges] = useState(false);

  // --- Sync initial data ---
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setExistingImages(initialData.images || []);
      setPreviewImages(initialData.images || []);
      setNewFiles([]);
      setHasImageChanges(false);
    }
  }, [initialData, reset]);

  // --- Handle file select ---
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);

    setNewFiles((prev) => [...prev, ...files]);

    const blobPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...blobPreviews]);

    setHasImageChanges(true);
  }

  // --- Remove image ---
  function handleRemoveImage(index: number) {
    const imageToRemove = previewImages[index];

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));

    // If it's an existing (real) image
    if (existingImages.includes(imageToRemove)) {
      setExistingImages((prev) =>
        prev.filter((img) => img !== imageToRemove)
      );
    } else {
      // It must be a new blob image
      const blobIndex = previewImages.length - newFiles.length;
      const newIndex = index - blobIndex;

      if (newIndex >= 0) {
        setNewFiles((prev) =>
          prev.filter((_, i) => i !== newIndex)
        );
      }
    }

    setHasImageChanges(true);
  }

  // --- Submit ---
  async function onSubmit(data: any) {
    if (!isDirty && !hasImageChanges) return;

    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        formData.append(key, data[key] || "");
      });

      // Send ONLY real existing URLs
      formData.append("existingImages", JSON.stringify(existingImages));

      // Send ONLY new files
      newFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await updateHeroContent(formData);

      if (response.success) {
        toast.success("Hero content updated successfully");

        setNewFiles([]);
        setHasImageChanges(false);

        // After save, preview = existing only
        setPreviewImages(existingImages);

        reset({ ...data, images: existingImages });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  const inputStyle =
    "w-full bg-[#0F172A] border border-white/10 rounded-lg p-3 text-white focus:border-[#10B981] outline-none transition-all";

  const labelStyle =
    "block text-sm font-medium text-white/60 mb-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register("id")} />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelStyle}>Badge Text</label>
          <input {...register("badgeText")} className={inputStyle} />
        </div>
        <div>
          <label className={labelStyle}>Headline</label>
          <input {...register("headline")} className={inputStyle} />
        </div>
      </div>

      <div>
        <label className={labelStyle}>Description</label>
        <textarea {...register("description")} rows={4} className={inputStyle} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className={labelStyle}>Lives Impacted</label>
          <input {...register("livesImpacted")} className={inputStyle} />
        </div>
        <div>
          <label className={labelStyle}>Projects Count</label>
          <input {...register("projectsCount")} className={inputStyle} />
        </div>
        <div>
          <label className={labelStyle}>Years Active</label>
          <input {...register("yearsActive")} className={inputStyle} />
        </div>
      </div>

      {/* Upload */}
      <div>
        <label className={labelStyle}>Upload Images</label>
        <label className="relative flex items-center justify-center h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-[#10B981] transition-colors">
          <span className="text-white/40">Click to select images</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
      </div>

      {/* Preview */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
        {previewImages.map((img, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden border border-white/10 group">
            <img src={img} alt="preview" className="h-32 w-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={!isDirty && !hasImageChanges}
        className={`w-full font-bold py-4 rounded-xl transition-all ${
          !isDirty && !hasImageChanges
            ? "bg-slate-700 cursor-not-allowed"
            : "bg-[#10B981] hover:bg-[#0b5a41] cursor-pointer"
        } text-white`}
      >
        Save Changes
      </button>
    </form>
  );
}