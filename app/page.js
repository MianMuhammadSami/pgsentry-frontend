import LandingContent from './components/LandingContent';

export const metadata = {
  title: "pgSentry - PostgreSQL Monitoring & Health Checks",
  description: "PostgreSQL monitoring for RDS, Supabase, Neon & self-hosted. Detect replication lag, bloat, slow queries before they become incidents. Free health check.",
  keywords: [
    "PostgreSQL", "Postgres", "PGSQL", "database monitoring", "Postgres health check",
    "replication lag", "slow queries", "Postgres bloat", "partitioning", "indexing",
    "DBA tool", "RDS monitoring", "Supabase monitoring", "Neon", "query optimization",
    "connection pooling", "VACUUM", "autovacuum", "EXPLAIN ANALYZE", "high availability",
    "PostgreSQL performance", "database clustering", "WAL monitoring", "index types",
  ],
  alternates: { canonical: 'https://pgsentry.com' },
  openGraph: {
    title: 'pgSentry - PostgreSQL Monitoring & Health Checks',
    description: 'Catch Postgres issues before they become incidents. Monitor replication lag, bloat, slow queries. Free health snapshot.',
    url: 'https://pgsentry.com',
    siteName: 'pgSentry',
    type: 'website',
    images: [{ url: '/pgsentry-logo.png', width: 512, height: 512, alt: 'pgSentry' }],
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
