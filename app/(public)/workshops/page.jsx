import Client from './client';

export const dynamic = 'force-dynamic';

export const metadata = {
  alternates: { canonical: 'https://ilmora.texora.ai/workshops' },
  title: 'Explore Live and On-Demand Workshops | ILM ORA',
  description:
    'Browse live and on-demand workshops in AI, development, design, marketing, business and leadership. Search, filter and register in minutes.',
};

export default function Page() {
  return <Client />;
}