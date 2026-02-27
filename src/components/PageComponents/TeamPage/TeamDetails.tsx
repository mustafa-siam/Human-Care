"use client"
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Linkedin, Award, GraduationCap, Briefcase } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useTeam } from '@/components/Hooks/useTeam';

export function TeamDetails() {
  const params=useParams();
  const slug=params.slug as string
  const {getTeamMemberBySlug}=useTeam()
  const member = getTeamMemberBySlug(slug);

  if (!member) {
    return (
      <div className="min-h-screen bg-white">
    
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl text-[#0F172A] mb-4">Team Member Not Found</h1>
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

          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-32"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-[#10B981]/20 mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6">
                    <h1 className="text-2xl text-[#0F172A] mb-2">{member.name}</h1>
                    <p className="text-[#10B981] mb-6">{member.role}</p>
                    
                    <div className="space-y-3">
                      <motion.button
                        className="w-full flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white py-3 rounded-xl transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="w-5 h-5" />
                        Send Email
                      </motion.button>
                      <motion.button
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#0F172A] py-3 rounded-xl transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Linkedin className="w-5 h-5" />
                        LinkedIn Profile
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-12">
                  <h2 className="text-3xl text-[#0F172A] mb-6 flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    Biography
                  </h2>
                  {member.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mb-12">
                  <h3 className="text-2xl text-[#0F172A] mb-6 flex items-center gap-3">
                    <GraduationCap className="w-6 h-6 text-[#10B981]" />
                    Education
                  </h3>
                  <div className="space-y-3">
                    {member.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{edu}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="mb-12">
                  <h3 className="text-2xl text-[#0F172A] mb-6 flex items-center gap-3">
                    <Award className="w-6 h-6 text-[#10B981]" />
                    Key Achievements
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {member.achievements.map((achievement, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 p-4 rounded-xl border border-[#10B981]/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <span className="text-gray-700 text-sm">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="mb-12">
                  <h3 className="text-2xl text-[#0F172A] mb-6 flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-[#10B981]" />
                    Professional Experience
                  </h3>
                  <div className="space-y-4">
                    {member.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="border-l-4 border-[#10B981] pl-6 py-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        <p className="text-gray-700">{exp}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
