import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { BlogPostBanner, InlineCTABanner } from '../../components/PgSentryBanner';
import { BlogSidebar } from '../../components/PgSentrySidebar';
import { BLOG_POSTS } from '../data';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: 'Post not found | pgSentry' };
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords?.join(', '),
    openGraph: {
      title: `${post.title} | pgSentry Blog`,
      description: post.description,
      url: `https://pgsentry.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
    alternates: { canonical: `https://pgsentry.com/blog/${post.slug}` },
  };
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return (
      <>
        <NavBar />
        <main className="blog-main">
          <h1>Post not found</h1>
          <Link href="/blog">← Back to Blog</Link>
        </main>
        <Footer />
      </>
    );
  }

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'pgSentry', url: 'https://pgsentry.com' },
    publisher: { '@type': 'Organization', name: 'pgSentry', logo: { '@type': 'ImageObject', url: 'https://pgsentry.com/pgsentry-logo.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://pgsentry.com/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <NavBar />
      <div className="blog-container">
        <main className="blog-main blog-post">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/blog">Blog</Link>
            <span className="sep">/</span>
            <span className="current" aria-current="page">{post.title}</span>
          </nav>

          <BlogPostBanner postTitle={post.title} />

          <article>
            <header className="post-header">
              <time dateTime={post.date} className="post-date">{formatDate(post.date)}</time>
              <h1 className="post-title">{post.title}</h1>
              <p className="post-desc">{post.description}</p>
            </header>

            <div className="post-body">
              {post.body}
            </div>

            <InlineCTABanner />

            <footer className="post-footer">
              <Link href="/blog" className="back-link">← All posts</Link>
              <Link href="/request" className="cta-link">Get Free Database Analysis →</Link>
            </footer>
          </article>
        </main>

        <BlogSidebar postTitle={post.title} />
      </div>
      <Footer />
    </>
  );
}
