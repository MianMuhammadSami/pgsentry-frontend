export const metadata = {
  title: 'Privacy Policy',
  description: 'pgSentry Privacy Policy. How we collect, use, and protect your information when you use our PostgreSQL monitoring service.',
  openGraph: {
    title: 'Privacy Policy | pgSentry',
    url: 'https://pgsentry.com/privacy',
    type: 'website',
  },
  alternates: { canonical: 'https://pgsentry.com/privacy' },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }) {
  return children;
}
