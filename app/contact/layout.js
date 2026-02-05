export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the pgSentry team. Questions about PostgreSQL monitoring, custom setup, or support. We’re happy to hear your feedback and feature ideas.',
  keywords: ['contact pgSentry', 'PostgreSQL support', 'pgSentry feedback'],
  openGraph: {
    title: 'Contact Us | pgSentry',
    description: 'Get in touch. Questions about Postgres monitoring, custom setup, or support.',
    url: 'https://pgsentry.com/contact',
    type: 'website',
  },
  alternates: { canonical: 'https://pgsentry.com/contact' },
};

export default function ContactLayout({ children }) {
  return children;
}
