"use client"
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, AlertCircle, TrendingUp, Bell, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useNotices } from '@/components/Hooks/useNotices';

export function AllNotice() {
    // 1. Destructure loading and both notice arrays
    const { notices, latestNotices, loading } = useNotices();

    // 2. Combine them so "All Notices" actually shows EVERYTHING
    // We put latestNotices first so they appear at the top
    const allUpdates = [...latestNotices, ...notices];

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

          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-[#F59E0B]/10 text-[#F59E0B] px-4 py-2 rounded-full text-sm mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Bell className="w-4 h-4" />
              Archive & Updates
            </motion.div>
            <h1 className="text-5xl font-bold text-[#0F172A] mb-4">
              News & Notices
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our full history of announcements and project updates.
            </p>
          </motion.div>

          {/* 3. Handling Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
               <Loader2 className="w-10 h-10 animate-spin text-[#10B981]" />
               <p className="text-gray-500 font-medium">Loading archives...</p>
            </div>
          ) : allUpdates.length === 0 ? (
            /* 4. Handling Empty State */
            <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
               <p className="text-gray-500">No notices found at this time.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {allUpdates.map((update, index) => (
                <motion.div
                  key={update.id || update.slug}
                  className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-l-4 ${
                    update.type === 'urgent'
                      ? 'border-[#F59E0B]'
                      : update.type === 'success'
                      ? 'border-[#10B981]'
                      : 'border-[#0F172A]'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        {/* 5. Safe Date Formatting */}
                        <span>{update.date ? new Date(update.date).toLocaleDateString() : 'No date'}</span>
                      </div>

                      {update.latest && (
                        <span className="inline-flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          <TrendingUp className="w-3 h-3" />
                          Latest
                        </span>
                      )}

                      {update.type === 'urgent' && (
                        <span className="inline-flex items-center gap-1 bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          <AlertCircle className="w-3 h-3" />
                          Urgent
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#10B981] transition-colors duration-300 line-clamp-2">
                      {update.title}
                    </h3>

                    <p className="text-gray-600 mb-3 leading-relaxed line-clamp-2 text-sm">
                      {update.description}
                    </p>
                    
                    {update.excerpt && (
                      <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-2 italic">
                        {update.excerpt}
                      </p>
                    )}

                    <Link href={`/notices/${update.slug}`}>
                      <motion.button
                        className="text-[#10B981] hover:text-[#059669] text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300 cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        Read Full Article
                        <span>→</span>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Newsletter Section */}
          <motion.div
            className="mt-24 text-center bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-12 text-white max-w-4xl mx-auto shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative z-10">
                <Bell className="w-12 h-12 mx-auto mb-4 text-[#10B981]" />
                <h3 className="text-3xl font-bold mb-3">Stay in the Loop</h3>
                <p className="text-white/70 mb-8 max-w-xl mx-auto">
                  Subscribe to our newsletter to receive the latest news and impact stories directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition-all"
                  />
                  <motion.button
                    className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-4 rounded-full font-bold shadow-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
            </div>
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981] opacity-10 blur-3xl -mr-16 -mt-16 rounded-full"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}