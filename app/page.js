import LandingContent from './components/LandingContent';

export const metadata = {
  title: "pgSentry - PostgreSQL Monitoring & Health Checks",
  description: "Detect replication lag, bloat, and slow queries. pgSentry is the micro-DBA for Postgres teams using RDS, Supabase, Neon, or self-hosted DBs.",
  keywords: ["PostgreSQL", "Database Monitoring", "Postgres Health Check", "Replication Lag", "DBA Tool", "RDS monitoring", "Supabase monitoring", "Slow query analysis", "Postgres Bloat"],
  alternates: {
    canonical: 'https://pgsentry.com',
  },
  openGraph: {
    title: 'pgSentry - PostgreSQL Monitoring & Health Checks',
    description: 'Catch Postgres issues before they become incidents. Free health snapshot and weekly reports.',
    url: 'https://pgsentry.com',
    siteName: 'pgSentry',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgSentry - PostgreSQL Monitoring & Health Checks',
    description: 'Catch Postgres issues before they become incidents.',
  },
};

export default function LandingPage() {
  return <LandingContent />;
}
