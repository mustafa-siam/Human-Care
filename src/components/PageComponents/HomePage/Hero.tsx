"use client"
import { motion } from 'motion/react';
import { ArrowRight, Heart } from 'lucide-react';
import { ImagePosition } from '@/components/Hooks/ImagePosition';


const fieldworkImages = [
  'https://images.unsplash.com/photo-1717072911656-b00b6ae8241a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCYW5nbGFkZXNoJTIwaHVtYW5pdGFyaWFuJTIwZmllbGR3b3JrfGVufDF8fHx8MTc3MTk1ODQ3N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1764645362980-08d8704fd102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbSUyMGRldmVsb3BpbmclMjBjb3VudHJ5fGVufDF8fHx8MTc3MTk1ODQ3OHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1706806595099-f07588729caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMHZvbHVudGVlcnMlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzcxOTU4NDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1764684994219-8347a5ab0e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZiUyMGh1bWFuaXRhcmlhbiUyMGFpZHxlbnwxfHx8fDE3NzE5NTg0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1759738099669-d64b0656f6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzcxOTIwMDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1560220604-1985ebfe28b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOR08lMjB2b2x1bnRlZXJzJTIwaGVscGluZyUyMGNvbW11bml0eXxlbnwxfHx8fDE3NzE5NTg0ODB8MA&ixlib=rb-4.1.0&q=80&w=1080',
];

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #10B981 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/30 px-4 py-2 rounded-full mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Heart className="w-4 h-4 text-[#10B981]" fill="#10B981" />
              <span className="text-[#10B981] text-sm">Since 2010 • Making Impact in Bangladesh</span>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-6xl xl:text-7xl text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Humanity is Better Than Responsibility
            </motion.h1>

            <motion.p
              className="text-xl text-white/70 mb-8 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              We believe in compassion over obligation. Join us in transforming lives across Bangladesh through healthcare, education, relief, and empowerment initiatives that create lasting change.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Donate Now
                <Heart className="w-5 h-5" fill="white" />
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('projects')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-full font-semibold flex items-center gap-2 backdrop-blur-sm transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Work
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div>
                <div className="text-3xl text-[#10B981] mb-1">50K+</div>
                <div className="text-white/60 text-sm">Lives Impacted</div>
              </div>
              <div>
                <div className="text-3xl text-[#10B981] mb-1">120+</div>
                <div className="text-white/60 text-sm">Projects</div>
              </div>
              <div>
                <div className="text-3xl text-[#10B981] mb-1">15+</div>
                <div className="text-white/60 text-sm">Years Active</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Bento Grid Collage */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[600px]">
              {/* Large featured image */}
              <motion.div
                className="col-span-4 row-span-4 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#10B981]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImagePosition
                  src={fieldworkImages[0]}
                  alt="Bangladesh humanitarian work"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Top right image */}
              <motion.div
                className="col-span-2 row-span-3 rounded-2xl overflow-hidden shadow-xl border-2 border-[#10B981]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImagePosition
                  src={fieldworkImages[1]}
                  alt="Education program"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Bottom right small */}
              <motion.div
                className="col-span-2 row-span-3 rounded-2xl overflow-hidden shadow-xl border-2 border-[#10B981]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImagePosition
                  src={fieldworkImages[2]}
                  alt="Healthcare volunteers"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Bottom left images */}
              <motion.div
                className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-xl border-2 border-[#10B981]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImagePosition
                  src={fieldworkImages[3]}
                  alt="Disaster relief"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-xl border-2 border-[#10B981]/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImagePosition
                  src={fieldworkImages[4]}
                  alt="Women empowerment"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-[#F59E0B] text-white px-6 py-4 rounded-2xl shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="text-2xl">🇧🇩</div>
              <div className="text-sm mt-1">Proudly serving Bangladesh</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
