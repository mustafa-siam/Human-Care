
"use client"
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useNotices } from '@/components/Hooks/useNotices';

export function NoticeDetails() {
  const params=useParams()
  const {getNoticeBySlug}=useNotices()
  const slug=params.slug as string
  const update = getNoticeBySlug(slug);

  if (!update) {
    return (
      <div className="min-h-screen bg-white">
        
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl text-[#0F172A] mb-4">Notices Not Found</h1>
          <Link href="/" className="text-[#10B981] hover:text-[#059669] cursor-pointer">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">

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
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-500">
                <Calendar className="w-5 h-5" />
                <span>{update.date}</span>
              </div>
              {update.type === 'urgent' && (
                <span className="bg-[#F59E0B]/10 text-[#F59E0B] px-4 py-1.5 rounded-full text-sm">
                  Urgent Update
                </span>
              )}
              {update.type === 'success' && (
                <span className="bg-[#10B981]/10 text-[#10B981] px-4 py-1.5 rounded-full text-sm">
                  Success Story
                </span>
              )}
            </div>

            <h1 className="text-5xl text-[#0F172A] mb-6 leading-tight">
              {update.title}
            </h1>
          </motion.div>      
            <motion.div
              className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={update.image}
                alt={update.title}
                className="w-full h-96 object-cover"
              />
            </motion.div>

          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {update.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </motion.div>
          <motion.div
            className="mt-16 bg-gradient-to-r from-[#10B981] to-[#059669] rounded-2xl p-8 text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl mb-4">Support Our Work</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Your donations make stories like this possible. Help us continue creating positive change across Bangladesh.
            </p>
            <Link href="/#contact">
             <motion.button
              className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Donate Now
            </motion.button>
            </Link>
           
          </motion.div>
        </div>
      </div>
    </div>
  );
}