export const metadata = {
  title: 'Free Postgres Health Analysis',
  description: 'Get a free PostgreSQL health snapshot. Check replication lag, bloat, slow queries, and index usage. No signup required—enter your email and we’ll send your analysis.',
  keywords: ['free Postgres analysis', 'PostgreSQL health check', 'database health', 'pgSentry', 'PGSQL', 'replication lag', 'slow queries'],
  openGraph: {
    title: 'Free PostgreSQL Health Analysis | pgSentry',
    description: 'Get a free Postgres health snapshot. Replication lag, bloat, slow queries—we’ll send your analysis.',
    url: 'https://pgsentry.com/analysis',
    type: 'website',
  },
  alternates: { canonical: 'https://pgsentry.com/analysis' },
};

export default function AnalysisLayout({ children }) {
  return children;
}
