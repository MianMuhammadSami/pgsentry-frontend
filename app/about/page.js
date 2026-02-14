import AboutClient from './AboutClient';

export const metadata = {
    title: 'About pgSentry - PostgreSQL DBA Tool Built on 10+ Years Experience',
    description: 'Learn about pgSentry, built by data engineers with 10+ years of PostgreSQL experience. Monitor replication lag, bloat, slow queries, and keep your Postgres database healthy.',
    keywords: ['PostgreSQL DBA', 'PGSQL monitoring', 'database health', 'Postgres tool', 'data engineering', 'PostgreSQL experience', 'database management'],
    openGraph: {
        title: 'About pgSentry | PostgreSQL Monitoring Built by DBAs',
        description: 'Built from over a decade of hands-on PostgreSQL and data engineering experience to solve real database problems.',
        url: 'https://pgsentry.com/about',
        type: 'website',
    },
    alternates: { canonical: 'https://pgsentry.com/about' },
};

export default function AboutPage() {
    return <AboutClient />;
}
