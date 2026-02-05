import { Inter } from "next/font/google";
import { AuthProvider } from './context/AuthContext';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "pgSentry - PostgreSQL Health Monitoring",
    template: "%s | pgSentry"
  },
  description: "Catch Postgres issues before they become incidents. Monitoring, alerts, and weekly reports for RDS, Supabase, and more.",
  keywords: ["PostgreSQL", "Postgres", "PGSQL", "database monitoring", "DBA", "pgSentry", "partitioning", "indexing", "slow queries", "query optimization"],
  metadataBase: new URL('https://pgsentry.com'),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pgsentry.com',
    siteName: 'pgSentry',
    images: [{ url: '/pgsentry-logo.png', width: 512, height: 512, alt: 'pgSentry' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pgsentry',
  },
  alternates: {
    canonical: 'https://pgsentry.com',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'pgSentry',
  url: 'https://pgsentry.com',
  logo: 'https://pgsentry.com/pgsentry-logo.png',
  description: 'PostgreSQL health monitoring and micro-DBA. Catch replication lag, bloat, and slow queries before they become incidents.',
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
