import Client from './client';

export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: { canonical: 'https://ilmora.texora.ai/Ilmora-cisco' },
  title: 'Cisco Certifications | ILM ORA',
  description:
    'Browse Cisco certifications, career exams and training courses. Buy your exam voucher, book your exam and collect your certificate in one place.',
};

export default function Page() {
  return <Client />;
}