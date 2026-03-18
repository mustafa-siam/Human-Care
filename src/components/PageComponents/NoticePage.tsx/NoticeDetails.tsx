"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Share2,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Facebook,
  Linkedin,
  Twitter,
  MessageCircle,
  X,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useNotices } from "@/components/Hooks/useNotices";

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export function NoticeDetails() {
  const params = useParams()
  const [copied, setCopied] = useState(false);
  const slug = params.slug as string;

  const { notice: update, loading } = useNotices(slug);

  const [showShare, setShowShare] = useState(false);

  // ✅ Safe URL (no SSR error)
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  // ✅ Safe copy
  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  if (!update) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-40 text-center">
          <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            Notice Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The article you are looking for might have been moved or deleted.
          </p>
          <Link
            href="/notices"
            className="bg-[#0F172A] text-white px-8 py-3 rounded-full hover:bg-black transition-all"
          >
            Browse All Notices
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mt-22 pt-20 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          
          <Link href="/notices">
            <motion.button
              className="flex items-center gap-2 text-gray-600 hover:text-[#10B981] mb-8 transition-colors duration-300 cursor-pointer group"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5 group-hover:stroke-[3px]" />
              Back to All Notices
            </motion.button>
          </Link>

          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-500 font-medium">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(update.date).toLocaleDateString(undefined, {
                    dateStyle: "long",
                  })}
                </span>
              </div>

              {update.type === "urgent" && (
                <span className="bg-[#F59E0B]/10 text-[#F59E0B] px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Urgent Update
                </span>
              )}
              {update.type === "success" && (
                <span className="bg-[#10B981]/10 text-[#10B981] px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Success Story
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F172A] mb-6 leading-[1.15]">
              {update.title}
            </h1>

            <p className="text-xl text-gray-500 italic leading-relaxed border-l-4 border-[#10B981] pl-6 py-2">
              {update.description}
            </p>
          </motion.div>

          {update.image && (
            <motion.div
              className="mb-12 rounded-3xl overflow-hidden shadow-2xl border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={update.image}
                alt={update.title}
                className="w-full h-[450px] object-cover"
              />
            </motion.div>
          )}

          <motion.div
            className="prose prose-lg prose-slate max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {update.content
              ?.split("\n")
              .filter((p: string) => p.trim() !== "")
              .map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="text-gray-700 leading-relaxed mb-6 text-lg"
                >
                  {paragraph}
                </p>
              ))}
          </motion.div>

          <motion.div
            className="mt-20 bg-slate-900 rounded-3xl p-10 text-white text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981] opacity-10 blur-[80px] -mr-32 -mt-32"></div>

            <h3 className="text-3xl font-bold mb-4 relative z-10">
              Support Our Initiatives
            </h3>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg relative z-10">
              Your contributions empower us to continue our mission and share
              more stories of impact like this one.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link href="/#contact">
                <motion.button
                  className="bg-[#10B981] cursor-pointer hover:bg-[#059669] text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Donate Now
                </motion.button>
              </Link>

              <button
                onClick={() => setShowShare(true)}
                className="bg-white/10 cursor-pointer hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold backdrop-blur-sm transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" /> Share News
              </button>
            </div>
          </motion.div>
        </div>
      </div>
{showShare && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-slate-900 rounded-2xl p-6 w-[90%] max-w-sm relative flex flex-col items-center gap-6">
      
      <button
        onClick={() => setShowShare(false)}
        className="absolute top-4 bg-red-600 p-2 rounded-full right-4 text-white hover:bg-red-400 cursor-pointer"
      >
        <X />
      </button>

      <h2 className="text-xl flex items-center justify-center gap-2 font-bold mb-2 text-center">
        <Share2 className="w-5 h-5" /> Share
      </h2>

      <div className="flex items-center justify-center gap-4">
        <FacebookShareButton url={shareUrl}>
          <div className="p-4 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
            <Facebook size={24} color="white" />
          </div>
        </FacebookShareButton>

        <TwitterShareButton url={shareUrl} title={update.title}>
          <div className="p-4 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
            <Twitter size={24} color="white" />
          </div>
        </TwitterShareButton>

        <LinkedinShareButton url={shareUrl} title={update.title}>
          <div className="p-4 bg-[#10B981] rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
            <Linkedin size={24} color="white" />
          </div>
        </LinkedinShareButton>

        <WhatsappShareButton url={shareUrl} title={update.title}>
          <div className="p-4 bg-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
            <MessageCircle size={24} color="white" />
          </div>
        </WhatsappShareButton>

        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              window.open("https://www.instagram.com/", "_blank");
              setTimeout(() => setCopied(false), 4000);
            }
          }}
          className="p-4 bg-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
        >
          <Instagram size={24} color="white"/>
        </button>
      </div>

      <button
        onClick={() => {
          if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 4000);
          }
        }}
        className="mt-4 w-full bg-gray-600 hover:bg-gray-500 p-3 rounded-lg font-medium transition-colors cursor-pointer"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  </div>
)}
    </div>
  );
}