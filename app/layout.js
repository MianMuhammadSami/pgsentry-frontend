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
  keywords: ["PostgreSQL", "Database Monitoring", "DBA", "pgSentry"],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pgsentry.com',
    siteName: 'pgSentry',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
