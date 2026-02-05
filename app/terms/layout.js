export const metadata = {
  title: 'Terms of Service',
  description: 'pgSentry Terms of Service. Terms and conditions for using our PostgreSQL health monitoring and micro-DBA service.',
  openGraph: {
    title: 'Terms of Service | pgSentry',
    url: 'https://pgsentry.com/terms',
    type: 'website',
  },
  alternates: { canonical: 'https://pgsentry.com/terms' },
  robots: { index: true, follow: true },
};

export default function TermsLayout({ children }) {
  return children;
}
