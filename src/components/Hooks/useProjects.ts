export const useProjects =()=>{
    const projects= [
  {
    slug: 'clean-water-initiative',
    title: 'Clean Water Initiative',
    location: 'Dhaka & Chittagong',
    description: 'Installing water purification systems and building wells to provide clean drinking water to 10,000 families in rural areas.',
    image: 'https://images.unsplash.com/photo-1760873059715-7c7cfbe2a2c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwcHJvamVjdCUyMGRldmVsb3BpbmclMjBjb3VudHJ5fGVufDF8fHx8MTc3MTk1ODQ4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 78,
    beneficiaries: '8,500+',
    timeline: '2024-2026',
    fullDescription: 'Access to clean water is a fundamental human right, yet thousands of families in rural Bangladesh still struggle with waterborne diseases. Our Clean Water Initiative addresses this critical need through a comprehensive approach that combines modern technology with community engagement. We install advanced water purification systems and construct deep tube wells in areas where groundwater contamination is a serious concern.',
    objectives: [
      'Install 50 water purification systems',
      'Build 100 deep tube wells',
      'Train local committees',
      'Provide hygiene education',
    ],
    impact: [
      '8,500 families supported',
      '60% disease reduction',
      '40 women trained',
      '25 villages self-managed',
    ],
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
    fullDescription: 'Education is the key to breaking the cycle of poverty. Our Education for All program focuses on creating sustainable educational infrastructure in underserved regions. We build modern schools equipped with libraries, computer labs, and safe playgrounds. Beyond infrastructure, we invest heavily in teacher training and provide comprehensive scholarships to ensure no child is left behind due to financial constraints.',
    objectives: [
      'Construct schools',
      'Train teachers',
      'Provide scholarships',
      'Digital centers',
    ],
    impact: [
      '12,000 students enrolled',
      '85% literacy improvement',
      '250 teachers certified',
      '15 communities benefited',
    ],
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
    fullDescription: 'Bangladesh faces recurring natural disasters including floods, cyclones, and landslides. Our Emergency Relief Fund ensures rapid response to these crises. We maintain stockpiles of essential supplies and have trained emergency response teams ready to deploy within hours. Our relief efforts go beyond immediate aid - we help families rebuild their lives and livelihoods.',
    objectives: [
      'Food packages',
      'Temporary shelters',
      'Medical assistance',
      'Livelihood support',
    ],
    impact: [
      '25,000 families helped',
      '10,000 shelters',
      '15,000 medical cases',
      '3,000 homes rebuilt',
    ],
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
    fullDescription: 'Bangladesh faces recurring natural disasters including floods, cyclones, and landslides. Our Emergency Relief Fund ensures rapid response to these crises. We maintain stockpiles of essential supplies and have trained emergency response teams ready to deploy within hours. Our relief efforts go beyond immediate aid - we help families rebuild their lives and livelihoods.',
    objectives: [
      'Train 500 women',
      'Provide micro-loans',
      'Business mentorship',
      'Women leadership programs',
    ],
    impact: [
      '3,500 empowered',
      '800 businesses launched',
      '60% income increase',
      'Stronger communities',
    ],
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
    fullDescription: 'Bangladesh faces recurring natural disasters including floods, cyclones, and landslides. Our Emergency Relief Fund ensures rapid response to these crises. We maintain stockpiles of essential supplies and have trained emergency response teams ready to deploy within hours. Our relief efforts go beyond immediate aid - we help families rebuild their lives and livelihoods.',
    objectives: [
      'Operate 10 vans',
      'Free checkups',
      'Distribute medicine',
      'Vaccination campaigns',
    ],
    impact: [
      '15,000 patients treated',
      '5,000 vaccinations',
      'Improved rural access',
      'Disease reduction',
    ],
  },

  {
    slug: 'food-security',
    title: 'Food Security Initiative',
    location: "Cox's Bazar",
    description: 'Operating mobile medical units to provide free healthcare services, vaccinations, and health education to remote villages.',
    image: 'https://images.unsplash.com/photo-1759411354058-9e429834f92f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGlzdHJpYnV0aW9uJTIwaHVtYW5pdGFyaWFufGVufDF8fHx8MTc3MTg2NTgxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    progress: 85,
    beneficiaries: '7,200+',
    timeline: '2024-2025',
    fullDescription: 'Bangladesh faces recurring natural disasters including floods, cyclones, and landslides. Our Emergency Relief Fund ensures rapid response to these crises. We maintain stockpiles of essential supplies and have trained emergency response teams ready to deploy within hours. Our relief efforts go beyond immediate aid - we help families rebuild their lives and livelihoods.',
    objectives: [
      'Daily meals',
      '20 kitchens',
      'Nutrition education',
      'Local farming support',
    ],
    impact: [
      '7,200 families supported',
      '20 kitchens active',
      'Reduced malnutrition',
      'Food stability improved',
    ],
  },
];
  const getProjectBySlug = (slug: string) => {
    return projects.find((project) => project.slug === slug);
  };

  return {
    projects,
    getProjectBySlug,
  };
};