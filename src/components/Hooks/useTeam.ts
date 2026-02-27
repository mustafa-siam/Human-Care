export const useTeam = () => {
  const team = [
    {
      slug: "dr-nusrat-rahman",
      name: "Dr. Nusrat Rahman",
      role: "Founder & Executive Director",
      bio: "Project management expert overseeing field operations with a 95% project success rate.",
      expertise: 'Public Health, Humanitarian Leadership, Community Development',
      image:
        "https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      education: [
        "Doctor of Medicine (MD) - Dhaka Medical College",
        "Master of Public Health (MPH) - Johns Hopkins University, USA",
        "Certificate in Humanitarian Leadership - Harvard University",
      ],
      achievements: [
        "Founded Human Care Global in 2010",
        "National NGO Excellence Award 2023",
        "Expanded operations to 12 districts across Bangladesh",
        "Served over 50,000 beneficiaries",
        "Published 15+ research papers on community health",
      ],
      experience: [
        "2010-Present: Founder & Executive Director, Human Care Global",
        "2007-2010: Program Manager, BRAC Health Program",
        "2005-2007: Field Coordinator, Doctors Without Borders",
        "2003-2005: Medical Officer, Government of Bangladesh",
      ],
    },
    {
      slug: "fahim-ahmed",
      name: "Fahim Ahmed",
      role: "Director of Operations",
      bio: "Project management expert overseeing field operations with a 95% project success rate.",
      image:
        "https://images.unsplash.com/photo-1709785980187-5504ce6b7d55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
     expertise: 'Project Management, Operations, Sustainable Development',
      education: [
        "B.Sc. in Civil Engineering - BUET",
        "Master in Development Studies - University of Dhaka",
        "Project Management Professional (PMP) Certification",
      ],
      achievements: [
        "Successfully managed 50+ development projects",
        "Implemented operations in 12 districts",
        "Trained over 200 field staff and volunteers",
        "Achieved 95% project success rate",
        "Developed standardized operational protocols",
      ],
      experience: [
        "2018-Present: Director of Operations, Human Care Global",
        "2013-2018: Senior Project Manager, Human Care Global",
        "2011-2013: Infrastructure Coordinator, Care Bangladesh",
        "2009-2011: Civil Engineer, Private Sector",
      ],
    },
    {
      slug: "sabrina-chowdhury",
      name: "Sabrina Chowdhury",
      role: "Head of Education Programs",
      bio: "Passionate educator leading efforts to make quality education accessible.",
      image:
        "https://images.unsplash.com/photo-1697510364485-e900c2fe7524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      expertise: 'Educational Leadership, Teacher Training, Girls Education',
        education: [
        "B.Sc. in Civil Engineering - BUET",
        "Master in Development Studies - University of Dhaka",
        "Project Management Professional (PMP) Certification",
      ],
      achievements: [
        "Successfully managed 50+ development projects",
        "Implemented operations in 12 districts",
        "Trained over 200 field staff and volunteers",
        "Achieved 95% project success rate",
        "Developed standardized operational protocols",
      ],
      experience: [
        "2018-Present: Director of Operations, Human Care Global",
        "2013-2018: Senior Project Manager, Human Care Global",
        "2011-2013: Infrastructure Coordinator, Care Bangladesh",
        "2009-2011: Civil Engineer, Private Sector",
      ],
    }, 
    {
      slug: "imran-hossain",
      name: "Imran Hossain",
      role: "Finance & Transparency Officer",
      bio: "Chartered Accountant ensuring transparent operations and maximum impact.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      expertise: 'Financial Management, Audit Compliance, Transparency',
        education: [
        "B.Sc. in Civil Engineering - BUET",
        "Master in Development Studies - University of Dhaka",
        "Project Management Professional (PMP) Certification",
      ],
      achievements: [
        "Successfully managed 50+ development projects",
        "Implemented operations in 12 districts",
        "Trained over 200 field staff and volunteers",
        "Achieved 95% project success rate",
        "Developed standardized operational protocols",
      ],
      experience: [
        "2018-Present: Director of Operations, Human Care Global",
        "2013-2018: Senior Project Manager, Human Care Global",
        "2011-2013: Infrastructure Coordinator, Care Bangladesh",
        "2009-2011: Civil Engineer, Private Sector",
      ],
    },
  ];

  const getTeamMemberBySlug = (slug: string) => {
    return team.find((member) => member.slug === slug);
  };
  return {
    team,
    getTeamMemberBySlug,
  };
};