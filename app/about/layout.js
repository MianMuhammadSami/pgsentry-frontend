export const metadata = {
  title: 'About Us',
  description: 'pgSentry is built from over a decade of hands-on data engineering experience. The micro-DBA for Postgres teams—catch replication lag, bloat, and slow queries before they become incidents.',
  keywords: ['pgSentry', 'PostgreSQL', 'about', 'database monitoring', 'micro-DBA', 'Postgres'],
  openGraph: {
    title: 'About pgSentry | PostgreSQL Monitoring',
    description: 'Built from over a decade of data engineering experience. The micro-DBA for Postgres teams.',
    url: 'https://pgsentry.com/about',
    type: 'website',
  },
  alternates: { canonical: 'https://pgsentry.com/about' },
};

export default function AboutLayout({ children }) {
  return children;
}
