export const metadata = {
  title: 'Request a Feature',
  description: 'Suggest a feature for pgSentry. We’re building the micro-DBA for Postgres—tell us what monitoring, alerts, or reports you need.',
  keywords: ['pgSentry', 'feature request', 'PostgreSQL', 'database monitoring', 'feedback'],
  openGraph: {
    title: 'Request a Feature | pgSentry',
    description: 'Suggest monitoring and DBA features for pgSentry. We want to hear from Postgres teams.',
    url: 'https://pgsentry.com/request',
    type: 'website',
  },
  alternates: { canonical: 'https://pgsentry.com/request' },
};

export default function RequestLayout({ children }) {
  return children;
}
