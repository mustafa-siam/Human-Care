"use client"
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Users, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { ImagePosition } from '@/components/Hooks/ImagePosition';

const projectsData = {
  'clean-water-initiative': {
    title: 'Clean Water Initiative',
    location: 'Dhaka & Chittagong',
    description: 'Installing water purification systems and building wells to provide clean drinking water to 10,000 families in rural areas.',
    image: 'https://images.unsplash.com/photo-1760873059715-7c7cfbe2a2c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwcHJvamVjdCUyMGRldmVsb3BpbmclMjBjb3VudHJ5fGVufDF8fHx8MTc3MTk1ODQ4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 78,
    beneficiaries: '8,500+',
    timeline: '2024-2026',
    fullDescription: 'Access to clean water is a fundamental human right, yet thousands of families in rural Bangladesh still struggle with waterborne diseases. Our Clean Water Initiative addresses this critical need through a comprehensive approach that combines modern technology with community engagement. We install advanced water purification systems and construct deep tube wells in areas where groundwater contamination is a serious concern.',
    objectives: [
      'Install 50 water purification systems across 25 villages',
      'Build 100 deep tube wells in arsenic-affected areas',
      'Train 200 local water management committees',
      'Provide health education on water safety and hygiene'
    ],
    impact: [
      '8,500 families now have access to clean water',
      '60% reduction in waterborne diseases',
      '40 women trained as water system technicians',
      '25 villages became self-sufficient in water management'
    ]
  },
  'education-for-all': {
    title: 'Education for All',
    location: 'Sylhet & Rajshahi',
    description: 'Building 15 new schools and providing educational materials, teacher training, and scholarships to underprivileged children.',
    image: 'https://images.unsplash.com/photo-1764645362980-08d8704fd102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbSUyMGRldmVsb3BpbmclMjBjb3VudHJ5fGVufDF8fHx8MTc3MTk1ODQ3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 65,
    beneficiaries: '12,000+',
    timeline: '2023-2025',
    fullDescription: 'Education is the key to breaking the cycle of poverty. Our Education for All program focuses on creating sustainable educational infrastructure in underserved regions. We build modern schools equipped with libraries, computer labs, and safe playgrounds. Beyond infrastructure, we invest heavily in teacher training and provide comprehensive scholarships to ensure no child is left behind due to financial constraints.',
    objectives: [
      'Construct 15 fully-equipped school buildings',
      'Train 250 teachers in modern teaching methods',
      'Provide scholarships to 2,000 underprivileged students',
      'Establish 15 digital learning centers'
    ],
    impact: [
      '12,000 students enrolled in our schools',
      '85% improvement in literacy rates',
      '250 teachers certified in quality education',
      '15 communities now have access to quality education'
    ]
  },
  'emergency-relief-fund': {
    title: 'Emergency Relief Fund',
    location: 'Nationwide',
    description: 'Providing immediate assistance including food, shelter, and medical care to families affected by floods and natural disasters.',
    image: 'https://images.unsplash.com/photo-1764684994219-8347a5ab0e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZiUyMGh1bWFuaXRhcmlhbiUyMGFpZHxlbnwxfHx8fDE3NzE5NTg0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 92,
    beneficiaries: '25,000+',
    timeline: '2024-2025',
    fullDescription: 'Bangladesh faces recurring natural disasters including floods, cyclones, and landslides. Our Emergency Relief Fund ensures rapid response to these crises. We maintain stockpiles of essential supplies and have trained emergency response teams ready to deploy within hours. Our relief efforts go beyond immediate aid - we help families rebuild their lives and livelihoods.',
    objectives: [
      'Provide emergency food packages to 5,000 families monthly',
      'Set up temporary shelters for displaced populations',
      'Deliver medical assistance and medicines',
      'Support livelihood restoration programs'
    ],
    impact: [
      '25,000 families received emergency assistance',
      '10,000 temporary shelters provided',
      '15,000 medical consultations conducted',
      '3,000 families helped to rebuild their homes'
    ]
  }
};

export function ProjectDetails() {
 const params = useParams();
  const slug = params.slug as string;

  const project = projectsData[slug as keyof typeof projectsData];

  if (!project) {
     return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl text-[#0F172A] mb-4">Project Not Found</h1>
          <Link href={"/"} className="text-[#10B981] hover:text-[#059669]">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }


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
            className="rounded-3xl overflow-hidden shadow-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ImagePosition
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover"
            />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-5xl text-[#0F172A] mb-6">{project.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <MapPin className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <Users className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm">{project.beneficiaries} Beneficiaries</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                    <Calendar className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm">{project.timeline}</span>
                  </div>
                </div>

                <p className="text-xl text-gray-700 leading-relaxed mb-12">
                  {project.fullDescription}
                </p>

                <div className="mb-12">
                  <h2 className="text-3xl text-[#0F172A] mb-6">Project Objectives</h2>
                  <div className="space-y-3">
                    {project.objectives.map((objective, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <CheckCircle className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{objective}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-2xl p-8">
                  <h2 className="text-3xl text-[#0F172A] mb-6">Impact Achieved</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.impact.map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-32"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#10B981]/20 mb-6">
                  <h3 className="text-xl text-[#0F172A] mb-4">Project Progress</h3>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Completion</span>
                      <span className="text-2xl text-[#10B981]">{project.progress}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#10B981] to-[#059669] rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                  <motion.button
                    className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Support This Project
                  </motion.button>
                </div>
                <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-8 text-white">
                  <h3 className="text-xl mb-4">Share This Project</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Help us reach more supporters by sharing this project
                  </p>
                  <button className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white py-3 rounded-full font-semibold border border-white/30 transition-all duration-300">
                    Share Project
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
