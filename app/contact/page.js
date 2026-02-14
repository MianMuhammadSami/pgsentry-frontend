import ContactClient from './ContactClient';

export const metadata = {
    title: 'Contact pgSentry - PostgreSQL Monitoring & Database Support',
    description: 'Get in touch with pgSentry for PostgreSQL monitoring questions, custom setups, PGSQL performance consulting, or database health check support.',
    keywords: ['PostgreSQL support', 'PGSQL consulting', 'database monitoring help', 'Postgres questions', 'pgSentry contact'],
    openGraph: {
        title: 'Contact pgSentry | PostgreSQL Monitoring Support',
        description: 'Questions about PostgreSQL monitoring or need custom database setup support? Contact us.',
        url: 'https://pgsentry.com/contact',
        type: 'website',
    },
    alternates: { canonical: 'https://pgsentry.com/contact' },
};

export default function ContactPage() {
    return <ContactClient />;
}
