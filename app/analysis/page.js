import AnalysisClient from './AnalysisClient';

export const metadata = {
    title: 'Free PostgreSQL Infrastructure Analysis - RDS, Supabase, Neon Health Check',
    description: 'Get a free PostgreSQL database health analysis for AWS RDS, Supabase, Neon, or self-hosted Postgres. Identify bloat, slow queries, indexing issues, and performance bottlenecks.',
    keywords: ['PostgreSQL analysis', 'PGSQL health check', 'database audit', 'RDS analysis', 'Supabase monitoring', 'Neon database', 'Postgres performance', 'free database check'],
    openGraph: {
        title: 'Free PostgreSQL Infrastructure Analysis | pgSentry',
        description: 'Get a tailored PostgreSQL health report for your RDS, Supabase, Neon, or self-hosted database.',
        url: 'https://pgsentry.com/analysis',
        type: 'website',
    },
    alternates: { canonical: 'https://pgsentry.com/analysis' },
};

export default function AnalysisPage() {
    return <AnalysisClient />;
}
