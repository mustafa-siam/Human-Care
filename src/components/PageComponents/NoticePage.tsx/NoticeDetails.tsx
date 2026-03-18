"use client";
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Share2, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useNotices } from '@/components/Hooks/useNotices';

export function NoticeDetails() {
  const params = useParams();
  const slug = params.slug as string;
  
  const { notice: update, loading } = useNotices(slug);

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
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">Notice Not Found</h1>
          <p className="text-gray-600 mb-8">The article you are looking for might have been moved or deleted.</p>
          <Link href="/notices" className="bg-[#0F172A] text-white px-8 py-3 rounded-full hover:bg-black transition-all">
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
                <span>{new Date(update.date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
              </div>
              
              {update.type === 'urgent' && (
                <span className="bg-[#F59E0B]/10 text-[#F59E0B] px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Urgent Update
                </span>
              )}
              {update.type === 'success' && (
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
  ?.split('\n')
  .filter((p: string) => p.trim() !== '')
  .map((paragraph: string, index: number) => (
    <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
      {paragraph}
    </p>
  ))
}
          </motion.div>

          <motion.div
            className="mt-20 bg-slate-900 rounded-3xl p-10 text-white text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#10B981] opacity-10 blur-[80px] -mr-32 -mt-32"></div>

            <h3 className="text-3xl font-bold mb-4 relative z-10">Support Our Initiatives</h3>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg relative z-10">
              Your contributions empower us to continue our mission and share more stories of impact like this one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Link href="/#contact">
                    <motion.button
                        className="bg-[#10B981] hover:bg-[#059669] text-white px-10 py-4 rounded-full font-bold shadow-xl transition-all w-full sm:w-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Donate Now
                    </motion.button>
                </Link>
                <button
  onClick={() => {
    const url = encodeURIComponent(window.location.href);
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(fbShareUrl, "_blank", "width=600,height=400");
  }}
  className="bg-white/10 cursor-pointer hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold backdrop-blur-sm transition-all flex items-center justify-center gap-2"
>
  <Share2 className="w-5 h-5" /> Share News
</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}