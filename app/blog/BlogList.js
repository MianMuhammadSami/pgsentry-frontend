'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Define categories based on the blog posts
const CATEGORIES = {
  all: { label: 'All Posts', icon: '📚' },
  beginner: { label: 'Beginner Guides', icon: '🎓' },
  performance: { label: 'Performance & Optimization', icon: '⚡' },
  advanced: { label: 'Advanced Topics', icon: '🚀' },
  operations: { label: 'Operations & Security', icon: '🔒' },
};

// Categorize posts based on their content
function categorizePost(post) {
  const title = post.title.toLowerCase();
  const keywords = post.keywords.map(k => k.toLowerCase());
  const slug = post.slug.toLowerCase();

  // Beginner guides
  if (
    title.includes('beginner') ||
    title.includes('installation') ||
    title.includes('essential') ||
    title.includes('tools') ||
    slug.includes('beginner') ||
    slug.includes('installation') ||
    slug.includes('tools')
  ) {
    return 'beginner';
  }

  // Performance & Optimization
  if (
    title.includes('performance') ||
    title.includes('optimization') ||
    title.includes('indexing') ||
    title.includes('explain') ||
    title.includes('slow queries') ||
    title.includes('vacuum') ||
    title.includes('bloat') ||
    slug.includes('performance') ||
    slug.includes('optimization') ||
    slug.includes('indexing') ||
    slug.includes('vacuum') ||
    slug.includes('bloat')
  ) {
    return 'performance';
  }

  // Operations & Security
  if (
    title.includes('security') ||
    title.includes('backup') ||
    title.includes('replication') ||
    title.includes('high availability') ||
    title.includes('connection pooling') ||
    slug.includes('security') ||
    slug.includes('backup') ||
    slug.includes('replication') ||
    slug.includes('pooling')
  ) {
    return 'operations';
  }

  // Advanced topics (window functions, CTEs, full-text search, JSON, etc.)
  return 'advanced';
}

export default function BlogList({ posts }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => categorizePost(post) === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.keywords.some(k => k.toLowerCase().includes(query))
      );
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [posts, searchQuery, selectedCategory]);

  // Count posts per category
  const categoryCounts = useMemo(() => {
    const counts = { all: posts.length };
    Object.keys(CATEGORIES).forEach(cat => {
      if (cat !== 'all') {
        counts[cat] = posts.filter(post => categorizePost(post) === cat).length;
      }
    });
    return counts;
  }, [posts]);

  return (
    <>
      {/* Search and Filter Section */}
      <div className="blog-filters">
        <div className="blog-search-wrapper">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="blog-search-input"
          />
          <span className="blog-search-icon">🔍</span>
        </div>

        <div className="blog-categories">
          {Object.entries(CATEGORIES).map(([key, { label, icon }]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`blog-category-btn ${selectedCategory === key ? 'active' : ''}`}
            >
              <span className="category-icon">{icon}</span>
              <span className="category-label">{label}</span>
              <span className="category-count">{categoryCounts[key]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results info */}
      <div className="blog-results-info">
        {searchQuery.trim() && (
          <p>
            Found <strong>{filteredPosts.length}</strong> article{filteredPosts.length !== 1 ? 's' : ''}
            {searchQuery.trim() && ` for "${searchQuery}"`}
          </p>
        )}
        {!searchQuery.trim() && selectedCategory !== 'all' && (
          <p>
            Showing <strong>{filteredPosts.length}</strong> article{filteredPosts.length !== 1 ? 's' : ''}
            in <strong>{CATEGORIES[selectedCategory].label}</strong>
          </p>
        )}
      </div>

      {/* Blog posts list */}
      <div className="blog-list">
        {filteredPosts.length === 0 ? (
          <div className="blog-no-results">
            <p>No articles found matching your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="blog-reset-btn"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const category = categorizePost(post);
            return (
              <article key={post.slug} className="blog-card">
                <div className="blog-card-header">
                  <time dateTime={post.date} className="blog-date">
                    {formatDate(post.date)}
                  </time>
                  <span className={`blog-category-tag ${category}`}>
                    {CATEGORIES[category].icon} {CATEGORIES[category].label}
                  </span>
                </div>
                <h2 className="blog-title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="blog-desc">{post.description}</p>
                <div className="blog-card-footer">
                  <Link href={`/blog/${post.slug}`} className="blog-link">
                    Read more →
                  </Link>
                  <div className="blog-keywords">
                    {post.keywords.slice(0, 3).map((keyword, i) => (
                      <span key={i} className="blog-keyword">{keyword}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </>
  );
}
