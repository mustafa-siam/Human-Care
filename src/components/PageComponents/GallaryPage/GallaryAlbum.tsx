"use client"
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Image as ImageIcon, Calendar } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import Link from 'next/link';

const galleryAlbums = [
  {
    id: 'all',
    name: 'All Photos',
    count: 0,
  },
  {
    id: 'education',
    name: 'Education',
    count: 8,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    count: 6,
  },
  {
    id: 'water',
    name: 'Clean Water',
    count: 6,
  },
  {
    id: 'emergency',
    name: 'Emergency Relief',
    count: 5,
  },
  {
    id: 'community',
    name: 'Community',
    count: 7,
  },
];

const galleryImages = [
  // Education
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1764645362980-08d8704fd102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGVkdWNhdGlvbiUyMGNsYXNzcm9vbSUyMGRldmVsb3BpbmclMjBjb3VudHJ5fGVufDF8fHx8MTc3MTk1ODQ3OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'education',
    title: 'New School in Rajshahi',
    date: 'Feb 2026',
    description: 'Students in our newly built classroom facility',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHN0dWR5aW5nJTIwc2Nob29sfGVufDF8fHx8MTc0MDg3MjQyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'education',
    title: 'Learning in Progress',
    date: 'Feb 2026',
    description: 'Students engaged in interactive learning',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxpYnJhcnklMjByZWFkaW5nfGVufDF8fHx8MTc0MDg3MjQyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'education',
    title: 'Library Reading Time',
    date: 'Jan 2026',
    description: 'Children exploring books in our new library',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNsYXNzcm9vbSUyMGhhcHB5fGVufDF8fHx8MTc0MDg3MjQyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'education',
    title: 'Happy Students',
    date: 'Jan 2026',
    description: 'Celebrating achievements in education',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFjaGVyJTIwc3R1ZGVudCUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NDA4NzI0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'education',
    title: 'Teacher Training',
    date: 'Jan 2026',
    description: 'Educators learning modern teaching methods',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGNvbXB1dGVyJTIwbGVhcm5pbmd8ZW58MXx8fHwxNzQwODcyNDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'education',
    title: 'Digital Learning Center',
    date: 'Dec 2025',
    description: 'Students learning computer skills',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBjaGlsZHJlbiUyMHBsYXlncm91bmR8ZW58MXx8fHwxNzQwODcyNDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'education',
    title: 'Playground Activities',
    date: 'Dec 2025',
    description: 'Children enjoying safe play areas',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzQwODcyNDI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'education',
    title: 'Graduation Day',
    date: 'Dec 2025',
    description: 'Celebrating student achievements',
  },

  // Healthcare
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1706806595099-f07588729caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMHZvbHVudGVlcnMlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzcxOTU4NDc4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'healthcare',
    title: 'Mobile Health Clinic',
    date: 'Feb 2026',
    description: 'Medical team serving remote villages',
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwYXRpZW50JTIwY2FyZXxlbnwxfHx8fDE3NDA4NzI0Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'healthcare',
    title: 'Patient Care',
    date: 'Feb 2026',
    description: 'Providing quality healthcare services',
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWNjaW5hdGlvbiUyMGNoaWxkJTIwaGVhbHRofGVufDF8fHx8MTc0MDg3MjQzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'healthcare',
    title: 'Vaccination Drive',
    date: 'Jan 2026',
    description: 'Immunization program for children',
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1579154392429-0e6b4e850ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2FtcCUyMGNvbW11bml0eXxlbnwxfHx8fDE3NDA4NzI0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'healthcare',
    title: 'Health Camp',
    date: 'Jan 2026',
    description: 'Free medical checkups for all',
  },
  {
    id: 13,
    url: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3RoZXIlMjBiYWJ5JTIwaGVhbHRoY2FyZXxlbnwxfHx8fDE3NDA4NzI0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'healthcare',
    title: 'Maternal Health',
    date: 'Dec 2025',
    description: 'Mother and child healthcare program',
  },
  {
    id: 14,
    url: 'https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGhlYWx0aHdvcmtlcnN8ZW58MXx8fHwxNzQwODcyNDMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'healthcare',
    title: 'Healthcare Team',
    date: 'Dec 2025',
    description: 'Our dedicated medical professionals',
  },

  // Clean Water
  {
    id: 15,
    url: 'https://images.unsplash.com/photo-1760873059715-7c7cfbe2a2c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwcHJvamVjdCUyMGRldmVsb3BpbmclMjBjb3VudHJ5fGVufDF8fHx8MTc3MTk1ODQ4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'water',
    title: 'Water Purification System',
    date: 'Feb 2026',
    description: 'Installing clean water systems',
  },
  {
    id: 16,
    url: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHdlbGwlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzQwODcyNDMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'water',
    title: 'Community Well',
    date: 'Jan 2026',
    description: 'New well serving 500 families',
  },
  {
    id: 17,
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGhhbmQlMjBwdW1wfGVufDF8fHx8MTc0MDg3MjQzNHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'water',
    title: 'Hand Pump Installation',
    date: 'Jan 2026',
    description: 'Accessible water for rural areas',
  },
  {
    id: 18,
    url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGRyaW5raW5nJTIwd2F0ZXJ8ZW58MXx8fHwxNzQwODcyNDM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'water',
    title: 'Clean Water Access',
    date: 'Dec 2025',
    description: 'Children with safe drinking water',
  },
  {
    id: 19,
    url: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGZpbHRyYXRpb24lMjBzeXN0ZW18ZW58MXx8fHwxNzQwODcyNDM2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'water',
    title: 'Filtration System',
    date: 'Dec 2025',
    description: 'Advanced water purification technology',
  },
  {
    id: 20,
    url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRhbmslMjBzdG9yYWdlfGVufDF8fHx8MTc0MDg3MjQzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'water',
    title: 'Water Storage',
    date: 'Nov 2025',
    description: 'Community water storage facilities',
  },

  // Emergency Relief
  {
    id: 21,
    url: 'https://images.unsplash.com/photo-1764684994219-8347a5ab0e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZiUyMGh1bWFuaXRhcmlhbiUyMGFpZHxlbnwxfHx8fDE3NzE5NTg0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'emergency',
    title: 'Flood Relief Distribution',
    date: 'Feb 2026',
    description: 'Emergency supplies for affected families',
  },
  {
    id: 22,
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXNhc3RlciUyMHJlbGllZiUyMGZvb2R8ZW58MXx8fHwxNzQwODcyNDM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'emergency',
    title: 'Food Distribution',
    date: 'Feb 2026',
    description: 'Providing essential food packages',
  },
  {
    id: 23,
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxpZWYlMjBzaGVsdGVyJTIwdGVudHxlbnwxfHx8fDE3NDA4NzI0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'emergency',
    title: 'Emergency Shelters',
    date: 'Jan 2026',
    description: 'Temporary housing for displaced families',
  },
  {
    id: 24,
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjB3b3JrJTIwY29tbXVuaXR5fGVufDF8fHx8MTc0MDg3MjQ0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'emergency',
    title: 'Volunteer Response Team',
    date: 'Jan 2026',
    description: 'Dedicated volunteers in action',
  },
  {
    id: 25,
    url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxpZWYlMjBzdXBwbGllcyUyMGJveGVzfGVufDF8fHx8MTc0MDg3MjQ0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'emergency',
    title: 'Relief Supplies',
    date: 'Dec 2025',
    description: 'Organizing emergency aid packages',
  },

  // Community
  {
    id: 26,
    url: 'https://images.unsplash.com/photo-1759738099669-d64b0656f6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGVtcG93ZXJtZW50JTIwY29tbXVuaXR5JTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzcxOTIwMDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'community',
    title: 'Women Empowerment',
    date: 'Feb 2026',
    description: 'Vocational training workshop',
  },
  {
    id: 27,
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXRoZXJpbmclMjBtZWV0aW5nfGVufDF8fHx8MTc0MDg3MjQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'community',
    title: 'Community Meeting',
    date: 'Feb 2026',
    description: 'Village development planning session',
  },
  {
    id: 28,
    url: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtaW5nJTIwYWdyaWN1bHR1cmUlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzQwODcyNDQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'community',
    title: 'Agriculture Training',
    date: 'Jan 2026',
    description: 'Sustainable farming techniques',
  },
  {
    id: 29,
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB3b3Jrc2hvcCUyMHRyYWluaW5nfGVufDF8fHx8MTc0MDg3MjQ0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'community',
    title: 'Skills Development',
    date: 'Jan 2026',
    description: 'Handicraft and tailoring workshop',
  },
  {
    id: 30,
    url: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBjZWxlYnJhdGlvbiUyMGZlc3RpdmFsfGVufDF8fHx8MTc0MDg3MjQ0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'community',
    title: 'Community Celebration',
    date: 'Dec 2025',
    description: 'Festival with local families',
  },
  {
    id: 31,
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2x1bnRlZXIlMjB3b3JrJTIwY29tbXVuaXR5fGVufDF8fHx8MTc0MDg3MjQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'community',
    title: 'Volunteer Work',
    date: 'Dec 2025',
    description: 'Community service day',
  },
  {
    id: 32,
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXJkZW4lMjB2ZWdldGFibGV8ZW58MXx8fHwxNzQwODcyNDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'community',
    title: 'Community Garden',
    date: 'Nov 2025',
    description: 'Sustainable food production',
  },
];

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image: typeof galleryImages[0], index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
    setLightboxIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxImage(filteredImages[prevIndex]);
    setLightboxIndex(prevIndex);
  };

  galleryAlbums[0].count = galleryImages.length;

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
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-[#10B981]/10 text-[#10B981] px-4 py-2 rounded-full text-sm mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <ImageIcon className="w-4 h-4" />
              Photo Gallery
            </motion.div>
            <h1 className="text-5xl text-[#0F172A] mb-4">
              Our Impact in Pictures
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore moments of transformation, hope, and community development across Bangladesh
            </p>
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {galleryAlbums.map((album) => (
              <motion.button
                key={album.id}
                onClick={() => setSelectedCategory(album.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === album.id
                    ? 'bg-[#10B981] text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {album.name}
                <span className="ml-2 text-sm opacity-75">({album.count})</span>
              </motion.button>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Masonry columnsCount={3} gutter="20px">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  onClick={() => openLightbox(image, index)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-lg mb-1">{image.title}</h3>
                      <p className="text-sm text-white/80 mb-2">{image.description}</p>
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <Calendar className="w-3 h-3" />
                        <span>{image.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-[#0F172A] capitalize opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.category}
                  </div>
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
          {filteredImages.length === 0 && (
            <div className="text-center py-20">
              <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No images found in this category</p>
            </div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.button
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white z-10"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </motion.button>
            {filteredImages.length > 1 && (
              <motion.button
                className="absolute left-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white z-10"
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            )}
            {filteredImages.length > 1 && (
              <motion.button
                className="absolute right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white z-10"
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}

            <div className="max-w-6xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={lightboxImage.id}
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="mt-6 text-center text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-2xl mb-2">{lightboxImage.title}</h3>
                <p className="text-white/70 mb-2">{lightboxImage.description}</p>
                <div className="flex items-center justify-center gap-2 text-sm text-white/50">
                  <Calendar className="w-4 h-4" />
                  <span>{lightboxImage.date}</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{lightboxImage.category}</span>
                </div>
              </motion.div>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {lightboxIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
