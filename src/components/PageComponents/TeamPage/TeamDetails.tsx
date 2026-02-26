"use client"
import { motion } from 'motion/react';
import { ArrowLeft, Mail, Linkedin, Award, GraduationCap, Briefcase } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const teamData = {
  'dr-nusrat-rahman': {
    name: 'Dr. Nusrat Rahman',
    role: 'Founder & Executive Director',
    image: 'https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBBc2lhbiUyMHRlYW0lMjBtZW1iZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE5NTg2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: `Dr. Nusrat Rahman is a visionary leader who founded Human Care Global in 2010 with a mission to transform lives across Bangladesh. With over 15 years of experience in humanitarian work and community healthcare, she has been instrumental in establishing our organization as a trusted partner in development.

Born and raised in Dhaka, Dr. Rahman completed her medical degree at Dhaka Medical College before pursuing a Master's in Public Health from Johns Hopkins University. Her passion for serving underserved communities was ignited during her medical internship when she witnessed the devastating impact of poverty on health outcomes.

Before founding Human Care Global, Dr. Rahman worked with several international NGOs including Doctors Without Borders and BRAC, gaining valuable experience in emergency response, program management, and community mobilization. She led medical missions in some of the most challenging environments, from flood-affected regions to remote hill tracts.

Under her leadership, Human Care Global has grown from a small team running weekend medical camps to a comprehensive development organization serving over 50,000 people annually. Her approach emphasizes community ownership, sustainable solutions, and transparent operations.

Dr. Rahman is a frequent speaker at international conferences on healthcare access and humanitarian response. She has received numerous awards including the National NGO Excellence Award and recognition from the Ministry of Health for her contributions to rural healthcare.`,
    education: [
      'Doctor of Medicine (MD) - Dhaka Medical College',
      'Master of Public Health (MPH) - Johns Hopkins University, USA',
      'Certificate in Humanitarian Leadership - Harvard University'
    ],
    achievements: [
      'Founded Human Care Global in 2010',
      'National NGO Excellence Award 2023',
      'Expanded operations to 12 districts across Bangladesh',
      'Served over 50,000 beneficiaries',
      'Published 15+ research papers on community health'
    ],
    experience: [
      '2010-Present: Founder & Executive Director, Human Care Global',
      '2007-2010: Program Manager, BRAC Health Program',
      '2005-2007: Field Coordinator, Doctors Without Borders',
      '2003-2005: Medical Officer, Government of Bangladesh'
    ]
  },
  'fahim-ahmed': {
    name: 'Fahim Ahmed',
    role: 'Director of Operations',
    image: 'https://images.unsplash.com/photo-1709785980187-5504ce6b7d55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMG1hbGUlMjBidXNpbmVzcyUyMHBvcnRyYWl0JTIwc21pbGV8ZW58MXx8fHwxNzcxOTU4NjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: `Fahim Ahmed brings over 12 years of project management expertise to Human Care Global. As Director of Operations, he oversees all field operations, ensuring that our programs are implemented efficiently and achieve maximum impact.

A graduate of Bangladesh University of Engineering and Technology (BUET) with a degree in Civil Engineering, Fahim initially worked on infrastructure development projects. However, his desire to create social impact led him to transition into the development sector. He pursued a Master's in Development Studies from the University of Dhaka, specializing in sustainable development and community engagement.

Fahim joined Human Care Global in 2013 as a Project Coordinator and quickly rose through the ranks due to his exceptional organizational skills and dedication. He has successfully managed complex, multi-district programs including our flagship Clean Water Initiative and Education for All program.

His approach to operations emphasizes data-driven decision making, community participation, and environmental sustainability. Under his leadership, we have achieved a 95% project success rate and significantly improved our operational efficiency.

Fahim is particularly passionate about capacity building and has trained over 200 field staff and community volunteers. He believes that sustainable development requires investing in people and empowering local communities to take ownership of their development.`,
    education: [
      'B.Sc. in Civil Engineering - BUET',
      'Master in Development Studies - University of Dhaka',
      'Project Management Professional (PMP) Certification'
    ],
    achievements: [
      'Successfully managed 50+ development projects',
      'Implemented operations in 12 districts',
      'Trained over 200 field staff and volunteers',
      'Achieved 95% project success rate',
      'Developed standardized operational protocols'
    ],
    experience: [
      '2018-Present: Director of Operations, Human Care Global',
      '2013-2018: Senior Project Manager, Human Care Global',
      '2011-2013: Infrastructure Coordinator, Care Bangladesh',
      '2009-2011: Civil Engineer, Private Sector'
    ]
  },
  'sabrina-chowdhury': {
    name: 'Sabrina Chowdhury',
    role: 'Head of Education Programs',
    image: 'https://images.unsplash.com/photo-1697510364485-e900c2fe7524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTb3V0aCUyMEFzaWFuJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE5NTg2NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: `Sabrina Chowdhury is a passionate educator who has dedicated her career to making quality education accessible to every child in Bangladesh. As Head of Education Programs, she leads our efforts to build schools, train teachers, and provide scholarships to underprivileged students.

With a Bachelor's in Education from Dhaka University and a Master's in Educational Leadership from Teachers College, Columbia University, Sabrina combines academic expertise with practical experience. She spent five years as a classroom teacher in rural Bangladesh before joining the development sector.

Her teaching experience gave her firsthand insight into the challenges faced by rural schools - lack of trained teachers, inadequate infrastructure, and limited learning materials. This motivated her to work at the systemic level to create lasting change in the education sector.

Since joining Human Care Global in 2015, Sabrina has overseen the construction of 15 schools, trained 250 teachers, and established scholarship programs that have benefited over 2,000 students. She has also pioneered our digital learning initiative, bringing computer education to remote villages.

Sabrina is a strong advocate for girls' education and has implemented special programs to increase female enrollment and reduce dropout rates. Under her leadership, female enrollment in our schools has increased by 40%.`,
    education: [
      'Bachelor of Education - University of Dhaka',
      'Master in Educational Leadership - Columbia University, USA',
      'Certificate in Digital Learning - MIT'
    ],
    achievements: [
      'Built 15 schools serving 12,000+ students',
      'Trained 250+ teachers in modern pedagogy',
      'Provided scholarships to 2,000+ students',
      'Increased female enrollment by 40%',
      'Launched digital learning centers in 15 villages'
    ],
    experience: [
      '2015-Present: Head of Education Programs, Human Care Global',
      '2012-2015: Education Specialist, Save the Children',
      '2007-2012: Primary School Teacher, Rural Bangladesh',
      '2010-2012: Part-time Education Consultant, UNICEF Bangladesh'
    ]
  },
  'imran-hossain': {
    name: 'Imran Hossain',
    role: 'Finance & Transparency Officer',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxBc2lhbiUyMG1hbGUlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTk1ODY5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    bio: `Imran Hossain is a Chartered Accountant who ensures that every donation to Human Care Global is used transparently and creates maximum impact. As Finance & Transparency Officer, he oversees all financial operations, audit compliance, and donor reporting.

Graduating with honors in Accounting from the Institute of Chartered Accountants of Bangladesh (ICAB), Imran worked for several years in the private sector before being drawn to the NGO world. He was inspired by the opportunity to use his financial expertise to support social causes.

Imran joined Human Care Global in 2016 and immediately implemented robust financial systems and controls. His meticulous approach has earned the organization recognition for financial transparency, with 95% of funds going directly to programs - one of the highest ratios in the sector.

He has successfully managed audits from multiple international donors and regulatory bodies, maintaining a perfect compliance record. His detailed financial reports provide donors with clear visibility into how their contributions are being used and the impact being achieved.

Beyond number-crunching, Imran is passionate about building donor trust through transparency. He pioneered our practice of publishing detailed annual reports and making financial information publicly available. He believes that transparency is not just good practice - it's essential for building the trust needed to create lasting change.`,
    education: [
      'Chartered Accountant (CA) - ICAB',
      'Bachelor in Accounting & Finance - Dhaka University',
      'Certificate in Nonprofit Financial Management - Harvard'
    ],
    achievements: [
      'Maintained 95% program fund allocation',
      'Perfect audit compliance record for 8 years',
      'Implemented comprehensive financial systems',
      'Published 8 detailed annual transparency reports',
      'Secured funding from 15+ international donors'
    ],
    experience: [
      '2016-Present: Finance & Transparency Officer, Human Care Global',
      '2013-2016: Senior Accountant, ActionAid Bangladesh',
      '2010-2013: Audit Manager, Private Accounting Firm',
      '2008-2010: Junior Accountant, Multinational Corporation'
    ]
  }
};

export function TeamDetails() {
  const params=useParams()
  const slug=params.slug as string
  const member = teamData[slug as keyof typeof teamData];

  if (!member) {
    return (
      <div className="min-h-screen bg-white">
    
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl text-[#0F172A] mb-4">Team Member Not Found</h1>
          <Link href="/" className="text-[#10B981] hover:text-[#059669]">
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
              className="flex items-center gap-2 text-gray-600 hover:text-[#10B981] mb-8 transition-colors duration-300"
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
