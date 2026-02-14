'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function BlogSidebar({ postTitle }) {
  const [isVisible, setIsVisible] = useState(true); // Always visible by default

  useEffect(() => {
    // No scroll detection needed - sidebar is always visible
    setIsVisible(true);
  }, []);

  // Customize message based on blog topic
  const getSidebarContent = () => {
    if (!postTitle) {
      return {
        icon: '📊',
        title: 'Monitor Your PostgreSQL',
        features: [
          { icon: '⚡', text: 'Slow query detection' },
          { icon: '🎯', text: 'Index recommendations' },
          { icon: '📈', text: 'Performance insights' },
          { icon: '🔔', text: 'Real-time alerts' },
        ]
      };
    }

    const title = postTitle.toLowerCase();

    if (title.includes('slow query') || title.includes('performance') || title.includes('optimization')) {
      return {
        icon: '⚡',
        title: 'Track Query Performance',
        features: [
          { icon: '📊', text: 'Real-time query monitoring' },
          { icon: '⏱️', text: 'Execution time tracking' },
          { icon: '🎯', text: 'Missing index detection' },
          { icon: '📝', text: 'Weekly performance reports' },
        ]
      };
    }

    if (title.includes('index') || title.includes('indexing')) {
      return {
        icon: '🎯',
        title: 'Optimize Your Indexes',
        features: [
          { icon: '🔍', text: 'Unused index detection' },
          { icon: '💡', text: 'Index suggestions' },
          { icon: '📊', text: 'Index usage analytics' },
          { icon: '⚡', text: 'Performance impact analysis' },
        ]
      };
    }

    if (title.includes('vacuum') || title.includes('bloat')) {
      return {
        icon: '🧹',
        title: 'Monitor Bloat & VACUUM',
        features: [
          { icon: '📏', text: 'Table bloat tracking' },
          { icon: '⏰', text: 'Last vacuum timestamps' },
          { icon: '📊', text: 'Dead tuple monitoring' },
          { icon: '🔔', text: 'Bloat alerts' },
        ]
      };
    }

    if (title.includes('replication') || title.includes('high availability')) {
      return {
        icon: '🔄',
        title: 'Monitor Replication',
        features: [
          { icon: '⏱️', text: 'Replication lag tracking' },
          { icon: '📊', text: 'WAL retention monitoring' },
          { icon: '💾', text: 'Standby health checks' },
          { icon: '🔔', text: 'Failover alerts' },
        ]
      };
    }

    if (title.includes('connection') || title.includes('pooling')) {
      return {
        icon: '🔌',
        title: 'Monitor Connections',
        features: [
          { icon: '📊', text: 'Active connection tracking' },
          { icon: '⚠️', text: 'Limit breach alerts' },
          { icon: '🕐', text: 'Long-running query detection' },
          { icon: '📈', text: 'Connection pool analytics' },
        ]
      };
    }

    if (title.includes('security') || title.includes('backup')) {
      return {
        icon: '🔒',
        title: 'Secure & Protected',
        features: [
          { icon: '🛡️', text: 'Security monitoring' },
          { icon: '📝', text: 'Audit logging' },
          { icon: '🔔', text: 'Anomaly alerts' },
          { icon: '💾', text: 'Backup health checks' },
        ]
      };
    }

    if (title.includes('beginner') || title.includes('installation') || title.includes('tools')) {
      return {
        icon: '🎓',
        title: 'Learn PostgreSQL',
        features: [
          { icon: '📚', text: 'Health reports explained' },
          { icon: '💡', text: 'Best practice recommendations' },
          { icon: '📊', text: 'Visual dashboards' },
          { icon: '🎯', text: 'Guided optimization' },
        ]
      };
    }

    return {
      icon: '📈',
      title: 'Database Insights',
      features: [
        { icon: '📊', text: 'Comprehensive monitoring' },
        { icon: '🔍', text: 'Deep performance analysis' },
        { icon: '💡', text: 'Actionable recommendations' },
        { icon: '📧', text: 'Weekly health reports' },
      ]
    };
  };

  const content = getSidebarContent();

  return (
    <aside className={`blog-sidebar ${isVisible ? 'visible' : ''}`}>
      <div className="sidebar-card">
        <div className="sidebar-header">
          <div className="sidebar-icon">{content.icon}</div>
          <h3 className="sidebar-title">{content.title}</h3>
          <p className="sidebar-subtitle">with pgSentry</p>
        </div>

        <ul className="sidebar-features">
          {content.features.map((feature, index) => (
            <li key={index} className="sidebar-feature">
              <span className="feature-icon">{feature.icon}</span>
              <span className="feature-text">{feature.text}</span>
            </li>
          ))}
        </ul>

        <div className="sidebar-cta">
          <Link href="/request" className="sidebar-btn-primary">
            Get Free Analysis
          </Link>
          <Link href="/how-it-works" className="sidebar-btn-secondary">
            See How It Works
          </Link>
        </div>

        <div className="sidebar-badge">
          <div className="badge-content">
            <div className="badge-icon">✓</div>
            <div className="badge-text">
              <strong>Free to start</strong>
              <span>No credit card required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial or Stats Card */}
      <div className="sidebar-card sidebar-stats">
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Monitoring</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">1000+</div>
          <div className="stat-label">Databases Tracked</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">&lt;5min</div>
          <div className="stat-label">Setup Time</div>
        </div>
      </div>
    </aside>
  );
}
