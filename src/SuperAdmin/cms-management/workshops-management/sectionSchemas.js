/**
 * Public Workshops page ke har section ka apna editor schema + demo (seed) content.
 * Seed content Ilmora-workshops.jsx se liya gaya hai. Khali image / text = public page apna built-in default use karta hai.
 * Section id wahi hain jo public page Home() mein render hote hain.
 */
const t = (key, label, extra = {}) => ({ key, label, type: 'text', ...extra });
const ta = (key, label, extra = {}) => ({ key, label, type: 'textarea', ...extra });
const url = (key, label, extra = {}) => ({ key, label, type: 'url', ...extra });
const img = (key, label, extra = {}) => ({ key, label, type: 'image', ...extra });
const vid = (key, label, extra = {}) => ({ key, label, type: 'video', ...extra });
const num = (key, label, extra = {}) => ({ key, label, type: 'number', ...extra });
const tog = (key, label, extra = {}) => ({ key, label, type: 'toggle', ...extra });
const sel = (key, label, options, extra = {}) => ({ key, label, type: 'select', options, ...extra });
const tags = (key, label, extra = {}) => ({ key, label, type: 'tags', ...extra });
const list = (key, label, fields, extra = {}) => ({ key, label, type: 'list', fields, ...extra });
const dt = (key, label, extra = {}) => ({ key, label, type: 'datetime', ...extra });

const ICONS = ['compass', 'select', 'present', 'code', 'assess', 'award', 'book', 'users', 'video', 'message', 'file', 'bell', 'building', 'sparkles'];
const SOURCES = ['linkedin', 'x', 'whatsapp', 'google', 'youtube', 'other'];
const visible = tog('visible', 'Visible on public page');

export const SECTIONS = [
  {
    id: 'offer', name: 'Offer strip', group: 'Homepage & Hero', desc: 'Top banner: limited seats, cohort, price and countdown.',
    fields: [
      t('banner', 'Banner text'), t('cohort', 'Cohort / batch info'),
      dt('startsAt', 'Cohort start (shows countdown)', { help: 'Empty = countdown hidden.' }),
      num('price', 'Offer price (INR)'), num('original', 'Original price (INR)'),
      { key: 'registerSlug', label: 'Registration slug (Featured Program)', type: 'program', help: 'Chosen from Featured Programs. No duplicate workshop record is created.' },
      t('batchNote', 'Batch note'), ta('refund', 'Refund note'),
    ],
    seed: { banner: 'LIMITED SEATS: Register now at the launch price', cohort: 'Next cohort: SET REAL DATES', startsAt: '', price: 199, original: 9999, registerSlug: 'fullstack-nextjs-launchpad', batchNote: 'Batch 1 price. Increases from the next batch.', refund: 'If you complete every build and the workshop is not for you, request a refund within 24 hours of the final live session.' },
  },
  {
    id: 'hero', name: 'Hero', group: 'Homepage & Hero', desc: 'Headline, description, media, CTAs, statistics, next session.',
    fields: [
      t('headline', 'Headline'), t('subtitle', 'Subtitle'), ta('description', 'Description'),
      img('bgImage', 'Hero / background image'), vid('video', 'Hero video (mp4)'),
      t('primaryText', 'Primary button text'), t('primaryLink', 'Primary button link', { help: 'Empty = registration slug of the offer.' }),
      t('secondaryText', 'Secondary button text'), t('secondaryLink', 'Secondary button link'),
      list('stats', 'Statistics (only verified numbers)', [t('label', 'Label'), num('value', 'Value')], { itemLabel: 'label' }),
      tog('showNextSession', 'Show "Next session" card (from live Featured Programs)'),
    ],
    seed: { headline: 'Build real Java full-stack projects. Get certified.', subtitle: '', description: 'Learn Java, Spring Boot, databases and React by building a working application, step by step. Live build days with working instructors, self-paced lessons in between. Beginner friendly.', bgImage: '', video: '', primaryText: 'Reserve my seat', primaryLink: '', secondaryText: 'See the roadmap', secondaryLink: '#wk-roadmap', stats: [], showNextSession: true },
  },
  {
    id: 'cinematic', name: 'Cinematic journey', group: 'Visual & Learning', desc: 'Horizontal cinematic cards per roadmap day.',
    fields: [list('items', 'Cards', [t('day', 'Day label'), img('image', 'Image'), t('alt', 'Alt text'), t('caption', 'Caption')], { itemLabel: 'day' })],
    seed: { items: [] },
  },
  {
    id: 'featuredIn', name: 'Featured in', group: 'Visual & Learning', desc: 'Media / partner logos. Shown only when verified logos exist.',
    fields: [list('items', 'Logos (verified only)', [t('name', 'Name'), img('logo', 'Logo'), url('link', 'Article link')], { itemLabel: 'name' })],
    seed: { items: [] },
  },
  {
    id: 'whyNow', name: 'Why now', group: 'Visual & Learning', desc: 'Statistics with a cited source. Never invent numbers.',
    fields: [t('source', 'Source (required for public display)'), list('items', 'Statistics', [t('value', 'Value, e.g. 42%'), t('label', 'Description')], { itemLabel: 'label' })],
    seed: { source: '', items: [] },
  },
  {
    id: 'tools', name: 'Tools', group: 'Visual & Learning', desc: 'Tool logos marquee.',
    fields: [list('items', 'Tools', [t('name', 'Tool name'), img('logo', 'Logo'), t('desc', 'Short description')], { itemLabel: 'name' })],
    seed: { items: ['Claude', 'Make', 'Magnific AI', 'Runway', 'Luma AI', 'Topaz Labs', 'DaVinci Resolve', 'Midjourney', 'Perplexity'].map((name) => ({ name, logo: '', desc: '' })) },
  },
  {
    id: 'experience', name: 'Experience ILM ORA', group: 'Visual & Learning', desc: 'Video preview cards and video modal.',
    fields: [list('items', 'Videos', [t('title', 'Title'), ta('text', 'Text'), img('poster', 'Poster image'), t('youtube', 'YouTube ID'), vid('src', 'mp4 URL'), tog('illustrative', 'Mark as illustrative sample', { default: true })], { itemLabel: 'title' })],
    seed: { items: [
      { title: 'The learning environment', text: 'A look at the kind of collaborative room where hands-on sessions take place.', poster: '', youtube: '', src: '', illustrative: true },
      { title: 'Instructor at work', text: 'An instructor at a laptop, the way live build sessions are guided.', poster: '', youtube: '', src: '', illustrative: true },
      { title: 'A training session', text: 'A presentation-style training session with a group of learners.', poster: '', youtube: '', src: '', illustrative: true },
    ] },
  },
  {
    id: 'journey', name: 'Learning journey (6 steps)', group: 'Learning Journey & Roadmap', desc: 'Explore > Select > Learn > Build > Assess > Certificate.',
    fields: [list('items', 'Steps', [sel('icon', 'Icon', ICONS), t('title', 'Title'), ta('desc', 'Description'), img('image', 'Image'), t('alt', 'Alt text')], { itemLabel: 'title' })],
    seed: { items: [
      { icon: 'compass', title: 'Explore workshops', desc: 'Search by topic, level, price or date. Every workshop shows its instructor, format, duration and seats left before you decide.', image: '', alt: 'Learners together at an ILM ORA workshop' },
      { icon: 'select', title: 'Select your workshop', desc: 'Open the details page to read the agenda, outcomes and prerequisites, then register in about a minute.', image: '', alt: 'ILM ORA corporate training workshop in a classroom' },
      { icon: 'present', title: 'Learn from experts', desc: 'Join the live session with your instructor and ask questions in real time, or watch the recording whenever it suits you.', image: '', alt: 'Mentor guiding a learner' },
      { icon: 'code', title: 'Build practical projects', desc: 'Apply every idea to a real task during the session and leave with working output you can show.', image: '', alt: 'Learner coding during a focused workshop' },
      { icon: 'assess', title: 'Complete assessment', desc: 'Finish the session or modules and your instructor confirms completion.', image: '', alt: 'ILM ORA workshop instructor' },
      { icon: 'award', title: 'Earn your certificate', desc: 'Verified completions receive an ILM ORA certificate with a unique ID and QR verification.', image: '', alt: 'Learners receiving certificates' },
    ] },
  },
  {
    id: 'roadmap', name: 'Pain points & roadmap', group: 'Learning Journey & Roadmap', desc: 'Audience pain points and day-wise roadmap, Day 0 to Bonus.',
    fields: [
      list('painPoints', 'Audience pain points', [sel('icon', 'Icon', ICONS), t('title', 'Title'), ta('desc', 'Description')], { itemLabel: 'title' }),
      list('stages', 'Roadmap stages', [
        t('day', 'Day label (DAY 0 ... BONUS)'), t('when', 'When (weekday)'), tog('live', 'Live session'), t('time', 'Time / duration'),
        t('title', 'Title / objective'), ta('desc', 'Learning description'), img('image', 'Journey image'), tog('brk', 'Break / catch-up day'),
        list('projects', 'Projects & deliverables', [t('title', 'Deliverable'), t('desc', 'Description')], { itemLabel: 'title' }),
        list('resources', 'Learning resources', [t('title', 'Resource'), url('link', 'Link')], { itemLabel: 'title' }),
      ], { itemLabel: 'day' }),
      list('included', 'What is included', [t('text', 'Item')], { itemLabel: 'text' }),
    ],
    seed: {
      painPoints: [
        { icon: 'code', title: 'Learn Java but never build', desc: 'Syntax aata hai, par ek poora working project portfolio mein nahi hota.' },
        { icon: 'book', title: 'Theory without practice', desc: 'OOP aur collections yaad hain, par real backend ya API banana nahi aata.' },
        { icon: 'compass', title: 'No clear full-stack roadmap', desc: 'Pata nahi Java ke baad Spring Boot, database aur frontend kis order mein seekhein.' },
        { icon: 'users', title: 'No mentor to ask', desc: 'Error par atak jaate ho aur jawab dene wala koi nahi.' },
        { icon: 'award', title: 'Nothing to show recruiters', desc: 'Skills hain, par GitHub project aur verified certificate nahi.' },
      ],
      stages: [
        { day: 'DAY 0', when: 'Friday', live: true, time: '7PM to 9PM', title: 'Onboarding: set up your Java environment', desc: 'JDK, IDE and Git setup, the full-stack roadmap and your cohort. Ready to code from Day 1.', image: '', brk: false, projects: [], resources: [] },
        { day: 'DAY 1', when: 'Saturday', live: true, time: '10AM to 7PM', title: 'Core Java and OOP, with your first project', desc: 'Classes, objects, collections and clean code, applied to a real console application.', image: '', brk: false, projects: [{ title: 'Console app', desc: 'A working Java application' }, { title: 'OOP design', desc: 'Classes that model a real problem' }], resources: [] },
        { day: 'DAY 2', when: 'Sunday', live: true, time: '10AM to 7PM', title: 'Backend: Spring Boot, REST APIs and database', desc: 'Build an API, connect it to a database and test it like a professional.', image: '', brk: false, projects: [{ title: 'REST API', desc: 'Create, read, update and delete' }, { title: 'Database schema', desc: 'Tables and relationships' }], resources: [] },
        { day: 'DAY 3', when: 'Monday', live: false, time: 'Self-paced', title: 'Data layer: JPA, validation and error handling', desc: 'Guided lessons to make your backend reliable and production-minded.', image: '', brk: false, projects: [{ title: 'Entity mapping', desc: 'Java objects to database rows' }, { title: 'Validation and errors', desc: 'Clear API responses' }], resources: [] },
        { day: 'DAY 4', when: 'Tuesday', live: false, time: 'Self-paced', title: 'Frontend: connect a React UI to your API', desc: 'Build screens and call your own backend end to end.', image: '', brk: false, projects: [{ title: 'React screens', desc: 'List, form and detail pages' }, { title: 'API integration', desc: 'UI talking to your Spring Boot backend' }], resources: [] },
        { day: 'DAY 5', when: 'Break day', live: false, time: 'Catch-up', title: 'Catch up with your cohort', desc: 'Share progress, compare notes and unblock yourself before the final stretch.', image: '', brk: true, projects: [], resources: [] },
        { day: 'DAY 6', when: 'Thursday', live: false, time: 'Self-paced', title: 'Capstone: build your full-stack application', desc: 'Plan and build the project you will present: backend, database and frontend together.', image: '', brk: false, projects: [{ title: 'Capstone app', desc: 'Your best end-to-end work' }, { title: 'Demo walkthrough', desc: 'A short recorded demo' }], resources: [] },
        { day: 'DAY 7', when: 'Friday', live: false, time: 'Self-paced', title: 'Deploy and assessment', desc: 'Put your application online and get instructor review of your completed builds.', image: '', brk: false, projects: [{ title: 'Live deployment', desc: 'A link you can share' }, { title: 'Assessment', desc: 'Instructor-verified completion' }], resources: [] },
        { day: 'BONUS', when: 'Saturday', live: true, time: 'Evening live', title: 'Showcase and interview readiness', desc: 'Present your capstone, polish your GitHub and resume, and practise common Java interview questions.', image: '', brk: false, projects: [{ title: 'GitHub and resume', desc: 'Recruiter-ready profile' }, { title: 'Mock interview round', desc: 'Practice with feedback' }], resources: [] },
      ],
      included: ['Live sessions with working instructors', 'Build a real Java full-stack project, not just watch', 'Lifetime access to project files and templates', 'Private learner community', 'Instructor feedback and Q&A', 'Verified ILM ORA certificate with unique ID and QR'].map((text) => ({ text })),
    },
  },
  {
    id: 'mentors', name: 'Mentors & instructors', group: 'Instructors & Mentors', desc: 'Mentor profiles shown on the Workshops page.',
    fields: [list('items', 'Mentors', [
      t('name', 'Name'), img('photo', 'Profile photo'), t('role', 'Designation'), t('org', 'Organization'), ta('bio', 'Biography'),
      { key: 'workshops', label: 'Associated workshops (Featured Programs)', type: 'programs' },
      t('focus', 'Photo focus (CSS object-position)', { placeholder: '50% 20%' }), num('order', 'Display order'), tog('active', 'Active', { default: true }),
    ], { itemLabel: 'name', sortKey: 'order' })],
    seed: { items: [
      ['M. Shibli', 'Co-Founder', '50% 20%'], ['Shareef', 'Workshop Trainer', '50% 25%'], ['Raghib', 'Workshop Instructor', '50% 70%'],
      ['Vishesh', 'Workshop Trainer', '50% 20%'], ['Prachi Sharan', 'Workshop Coordinator', '50% 0%'], ['Yash Kumar', 'Workshop Coordinator', '50% 0%'],
    ].map(([name, role, focus], i) => ({ name, role, org: 'ILM ORA', photo: '', bio: '', workshops: [], focus, order: i + 1, active: true })) },
  },
  {
    id: 'community', name: 'Community & gallery', group: 'Visual & Learning', desc: 'Learner community photo carousel.',
    fields: [t('heading', 'Heading'), t('subtitle', 'Subtitle'), list('items', 'Gallery', [img('image', 'Photo'), t('caption', 'Caption / alt'), t('focus', 'Focus', { placeholder: '50% 40%' })], { itemLabel: 'caption' })],
    seed: { heading: 'Learner community and success stories', subtitle: 'Real moments from ILM ORA workshops.', items: ['Java workshop celebration', 'Focused coding session', 'Corporate training workshop', 'Workshop celebration', 'Live Java workshop'].map((caption) => ({ image: '', caption, focus: '50% 40%' })) },
  },
  {
    id: 'wallOfLove', name: 'Wall of love', group: 'Testimonials & Social Proof', desc: 'Text and video testimonials. Unverified items are labelled "Sample" publicly.',
    fields: [list('items', 'Testimonials', [
      t('name', 'Learner name'), t('role', 'Role'), img('photo', 'Learner image'), ta('text', 'Feedback'), num('rating', 'Rating (1-5)', { min: 1, max: 5 }),
      t('youtube', 'Video URL / YouTube ID'), sel('source', 'Review source', SOURCES), t('date', 'Date, e.g. Nov 2026'),
      tog('verified', 'Verified real feedback (permission cleared)'), tog('featured', 'Featured'), tog('visible', 'Visible', { default: true }),
    ], { itemLabel: 'name' })],
    seed: { items: [
      { name: 'Learner 1', role: 'ILM ORA learner', photo: '', text: '', rating: 0, youtube: 'VQL78M8Y7iY', source: 'youtube', date: '', verified: true, featured: true, visible: true },
      { name: 'Learner 2', role: 'ILM ORA learner', photo: '', text: '', rating: 0, youtube: 'R2fnssUvazU', source: 'youtube', date: '', verified: true, featured: false, visible: true },
      { name: 'Learner 3', role: 'ILM ORA learner', photo: '', text: '', rating: 0, youtube: 'PlHKF8dKZXA', source: 'youtube', date: '', verified: true, featured: false, visible: true },
      { name: 'Sample learner A', role: 'Sample role', photo: '', text: 'Sample text: yahan learner ka real feedback aayega.', rating: 5, youtube: '', source: 'linkedin', date: 'Nov 2026', verified: false, featured: false, visible: true },
      { name: 'Sample learner B', role: 'Sample role', photo: '', text: 'Sample text: live build days se kaafi kuch seekhne ko mila.', rating: 5, youtube: '', source: 'x', date: 'Nov 2026', verified: false, featured: false, visible: true },
    ] },
  },
  {
    id: 'corporate', name: 'Corporate training', group: 'Other Homepage Sections', desc: 'Corporate enquiry band.',
    fields: [t('heading', 'Heading'), ta('description', 'Description'), img('image', 'Image'), t('ctaText', 'Primary button text'), t('email', 'Enquiry email'), t('secondaryText', 'Secondary button text'), list('benefits', 'Benefits', [t('text', 'Benefit')], { itemLabel: 'text' })],
    seed: { heading: 'Corporate training for your team', description: 'Private batches, group pricing and custom workshops for companies and colleges, delivered live by ILM ORA instructors.', image: '', ctaText: 'Talk to us', email: '', secondaryText: 'Browse workshops', benefits: [] },
  },
  {
    id: 'workshops', name: 'Workshop collections', group: 'Workshop Content', desc: 'Where Featured Programs appear. Records are NOT duplicated: edit them in Featured Programs.',
    fields: [
      t('moreHeading', '"More workshops" heading'), ta('moreSubtitle', '"More workshops" subtitle'),
      num('moreCount', 'Cards in "More workshops"'),
      sel('featuredMode', 'Featured workshops source', ['auto (by popularity / order)', 'manual (pick below)']),
      { key: 'featuredSlugs', label: 'Manual featured workshops', type: 'programs' },
      { key: 'hiddenSlugs', label: 'Hide these programs from the public page', type: 'programs' },
      tags('categoryOrder', 'Category order (listing pills)'), tog('showUpcoming', 'Show Upcoming live workshops', { default: true }), tog('showOnDemand', 'Show On-demand library', { default: true }),
    ],
    seed: { moreHeading: 'More workshops to explore', moreSubtitle: 'Short live and on-demand workshops across AI, development, design, business and more.', moreCount: 3, featuredMode: 'auto (by popularity / order)', featuredSlugs: [], hiddenSlugs: [], categoryOrder: [], showUpcoming: true, showOnDemand: true },
  },
  {
    id: 'certificate', name: 'Certificate showcase', group: 'Other Homepage Sections', desc: 'Sample certificate preview and notes.',
    fields: [t('heading', 'Heading'), ta('description', 'Description'), img('image', 'Certificate image'), ta('note', 'Disclaimer note'), list('bullets', 'Bullets', [t('text', 'Text')], { itemLabel: 'text' })],
    seed: { heading: '', description: '', image: '', note: 'The certificate shown is a sample design. Real certificates are generated only from verified completion records.', bullets: [] },
  },
  {
    id: 'perks', name: 'Perks & benefits', group: 'Other Homepage Sections', desc: 'What you get.',
    fields: [list('items', 'Perks', [sel('icon', 'Icon', ICONS), t('title', 'Title'), ta('desc', 'Description')], { itemLabel: 'title' })],
    seed: { items: [
      { icon: 'award', title: 'Certificate of completion', desc: 'Issued from verified completion records, with a unique ID.' },
      { icon: 'video', title: 'Session recording', desc: 'Rewatch the workshop from your dashboard after you register.' },
      { icon: 'message', title: 'Live Q&A with your instructor', desc: 'Ask your own questions during live sessions.' },
      { icon: 'file', title: 'Templates and resources', desc: 'Download materials shared by the instructor.' },
      { icon: 'bell', title: 'Reminders', desc: 'Get notified before your live session starts.' },
      { icon: 'building', title: 'Group and corporate batches', desc: 'Bring your team or college to a private session.' },
    ] },
  },
  {
    id: 'faq', name: 'FAQ', group: 'Other Homepage Sections', desc: 'Questions and answers (expand / collapse).',
    fields: [list('items', 'Questions', [t('question', 'Question'), ta('answer', 'Answer'), num('order', 'Display order'), tog('visible', 'Visible', { default: true })], { itemLabel: 'question', sortKey: 'order' })],
    seed: { items: [
      ['Are there any prerequisites?', 'No formal prerequisites for beginner workshops. Each workshop lists its level and what to prepare on its page.'],
      ['When are the live sessions?', 'Live sessions run on Day 0, Day 1 and Day 2, with a bonus live showcase at the end. Exact dates are shown for each cohort.'],
      ['What if I cannot attend a live session?', 'The week is designed around a working schedule: lessons Monday to Friday are self-paced. Registered learners can watch recordings from My learning when the instructor publishes them.'],
      ['How much access do I get to instructors?', 'Instructors are active during live sessions to answer questions and give feedback. They may not reply to every individual message.'],
      ['How much time do I need each week?', 'About 8 hours on each live weekend day and 2 to 3 hours a day for self-paced lessons.'],
      ['What is included?', 'Live sessions, projects, lifetime access to project files, the learner community and a verified certificate after completion.'],
      ['Will I get a certificate?', 'Yes, after your completion is verified. Each certificate has a unique ID and QR code so anyone can check it.'],
      ['Can I get a refund?', 'If the workshop is not for you, request a refund within 24 hours of the session start. See our refund policy.'],
      ['Can my team or college join together?', 'Yes. Contact us for group pricing, private batches and custom workshops.'],
    ].map(([question, answer], i) => ({ question, answer, order: i + 1, visible: true })) },
  },
  {
    id: 'midCta', name: 'Mid-page CTA', group: 'Other Homepage Sections', desc: 'Call-to-action band between sections.',
    fields: [t('heading', 'Heading'), t('text', 'Supporting text'), t('buttonText', 'Button text'), t('link', 'Button link (empty = registration)')],
    seed: { heading: 'Ready to build your first full-stack project?', text: 'Limited seats in every cohort.', buttonText: 'Reserve my seat', link: '' },
  },
  {
    id: 'finalCta', name: 'Final CTA', group: 'Other Homepage Sections', desc: 'Closing banner with registration / explore / contact.',
    fields: [t('heading', 'Heading'), ta('text', 'Text'), img('image', 'Background image'), t('primaryText', 'Explore button text'), t('secondaryText', 'Contact button text'), t('email', 'Contact email')],
    seed: { heading: 'Your next skill is one workshop away', text: 'Pick a session, register in about a minute and start building.', image: '', primaryText: 'Explore workshops', secondaryText: 'Ask a question', email: '' },
  },
  {
    id: 'sticky', name: 'Sticky reserve bar', group: 'Other Homepage Sections', desc: 'Bottom bar with price and register button.',
    fields: [num('price', 'Offer price (INR)'), num('original', 'Original price (INR)'), t('buttonText', 'Button text')],
    seed: { price: 199, original: 9999, buttonText: 'Register Now' },
  },
];

export const SECTION_IDS = SECTIONS.map((s) => s.id);
export const GROUPS = [...new Set(SECTIONS.map((s) => s.group))];
export const getSection = (id) => SECTIONS.find((s) => s.id === id);

export const SEO_FIELDS = [
  t('title', 'Page title'), ta('description', 'Meta description'), t('ogTitle', 'Open Graph title'), ta('ogDescription', 'Open Graph description'),
  img('ogImage', 'Social sharing image'), url('canonical', 'Canonical URL'), tags('keywords', 'Keywords'),
  sel('structuredData', 'Structured data', ['Course / Event (auto per workshop)', 'Disabled']),
];

/** Naya content tree: sab section enabled, default order, seed data. */
export const seedContent = () => ({
  order: [...SECTION_IDS],
  sections: Object.fromEntries(SECTIONS.map((s) => [s.id, { enabled: true, data: JSON.parse(JSON.stringify(s.seed)) }])),
  seo: { title: 'Workshops | ILM ORA', description: '', ogTitle: '', ogDescription: '', ogImage: '', canonical: '', keywords: [], structuredData: 'Course / Event (auto per workshop)' },
});

export const defaultItem = (fields) => Object.fromEntries(fields.map((f) => [f.key, f.type === 'toggle' ? Boolean(f.default) : f.type === 'list' || f.type === 'tags' || f.type === 'programs' ? [] : f.type === 'number' ? 0 : '']));
