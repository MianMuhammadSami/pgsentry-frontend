import { Inter } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from './context/AuthContext';
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-RE1N6YWCGJ";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "pgSentry - PostgreSQL Health Monitoring & Micro-DBA",
    template: "%s | pgSentry"
  },
  description: "Catch Postgres issues before they become incidents. Monitor replication lag, bloat, slow queries, and indexing. The micro-DBA for RDS, Supabase, Neon, and self-hosted PostgreSQL.",
  keywords: [
    "PostgreSQL", "Postgres", "PGSQL", "database monitoring", "DBA", "pgSentry",
    "partitioning", "table partitioning", "indexing", "slow queries", "query optimization",
    "replication lag", "WAL", "Postgres bloat", "VACUUM", "RDS monitoring", "Supabase monitoring",
    "Postgres health check", "database performance",
  ],
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
    images: [{ url: '/pgsentry-logo.png', width: 512, height: 512, alt: 'pgSentry - PostgreSQL monitoring' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pgsentry',
  },
  alternates: {
    canonical: 'https://pgsentry.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'pgSentry',
  url: 'https://pgsentry.com',
  logo: 'https://pgsentry.com/pgsentry-logo.png',
  description: 'PostgreSQL health monitoring and micro-DBA. Catch replication lag, bloat, and slow queries before they become incidents.',
  sameAs: [],
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'pgSentry',
  url: 'https://pgsentry.com',
  description: 'PostgreSQL health monitoring. Monitor replication lag, bloat, slow queries, and indexing.',
  publisher: { '@type': 'Organization', name: 'pgSentry', url: 'https://pgsentry.com' },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://pgsentry.com/blog?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
