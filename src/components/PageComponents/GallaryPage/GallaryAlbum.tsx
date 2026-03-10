"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Calendar,
  Loader2,
} from "lucide-react";
import Masonry from "react-responsive-masonry";
import Link from "next/link";
import { useGallery } from "@/components/Hooks/useGallery";

export function GalleryPage() {
  const { items, loading } = useGallery();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState<any | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryAlbums = [
    {
      id: "all",
      name: "All Photos",
      count: items.length,
    },
    {
      id: "education",
      name: "Education",
      count: items.filter((i) => i.category === "education").length,
    },
    {
      id: "healthcare",
      name: "Healthcare",
      count: items.filter((i) => i.category === "healthcare").length,
    },
    {
      id: "water",
      name: "Clean Water",
      count: items.filter((i) => i.category === "water").length,
    },
    {
      id: "emergency",
      name: "Emergency Relief",
      count: items.filter((i) => i.category === "emergency").length,
    },
    {
      id: "community",
      name: "Community",
      count: items.filter((i) => i.category === "community").length,
    },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? items
      : items.filter((img) => img.category === selectedCategory);

  const openLightbox = (image: any, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
    setLightboxIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex =
      (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxImage(filteredImages[prevIndex]);
    setLightboxIndex(prevIndex);
  };

  if (loading) {
    return (
       <div className="flex flex-col items-center justify-center h-96 gap-4">
              <Loader2 className="animate-spin text-emerald-500" size={40} />
            </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <Link href="/">
            <motion.button
              className="flex items-center gap-2 text-gray-600 hover:text-[#10B981] mb-8 transition-colors duration-300 cursor-pointer"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </motion.button>
          </Link>

          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] px-4 py-2 rounded-full text-sm mb-4">
              <ImageIcon className="w-4 h-4" />
              Photo Gallery
            </div>

            <h1 className="text-5xl text-[#0F172A] mb-4">
              Our Impact in Pictures
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore moments of transformation, hope, and community development
              across Bangladesh
            </p>
          </motion.div>

          {/* Album Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {galleryAlbums.map((album) => (
              <motion.button
                key={album.id}
                onClick={() => setSelectedCategory(album.id)}
                className={`px-6 py-3 cursor-pointer rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === album.id
                    ? "bg-[#10B981] text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {album.name}
                <span className="ml-2 text-sm opacity-75">
                  ({album.count})
                </span>
              </motion.button>
            ))}
          </div>

          {/* Gallery Grid */}
          <Masonry columnsCount={3} gutter="20px">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => openLightbox(image, index)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-lg">{image.title}</h3>

                    <p className="text-sm text-white/80 mb-2">
                      {image.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {new Date(image.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-emerald-500 px-3 py-1 rounded-full text-xs capitalize">
                  {image.category}
                </div>
              </motion.div>
            ))}
          </Masonry>

          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                No images found in this category
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            <div
              className="max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[80vh] object-contain rounded-lg"
              />

              <div className="mt-6 text-center text-white">
                <h3 className="text-2xl">{lightboxImage.title}</h3>

                <p className="text-white/70">
                  {lightboxImage.description}
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-white/50">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(lightboxImage.date).toLocaleDateString()}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">
                    {lightboxImage.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            {filteredImages.length > 1 && (
              <>
                <button
                  className="absolute left-6 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft size={40} />
                </button>

                <button
                  className="absolute right-6 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight size={40} />
                </button>
              </>
            )}

            <div className="absolute bottom-6 text-white text-sm">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}