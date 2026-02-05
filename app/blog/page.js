import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { BLOG_POSTS } from './data';

export const metadata = {
  title: 'Blog – PostgreSQL Tips, Partitioning, Indexing & Monitoring',
  description: 'Expert articles on PostgreSQL, PGSQL slow queries, partitioning, indexing, replication, and bloat. Learn how pgSentry helps you monitor and fix Postgres issues.',
  keywords: ['PostgreSQL blog', 'PGSQL', 'Postgres partitioning', 'indexing', 'slow queries', 'database monitoring', 'pgSentry'],
  openGraph: {
    title: 'Blog | pgSentry – PostgreSQL Monitoring & Best Practices',
    description: 'Expert articles on PostgreSQL, slow queries, partitioning, indexing, and more.',
    url: 'https://pgsentry.com/blog',
  },
  alternates: { canonical: 'https://pgsentry.com/blog' },
};

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPage() {
  const sorted = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <NavBar />
      <main className="blog-main">
        <div className="blog-hero">
          <h1>Blog</h1>
          <p className="blog-lead">
            PostgreSQL tips, partitioning, indexing, slow queries, and how pgSentry helps you catch issues before they become incidents.
          </p>
        </div>

        <div className="blog-list">
          {sorted.map((post) => (
            <article key={post.slug} className="blog-card">
              <time dateTime={post.date} className="blog-date">{formatDate(post.date)}</time>
              <h2 className="blog-title">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="blog-desc">{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="blog-link">Read more →</Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
