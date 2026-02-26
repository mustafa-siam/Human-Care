"use client"
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, MapPin, Users, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ImagePosition } from '@/components/Hooks/ImagePosition';

const projects = [
  {
    slug: 'clean-water-initiative',
    title: 'Clean Water Initiative',
    location: 'Dhaka & Chittagong',
    description: 'Installing water purification systems and building wells to provide clean drinking water to 10,000 families in rural areas.',
    image: 'https://images.unsplash.com/photo-1760873059715-7c7cfbe2a2c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwcHJvamVjdCUyMGRldmVsb3BpbmclMjBjb3VudHJ5fGVufDF8fHx8MTc3MTk1ODQ4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 78,
    beneficiaries: '8,500+',
    timeline: '2024-2026',
  },
  {
    slug: 'education-for-all',
    title: 'Education for All',
    location: 'Sylhet & Rajshahi',
    description: 'Building 15 new schools and providing educational materials, teacher training, and scholarships to underprivileged children.',
    image: 'https://images.unsplash.com/photo-1764645362980-08d8704fd102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbSUyMGRldmVsb3BpbmclMjBjb3VudHJ5fGVufDF8fHx8MTc3MTk1ODQ3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 65,
    beneficiaries: '12,000+',
    timeline: '2023-2025',
  },
  {
    slug: 'emergency-relief-fund',
    title: 'Emergency Relief Fund',
    location: 'Nationwide',
    description: 'Providing immediate assistance including food, shelter, and medical care to families affected by floods and natural disasters.',
    image: 'https://images.unsplash.com/photo-1764684994219-8347a5ab0e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZiUyMGh1bWFuaXRhcmlhbiUyMGFpZHxlbnwxfHx8fDE3NzE5NTg0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 92,
    beneficiaries: '25,000+',
    timeline: '2024-2025',
  },
  {
    slug: 'women-empowerment',
    title: 'Women Empowerment Program',
    location: 'Khulna & Barisal',
    description: 'Vocational training, microfinance, and business mentorship to help women achieve economic independence.',
    image: 'https://images.unsplash.com/photo-1759738099669-d64b0656f6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzcxOTIwMDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 55,
    beneficiaries: '3,500+',
    timeline: '2024-2027',
  },
  {
    slug: 'mobile-health-clinics',
    title: 'Mobile Health Clinics',
    location: 'Rural Bangladesh',
    description: 'Operating mobile medical units to provide free healthcare services, vaccinations, and health education to remote villages.',
    image: 'https://images.unsplash.com/photo-1706806595099-f07588729caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMHZvbHVudGVlcnMlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzcxOTU4NDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 70,
    beneficiaries: '15,000+',
    timeline: '2023-2026',
  },
  {
    slug: 'food-security',
    title: 'Food Security Initiative',
    location: 'Cox\'s Bazar',
    description: 'Distributing nutritious meals and establishing community kitchens to combat hunger and malnutrition.',
    image: 'https://images.unsplash.com/photo-1759411354058-9e429834f92f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwaHVtYW5pdGFyaWFufGVufDF8fHx8MTc3MTg2NTgxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 85,
    beneficiaries: '7,200+',
    timeline: '2024-2025',
  },
];

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

export function AllProjects() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <Link href={"/"}>
            <motion.button
              className="flex items-center gap-2 text-gray-600 hover:text-[#10B981] mb-8 transition-colors duration-300"
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
              className="inline-block bg-[#10B981]/10 text-[#10B981] px-4 py-2 rounded-full text-sm mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              All Projects
            </motion.div>
            <h1 className="text-5xl text-[#0F172A] mb-4">
              Our Active Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore all our ongoing initiatives creating real impact across Bangladesh
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
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
        </div>
      </div>
    </div>
  );
}
