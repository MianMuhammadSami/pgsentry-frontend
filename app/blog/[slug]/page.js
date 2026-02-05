import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
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

  return (
    <>
      <NavBar />
      <main className="blog-main blog-post">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/blog">Blog</Link>
          <span className="sep">/</span>
          <span className="current" aria-current="page">{post.title}</span>
        </nav>

        <article>
          <header className="post-header">
            <time dateTime={post.date} className="post-date">{formatDate(post.date)}</time>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-desc">{post.description}</p>
          </header>

          <div className="post-body">
            {post.body}
          </div>

          <footer className="post-footer">
            <Link href="/blog" className="back-link">← All posts</Link>
            <Link href="/" className="cta-link">Start monitoring with pgSentry →</Link>
          </footer>
        </article>
      </main>
      <Footer />
    </>
  );
}
