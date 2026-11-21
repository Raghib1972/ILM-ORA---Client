import Client from '../client';

export const metadata = {
  title: 'ILM ORA Law | Legal Training, Consulting, Quiz and Assessment',
  description: 'Live legal training, consulting, quizzes, mock assessments, papers and drafts.',
};

const SLUGS = ['home', 'training', 'consulting', 'recovery', 'book', 'quiz', 'assessment', 'papers', 'drafts', 'resources', 'about', 'contact', 'legal',
  'legal-drafting-masterclass', 'corporate-compliance-basics', 'judiciary-exam-prep', 'litigation-and-court-procedure', 'legal-research-certification', 'bar-exam-crash-course',
  'family-and-matrimonial', 'property-and-nri', 'criminal-and-bail', 'corporate-and-recovery', 'immigration-and-visa', 'civil-litigation',
  'how-to-read-a-court-order', 'fir-vs-complaint-what-changes', '30-day-judiciary-study-plan', '5-clauses-every-contract-needs', 'aibe-topics-that-repeat', 'bail-basics-for-new-advocates', 'how-to-send-a-legal-notice', 'cheque-bounce-the-steps-in-order', 'rent-agreement-basics-for-tenants-and-landlords', 'power-of-attorney-for-nris-what-to-check',
  'sample-practice-paper', 'cheque-bounce-notice'];

export function generateStaticParams() {
  return [{ slug: [] }, ...SLUGS.map((s) => ({ slug: [s] }))];
}

export default function Page() {
  return <Client />;
}