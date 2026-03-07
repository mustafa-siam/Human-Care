"use client";

import React from "react";
import { motion } from "motion/react";

interface ProgressBarProps {
  progress: number;
  showText?: boolean;
  className?: string;
  color?: string;
}

export const ProgressBar = ({ 
  progress, 
  showText = false, 
  className = "", 
  color = "bg-emerald-500" 
}: ProgressBarProps) => {
  // Ensure progress stays between 0 and 100
  const validatedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`flex items-center gap-3 w-full ${className}`}>
      <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${validatedProgress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} shadow-[0_0_10px_rgba(16,185,129,0.3)]`}
        />
      </div>
      {showText && (
        <span className="text-xs font-bold text-emerald-400 min-w-[35px]">
          {validatedProgress}%
        </span>
      )}
    </div>
  );
};