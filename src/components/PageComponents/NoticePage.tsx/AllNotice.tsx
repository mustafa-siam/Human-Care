"use client"
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, AlertCircle, TrendingUp, Bell } from 'lucide-react';
import Link from 'next/link';
import { useNotices } from '@/components/Hooks/useNotices';
export function AllNotice() {
    const {notices}=useNotices()
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
              All Updates
            </motion.div>
            <h1 className="text-5xl text-[#0F172A] mb-4">
              News & Notices
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay informed about our latest activities, achievements, and ongoing initiatives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {notices.map((update, index) => (
              <motion.div
                key={update.slug}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-l-4 ${
                  update.type === 'urgent'
                    ? 'border-[#F59E0B]'
                    : update.type === 'success'
                    ? 'border-[#10B981]'
                    : 'border-[#0F172A]'
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{update.date}</span>
                    </div>

                    {update.latest && (
                      <span className="inline-flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] px-2 py-1 rounded-full text-xs">
                        <TrendingUp className="w-3 h-3" />
                        Latest
                      </span>
                    )}

                    {update.type === 'urgent' && (
                      <span className="inline-flex items-center gap-1 bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-1 rounded-full text-xs">
                        <AlertCircle className="w-3 h-3" />
                        Urgent
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl text-[#0F172A] mb-3 group-hover:text-[#10B981] transition-colors duration-300 line-clamp-2">
                    {update.title}
                  </h3>


                  <p className="text-gray-600 mb-3 leading-relaxed line-clamp-2">
                    {update.description}
                  </p>
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-3">
                    {update.excerpt}
                  </p>
                  <Link href={`/notices/${update.slug}`}>
                    <motion.button
                      className="text-[#10B981] hover:text-[#059669] text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300 cursor-pointer"
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
          <motion.div
            className="mt-16 text-center bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-8 text-white max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Bell className="w-12 h-12 mx-auto mb-4 text-[#10B981]" />
            <h3 className="text-2xl mb-3">Stay Updated</h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Subscribe to our newsletter to receive the latest news, project updates, and impact stories directly to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#10B981]"
              />
              <motion.button
                className="bg-[#F59E0B] hover:bg-[#D97706] px-8 py-3 rounded-full font-semibold transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
