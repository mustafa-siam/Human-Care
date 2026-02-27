"use client"
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Users, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImagePosition } from '@/components/Hooks/ImagePosition';
import Link from 'next/link';
import { useProjects } from '@/components/Hooks/useProjects';
function ProgressBar({ progress }: { progress: number }) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Progress</span>
        <span className="text-sm text-[#10B981]">{progress}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${animatedProgress}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export function Projects() {
  const {projects}=useProjects()
  return (
    <section id="projects" className="py-24 bg-gray-50 relative">
      <div className="container mx-auto px-6">
        
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block bg-[#10B981]/10 text-[#10B981] px-4 py-2 rounded-full text-sm mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Active Projects
          </motion.div>
          <h2 className="text-4xl lg:text-5xl text-[#0F172A] mb-4">
            Creating Real Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our ongoing initiatives are transforming communities across Bangladesh with measurable results
          </p>
        </motion.div>

      
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0,3).map((project, index) => (
            <motion.div
              key={project.title}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              
              <div className="relative h-56 overflow-hidden">
                <ImagePosition
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
              
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm text-[#0F172A]">{project.location}</span>
                </div>
              </div>

              
              <div className="p-6">
                <h3 className="text-xl text-[#0F172A] mb-3 group-hover:text-[#10B981] transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

              
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{project.beneficiaries}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.timeline}</span>
                  </div>
                </div>
              
                <ProgressBar progress={project.progress} />

              
                <Link href={`/projects/${project.slug}`}>
                  <motion.button
                    className="mt-6 w-full flex items-center justify-center gap-2 text-[#10B981] hover:text-[#059669] group-hover:gap-3 transition-all duration-300 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
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
          <Link href="/projects">
            <motion.button
              className="bg-[#0F172A] hover:bg-[#1E293B] text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}