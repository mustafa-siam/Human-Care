"use client"
import { motion } from 'motion/react';
import { Heart, GraduationCap, HandHeart, Users } from 'lucide-react';

const pillars = [
  {
    icon: Heart,
    title: 'Health',
    description: 'Providing essential healthcare services, mobile clinics, and health awareness programs to underserved communities across Bangladesh.',
    color: '#10B981',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Building schools, training teachers, and providing scholarships to ensure every child has access to quality education.',
    color: '#10B981',
  },
  {
    icon: HandHeart,
    title: 'Relief',
    description: 'Rapid response to natural disasters and emergencies with food, shelter, and essential supplies for affected families.',
    color: '#10B981',
  },
  {
    icon: Users,
    title: 'Empowerment',
    description: 'Skills training, microfinance programs, and livelihood support to help communities become self-sufficient and prosperous.',
    color: '#10B981',
  },
];

export function Focus() {
  return (
    <section id="focus" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
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
            Our Focus Areas
          </motion.div>
          <h2 className="text-4xl lg:text-5xl text-[#0F172A] mb-4">
            Four Pillars of Change
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transforming lives through comprehensive programs designed to address the most critical needs of our communities
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              className="group relative bg-white rounded-2xl p-8 border-2 border-[#10B981]/20 hover:border-[#10B981] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon container with gradient */}
              <motion.div
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 5 }}
              >
                <pillar.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-2xl text-[#0F172A] mb-3">
                {pillar.title}
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6">
                {pillar.description}
              </p>

              {/* Animated underline */}
              <div className="h-1 w-0 bg-gradient-to-r from-[#10B981] to-[#059669] group-hover:w-full transition-all duration-500 rounded-full"></div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/0 to-[#10B981]/0 group-hover:from-[#10B981]/5 group-hover:to-[#059669]/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-600 mb-6">
            Every contribution makes a difference in someone's life
          </p>
          <motion.button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Support Our Mission
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
