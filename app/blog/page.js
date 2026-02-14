import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import BlogList from './BlogList';
import { BlogListBanner } from '../components/PgSentryBanner';
import { BlogSidebar } from '../components/PgSentrySidebar';
import { BLOG_POSTS } from './data';

export const metadata = {
  title: 'Blog – PostgreSQL Tips, Partitioning, Indexing & Monitoring',
  description: 'Expert articles on PostgreSQL, PGSQL slow queries, partitioning, indexing, replication, and bloat. Learn how pgSentry helps you monitor and fix Postgres issues.',
  keywords: ['PostgreSQL blog', 'PGSQL', 'Postgres partitioning', 'indexing', 'slow queries', 'database monitoring', 'pgSentry', 'replication lag', 'Postgres bloat'],
  openGraph: {
    title: 'Blog | pgSentry – PostgreSQL Monitoring & Best Practices',
    description: 'Expert articles on PostgreSQL, slow queries, partitioning, indexing, and more.',
    url: 'https://pgsentry.com/blog',
  },
  alternates: { canonical: 'https://pgsentry.com/blog' },
};

export default function BlogPage() {
  return (
    <>
      <NavBar />
      <div className="blog-container">
        <main className="blog-main">
          <div className="blog-hero">
            <h1>PostgreSQL Blog</h1>
            <p className="blog-lead">
              Expert guides on PostgreSQL: from beginner installation to advanced optimization.
              Learn indexing, performance tuning, security, and how pgSentry helps you monitor your database.
            </p>
          </div>

          <BlogListBanner />

          <BlogList posts={BLOG_POSTS} />
        </main>

        <BlogSidebar />
      </div>
      <Footer />
    </>
  );
}
