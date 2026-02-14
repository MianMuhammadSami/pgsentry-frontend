'use client';

import Link from 'next/link';

export function BlogListBanner() {
  return (
    <div className="pgsentry-banner banner-primary">
      <div className="banner-content">
        <div className="banner-icon">📊</div>
        <div className="banner-text">
          <h3 className="banner-title">Stop Guessing, Start Monitoring</h3>
          <p className="banner-description">
            Reading about PostgreSQL best practices? <strong>pgSentry</strong> automatically monitors your database
            and tells you exactly what needs fixing—slow queries, missing indexes, bloat, connection issues, and more.
          </p>
        </div>
        <div className="banner-actions">
          <Link href="/request" className="banner-btn banner-btn-primary">
            Get Free Analysis
          </Link>
          <Link href="/how-it-works" className="banner-btn banner-btn-secondary">
            See How It Works
          </Link>
        </div>
      </div>
    </div>
  );
}

export function BlogPostBanner({ postTitle }) {
  // Customize banner message based on blog post topic
  const getBannerMessage = () => {
    const title = postTitle.toLowerCase();

    if (title.includes('slow query') || title.includes('performance') || title.includes('optimization')) {
      return {
        icon: '⚡',
        title: 'Catch Slow Queries Before Your Users Do',
        description: 'pgSentry monitors query performance 24/7 and alerts you when queries start slowing down. No manual EXPLAIN ANALYZE needed.',
        cta: 'Monitor My Queries'
      };
    }

    if (title.includes('index') || title.includes('indexing')) {
      return {
        icon: '🎯',
        title: 'Find Missing Indexes Automatically',
        description: 'pgSentry analyzes your query patterns and highlights exactly which indexes you need to create for better performance.',
        cta: 'Get Index Recommendations'
      };
    }

    if (title.includes('vacuum') || title.includes('bloat')) {
      return {
        icon: '🧹',
        title: 'Track Bloat Before It Kills Performance',
        description: 'pgSentry monitors table and index bloat, tracks autovacuum activity, and alerts you when bloat is getting out of control.',
        cta: 'Monitor Bloat & VACUUM'
      };
    }

    if (title.includes('replication') || title.includes('high availability')) {
      return {
        icon: '🔄',
        title: 'Monitor Replication Lag in Real Time',
        description: 'pgSentry tracks replication lag, WAL retention, and standby health—so you know before a failover fails.',
        cta: 'Monitor Replication'
      };
    }

    if (title.includes('connection') || title.includes('pooling')) {
      return {
        icon: '🔌',
        title: 'Never Hit Connection Limits Again',
        description: 'pgSentry tracks active connections and alerts you before you hit max_connections, preventing unexpected downtime.',
        cta: 'Monitor Connections'
      };
    }

    if (title.includes('security') || title.includes('backup')) {
      return {
        icon: '🔒',
        title: 'Stay Secure & Protected',
        description: 'pgSentry monitors security metrics, tracks backup health, and helps you maintain PostgreSQL best practices in production.',
        cta: 'Secure My Database'
      };
    }

    if (title.includes('beginner') || title.includes('installation') || title.includes('tools')) {
      return {
        icon: '🎓',
        title: 'Learn PostgreSQL Faster with Real Insights',
        description: 'As a beginner, pgSentry teaches you what to watch for by monitoring your database and explaining what matters.',
        cta: 'Start Learning'
      };
    }

    // Default message for advanced topics
    return {
      icon: '📈',
      title: 'Put Your PostgreSQL Knowledge Into Practice',
      description: 'pgSentry shows you how your database performs in production—with actionable insights based on real data, not guesswork.',
      cta: 'See My Database Health'
    };
  };

  const banner = getBannerMessage();

  return (
    <div className="pgsentry-banner banner-contextual">
      <div className="banner-content">
        <div className="banner-icon">{banner.icon}</div>
        <div className="banner-text">
          <h3 className="banner-title">{banner.title}</h3>
          <p className="banner-description">{banner.description}</p>
        </div>
        <div className="banner-actions">
          <Link href="/request" className="banner-btn banner-btn-primary">
            {banner.cta}
          </Link>
          <Link href="/how-it-works" className="banner-btn banner-btn-secondary">
            Learn More
          </Link>
        </div>
      </div>
      <div className="banner-features">
        <div className="banner-feature">
          <span className="feature-icon">✓</span>
          <span>Weekly health reports</span>
        </div>
        <div className="banner-feature">
          <span className="feature-icon">✓</span>
          <span>Real-time alerts</span>
        </div>
        <div className="banner-feature">
          <span className="feature-icon">✓</span>
          <span>Actionable recommendations</span>
        </div>
        <div className="banner-feature">
          <span className="feature-icon">✓</span>
          <span>Free analysis available</span>
        </div>
      </div>
    </div>
  );
}

export function InlineCTABanner() {
  return (
    <div className="pgsentry-banner banner-inline">
      <div className="banner-content">
        <div className="banner-text">
          <p className="banner-inline-text">
            <strong>Try pgSentry free:</strong> Get a comprehensive health report of your PostgreSQL database—slow queries, missing indexes, bloat, and more.
          </p>
        </div>
        <Link href="/request" className="banner-btn banner-btn-inline">
          Request Free Analysis →
        </Link>
      </div>
    </div>
  );
}
