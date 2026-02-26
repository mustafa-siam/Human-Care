
"use client"
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const updatesData = {
  'emergency-flood-relief': {
    date: 'Feb 20, 2026',
    title: 'Emergency Flood Relief Distribution Completed',
    type: 'urgent',
    content: `Our emergency response team successfully completed the distribution of relief supplies to 5,000 families affected by the recent floods in Sylhet district. This rapid response operation was launched within 24 hours of the flood emergency declaration.

The relief packages included essential food items (rice, lentils, cooking oil), clean drinking water, emergency medicines, hygiene kits, and temporary shelter materials. Our field teams worked around the clock in challenging conditions to ensure that aid reached even the most remote and inaccessible areas.

Special attention was given to vulnerable groups including elderly people, pregnant women, and families with young children. Medical teams accompanied the relief distribution to provide immediate health assessments and treatments for waterborne diseases and injuries.

This operation was made possible by the generous support of our donors and the dedication of 150 volunteers who worked tirelessly in difficult conditions. We continue to monitor the situation and are prepared to provide additional support as needed for long-term recovery.`,
    images: [
      'https://images.unsplash.com/photo-1764684994219-8347a5ab0e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZiUyMGh1bWFuaXRhcmlhbiUyMGFpZHxlbnwxfHx8fDE3NzE5NTg0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  'new-school-rajshahi': {
    date: 'Feb 15, 2026',
    title: 'New School Building Inaugurated in Rajshahi',
    type: 'success',
    content: `We are proud to announce the inauguration of our 15th educational institution in Rajshahi district. This modern school building features 12 well-equipped classrooms, a computer lab with 30 computers, a library with over 2,000 books, science laboratories, and safe playgrounds for children.

The school will serve 300 students from surrounding villages who previously had to walk over 5 kilometers to reach the nearest educational facility. Many of these children were unable to attend school regularly due to the distance and safety concerns.

The inauguration ceremony was attended by local community leaders, parents, and education officials. The event began with a ribbon-cutting ceremony followed by cultural performances by students. Parents expressed their gratitude and relief that their children now have access to quality education close to home.

This project represents a significant milestone in our Education for All program. The school employs 15 qualified teachers who have been trained in modern teaching methodologies. We have also established a parent-teacher association to ensure community involvement in the school's development.

Construction of this facility was completed in 18 months with support from our international partners and local donors. We extend our heartfelt thanks to everyone who made this dream a reality.`,
    images: [
      'https://images.unsplash.com/photo-1764645362980-08d8704fd102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbSUyMGRldmVsb3BpbmclMjBjb3VudHJ5fGVufDF8fHx8MTc3MTk1ODQ3OHww&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  },
  'mobile-health-clinic': {
    date: 'Feb 10, 2026',
    title: 'Mobile Health Clinic Reaches Remote Villages',
    type: 'notice',
    content: `Our mobile health clinic has successfully completed a week-long medical camp in the remote hill tracts of Bandarban, providing free healthcare services to over 800 people in areas where medical facilities are virtually non-existent.

The medical team, consisting of 5 doctors, 8 nurses, and 6 support staff, traveled through difficult terrain to reach villages that are several hours away from the nearest health center. They conducted comprehensive health check-ups, provided medications, administered vaccinations, and offered health education sessions.

Common health issues addressed included malnutrition, respiratory infections, skin diseases, and chronic conditions like diabetes and hypertension. The team also conducted dental check-ups and provided basic dental treatments.

A significant focus was placed on maternal and child health. Pregnant women received prenatal check-ups and nutritional supplements, while children under five were screened for growth and development. Immunization coverage was also extended to children who had missed their routine vaccinations.

This mobile health clinic initiative is part of our commitment to ensuring that healthcare reaches even the most underserved populations. We plan to continue these regular visits and are working on establishing permanent health posts in these remote areas.`,
    images: [
      'https://images.unsplash.com/photo-1706806595099-f07588729caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMHZvbHVudGVlcnMlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzcxOTU4NDc4fDA&ixlib=rb-4.1.0&q=80&w=1080'
    ]
  }
};

export function NoticeDetails() {
  const params=useParams()
  const title=params.slug as string
  const update = updatesData[title as keyof typeof updatesData];

  if (!update) {
    return (
      <div className="min-h-screen bg-white">
        
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl text-[#0F172A] mb-4">Notices Not Found</h1>
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
        <div className="container mx-auto px-6 max-w-4xl">

          <Link href="/">
            <motion.button
              className="flex items-center gap-2 text-gray-600 hover:text-[#10B981] mb-8 transition-colors duration-300"
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

            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <span className="text-gray-600">Share this update:</span>
              <motion.button
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full text-sm transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </motion.button>
            </div>
          </motion.div>

          {update.images && update.images.length > 0 && (
            <motion.div
              className="mb-12 rounded-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img
                src={update.images[0]}
                alt={update.title}
                className="w-full h-96 object-cover"
              />
            </motion.div>
          )}

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
            <motion.button
              className="bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Donate Now
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}