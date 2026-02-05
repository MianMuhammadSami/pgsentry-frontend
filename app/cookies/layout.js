export const metadata = {
  title: 'Cookie Policy',
  description: 'pgSentry Cookie Policy. How we use cookies and local storage for authentication and the monitoring service.',
  openGraph: {
    title: 'Cookie Policy | pgSentry',
    url: 'https://pgsentry.com/cookies',
    type: 'website',
  },
  alternates: { canonical: 'https://pgsentry.com/cookies' },
  robots: { index: true, follow: true },
};

export default function CookiesLayout({ children }) {
  return children;
}
