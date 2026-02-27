"use client"
import { motion } from 'motion/react';
import { Bell, Calendar, AlertCircle, TrendingUp,} from 'lucide-react';
import Link from 'next/link';
import { useNotices } from '@/components/Hooks/useNotices';

export function Notices() {
  const {getLatestNotices}=useNotices();
  const updates = getLatestNotices();
  return (
    <section id="updates" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[#F59E0B]/10 text-[#F59E0B] px-4 py-2 rounded-full text-sm mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Bell className="w-4 h-4" />
            Latest Updates
          </motion.div>
          <h2 className="text-4xl lg:text-5xl text-[#0F172A] mb-4">
            News & Notices
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed about our latest activities, achievements, and ongoing initiatives
          </p>
        </motion.div>
        <div className="max-w-4xl mx-auto">
          {updates.map((update, index) => (
            <motion.div
              key={update.title}
              className="relative pl-8 pb-12 last:pb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {index !== updates.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-[#10B981] to-gray-200"></div>
              )}
              <div className={`absolute left-0 top-2 w-6 h-6 rounded-full border-4 ${
                update.type === 'urgent' 
                  ? 'bg-[#F59E0B] border-[#F59E0B]/20' 
                  : update.type === 'success'
                  ? 'bg-[#10B981] border-[#10B981]/20'
                  : 'bg-[#0F172A] border-[#0F172A]/20'
              } shadow-lg`}></div>

              <motion.div
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 ${
                  update.type === 'urgent'
                    ? 'border-[#F59E0B]'
                    : update.type === 'success'
                    ? 'border-[#10B981]'
                    : 'border-[#0F172A]'
                } ml-4 group hover:-translate-y-1`}
                whileHover={{ x: 5 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{update.date}</span>
                  </div>

                  {update.latest && (
                    <span className="inline-flex items-center gap-1 bg-[#10B981]/10 text-[#10B981] px-3 py-1 rounded-full text-xs">
                      <TrendingUp className="w-3 h-3" />
                      Latest
                    </span>
                  )}

                  {update.type === 'urgent' && (
                    <span className="inline-flex items-center gap-1 bg-[#F59E0B]/10 text-[#F59E0B] px-3 py-1 rounded-full text-xs">
                      <AlertCircle className="w-3 h-3" />
                      Urgent
                    </span>
                  )}
                </div>

                <h3 className="text-xl text-[#0F172A] mb-2 group-hover:text-[#10B981] transition-colors duration-300">
                  {update.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {update.description}
                </p>

                 <Link href={`/notices/${update.slug}`}>
                  <motion.button
                    className="mt-4 text-[#10B981] hover:text-[#059669] text-sm flex items-center gap-2 group-hover:gap-3 transition-all duration-300 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    Read More
                    <span>→</span>
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
         <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/notices">
            <motion.button
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Updates
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          className="mt-16 text-center bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
    </section>
  );
}
