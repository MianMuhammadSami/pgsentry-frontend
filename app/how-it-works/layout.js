export const metadata = {
  title: "How It Works - pgSentry PostgreSQL Monitoring",
  description: "Learn how pgSentry monitors your PostgreSQL databases in 3 simple steps. Connect, scan, and get actionable insights to prevent incidents.",
  keywords: [
    "PostgreSQL monitoring setup",
    "how to monitor Postgres",
    "database health check",
    "PostgreSQL monitoring guide",
    "pgSentry setup",
    "Postgres performance monitoring",
  ],
  alternates: { canonical: 'https://pgsentry.com/how-it-works' },
  openGraph: {
    title: 'How pgSentry Works - PostgreSQL Monitoring in 3 Steps',
    description: 'Connect your database, run comprehensive health scans, and get prioritized insights. See how pgSentry prevents PostgreSQL incidents.',
    url: 'https://pgsentry.com/how-it-works',
    siteName: 'pgSentry',
    type: 'website',
  },
};

export default function HowItWorksLayout({ children }) {
  return children;
}
