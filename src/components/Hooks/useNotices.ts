export const useNotices = () => {
   const notices = [
  {
    slug: 'emergency-flood-relief',
    date: 'Feb 20, 2026',
    title: 'Emergency Flood Relief Distribution Completed',
    description:'Successfully distributed emergency supplies to 5,000 families affected by recent floods in Sylhet district.',
    excerpt:'Our emergency response team worked around the clock to provide essential supplies including food, water, medicines, and temporary shelter materials to flood-affected families.',
    content:`Our emergency response team successfully completed the distribution of relief supplies to 5,000 families affected by the recent floods in Sylhet district. This rapid response operation was launched within 24 hours of the flood emergency declaration.
    The relief packages included essential food items (rice, lentils, cooking oil), clean drinking water, emergency medicines, hygiene kits, and temporary shelter materials.
    Special attention was given to vulnerable groups including elderly people, pregnant women, and families with young children.
    This operation was made possible by the generous support of our donors and the dedication of 150 volunteers who worked tirelessly in difficult conditions.`,
    type: 'urgent',
    latest: true,
    image:'https://images.unsplash.com/photo-1764684994219-8347a5ab0e5e'

  },

  {
    slug: 'new-school-rajshahi',
    date: 'Feb 15, 2026',
    title: 'New School Building Inaugurated in Rajshahi',
    description:'Our 15th educational institution opened its doors to 300 students, featuring modern classrooms and a library.',
    excerpt:'This modern school building features 12 well-equipped classrooms, a computer lab, library with 2,000 books, and safe playgrounds for children.',
    content: `We are proud to announce the inauguration of our 15th educational institution in Rajshahi district.
    The school features 12 classrooms, a computer lab with 30 computers, a library with over 2,000 books, science laboratories, and safe playgrounds.
    The school will serve 300 students from surrounding villages who previously had to walk long distances for education.
    This project represents a significant milestone in our Education for All program.`,
    type: 'success',
    latest: true,
    image:'https://images.unsplash.com/photo-1764645362980-08d8704fd102'
  },

  {
    slug: 'mobile-health-clinic',
    date: 'Feb 10, 2026',
    title: 'Mobile Health Clinic Reaches Remote Villages',
    description:
      'Medical team provided free check-ups and medications to over 800 people in hard-to-reach areas of Bandarban.',
    excerpt:
      'Our mobile health clinic successfully completed a week-long medical camp providing healthcare services to remote communities.',
    content: `Our mobile health clinic completed a week-long medical camp in Bandarban, serving over 800 people.

The team conducted health check-ups, provided medications, administered vaccinations, and delivered maternal healthcare services.

This initiative ensures healthcare access for underserved populations.`,
    type: 'notice',
    latest: false,
    image:'https://images.unsplash.com/photo-1706806595099-f07588729caf'
  },

  {
    slug: 'women-empowerment-workshop',
    date: 'Feb 5, 2026',
    title: 'Women Empowerment Workshop Success',
    description:
      '150 women completed vocational training in tailoring and handicrafts, receiving startup kits.',
    excerpt:
      'Participants received comprehensive training and ongoing mentorship to help establish sustainable income sources.',
    content: `150 women successfully completed vocational training in tailoring and handicrafts.

Each participant received a startup kit and business mentorship support.

This initiative empowers women to generate sustainable income for their families.`,
    type: 'success',
    latest: false,
    image:'https://images.unsplash.com/photo-1706806595099-f07588729caf'
  },

  {
    slug: 'annual-transparency-report',
    date: 'Jan 28, 2026',
    title: 'Annual Transparency Report Published',
    description:'Our 2025 financial and impact report is now available, showing 95% of donations directly funding programs.',
    excerpt:'The comprehensive report details financial performance and program outcomes.',
    content: `Our 2025 Annual Transparency Report is now published.The report outlines financial performance, program achievements, and measurable community impact.
              95% of donations directly funded development programs.`,
    type: 'notice',
    latest: true,
    image:'https://images.unsplash.com/photo-1706806595099-f07588729caf'
  }
];

  const getNoticeBySlug = (slug: string) => {
    return notices.find((notice) => notice.slug === slug);
  };

  const getLatestNotices = () => {
    return notices.filter((notice) => notice.latest);
  };

  return {
    notices,
    getNoticeBySlug,
    getLatestNotices,
  };
};