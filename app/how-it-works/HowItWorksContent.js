"use client";

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function HowItWorksContent() {
    // Structured data for SEO
    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Monitor PostgreSQL Databases with pgSentry",
            "description": "Learn how to set up PostgreSQL monitoring in 3 simple steps",
            "step": [
                {
                    "@type": "HowToStep",
                    "name": "Connect Your Database",
                    "text": "Add your Postgres connection with a read-only user. We support RDS, Supabase, Neon, Cloud SQL, and self-hosted.",
                    "position": 1
                },
                {
                    "@type": "HowToStep",
                    "name": "Comprehensive Health Scan",
                    "text": "pgSentry runs a deep analysis of your database - replication monitoring, query performance, bloat analysis, and schema insights.",
                    "position": 2
                },
                {
                    "@type": "HowToStep",
                    "name": "Act on Prioritized Insights",
                    "text": "Get a clean dashboard with actionable recommendations ranked by impact with copy-paste SQL fixes.",
                    "position": 3
                }
            ],
            "video": {
                "@type": "VideoObject",
                "name": "pgSentry Demo - PostgreSQL Monitoring Made Simple",
                "description": "Watch how easy it is to set up and start monitoring your PostgreSQL databases",
                "thumbnailUrl": "https://img.youtube.com/vi/vrg8xV3tuiM/maxresdefault.jpg",
                "uploadDate": "2026-02-15",
                "contentUrl": "https://www.youtube.com/watch?v=vrg8xV3tuiM",
                "embedUrl": "https://www.youtube.com/embed/vrg8xV3tuiM"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://pgsentry.com"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "How It Works",
                    "item": "https://pgsentry.com/how-it-works"
                }
            ]
        }
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <NavBar />
            <main className="how-it-works-page">
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-content">
                        <h1>How pgSentry Works</h1>
                        <p className="hero-subtitle">
                            Three simple steps to complete PostgreSQL visibility and proactive monitoring
                        </p>
                    </div>
                </section>

                {/* Video Demo */}
                <section className="video-section">
                    <div className="container">
                        <div className="section-header">
                            <h2>Watch pgSentry in Action</h2>
                            <p>See how easy it is to set up and start monitoring your PostgreSQL databases</p>
                        </div>
                        <div className="video-wrapper">
                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/vrg8xV3tuiM?si=wH4alN5TqbU_5mLt"
                                title="pgSentry Demo - PostgreSQL Monitoring Made Simple"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                        <div className="video-note">
                            <p>
                                This demo uses a sample database. Connect your production database to get <strong>real insights</strong> tailored to your workload.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Detailed Steps */}
                <section className="detailed-steps">
                    <div className="container">
                        <div className="step-detail">
                            <div className="step-content">
                                <div className="step-badge">Step 01</div>
                                <h2>Connect Your Database</h2>
                                <p className="lead">
                                    Start monitoring in under 2 minutes. pgSentry supports all major PostgreSQL hosting platforms.
                                </p>
                                <div className="features-list">
                                    <div className="feature-item">
                                        <span className="check">✓</span>
                                        <div>
                                            <strong>Read-only access</strong>
                                            <p>We only need SELECT permissions — no write access required</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <span className="check">✓</span>
                                        <div>
                                            <strong>Universal compatibility</strong>
                                            <p>AWS RDS, Supabase, Neon, Google Cloud SQL, Azure, or self-hosted</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <span className="check">✓</span>
                                        <div>
                                            <strong>Secure connection</strong>
                                            <p>All connections use SSL/TLS encryption</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <span className="check">✓</span>
                                        <div>
                                            <strong>Multiple databases</strong>
                                            <p>Monitor unlimited databases from a single dashboard</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="step-visual">
                                <div className="code-sample">
                                    <div className="code-header">Connection Example</div>
                                    <pre>{`-- Create read-only user
CREATE USER pgsentry WITH PASSWORD 'secure_password';

-- Grant minimal permissions
GRANT CONNECT ON DATABASE your_db TO pgsentry;
GRANT USAGE ON SCHEMA public TO pgsentry;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO pgsentry;

-- Connect in pgSentry dashboard
Host: your-db.postgres.database.azure.com
Port: 5432
Database: your_db
User: pgsentry
SSL: Required`}</pre>
                                </div>
                            </div>
                        </div>

                        <div className="step-detail reverse">
                            <div className="step-content">
                                <div className="step-badge">Step 02</div>
                                <h2>Comprehensive Health Scan</h2>
                                <p className="lead">
                                    pgSentry runs a deep analysis of your database — no agent installation required.
                                </p>
                                <div className="features-list">
                                    <div className="feature-item">
                                        <span className="check">🔍</span>
                                        <div>
                                            <strong>Replication monitoring</strong>
                                            <p>Detect lag, inactive slots, and WAL growth before they impact availability</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <span className="check">⚡</span>
                                        <div>
                                            <strong>Query performance</strong>
                                            <p>Identify slow queries, missing indexes, and sequential scans</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <span className="check">🛡️</span>
                                        <div>
                                            <strong>Bloat analysis</strong>
                                            <p>Track table and index bloat with precise VACUUM recommendations</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <span className="check">📊</span>
                                        <div>
                                            <strong>Schema insights</strong>
                                            <p>Partitioning opportunities, unused indexes, and connection pool health</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="step-visual">
                                <div className="metrics-preview">
                                    <div className="metric-card">
                                        <div className="metric-header">
                                            <span className="metric-label">Replication Lag</span>
                                            <span className="status-green">●</span>
                                        </div>
                                        <div className="metric-value">0 ms</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-header">
                                            <span className="metric-label">Cache Hit Ratio</span>
                                            <span className="status-green">●</span>
                                        </div>
                                        <div className="metric-value">97.4%</div>
                                    </div>
                                    <div className="metric-card warning">
                                        <div className="metric-header">
                                            <span className="metric-label">Bloat Detected</span>
                                            <span className="status-yellow">●</span>
                                        </div>
                                        <div className="metric-value">3 tables</div>
                                    </div>
                                    <div className="metric-card">
                                        <div className="metric-header">
                                            <span className="metric-label">Slow Queries</span>
                                            <span className="status-red">●</span>
                                        </div>
                                        <div className="metric-value">12 found</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="step-detail">
                            <div className="step-content">
                                <div className="step-badge">Step 03</div>
                                <h2>Act on Prioritized Insights</h2>
                                <p className="lead">
                                    Get a clean dashboard with actionable recommendations ranked by impact. No noise.
                                </p>
                                <div className="features-list">
                                    <div className="feature-item">
                                        <span className="check">📬</span>
                                        <div>
                                            <strong>Severity-based alerts</strong>
                                            <p>Critical, warning, and info-level insights with clear priority</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <span className="check">💻</span>
                                        <div>
                                            <strong>Copy-paste SQL fixes</strong>
                                            <p>Every recommendation includes ready-to-run SQL commands</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <span className="check">📈</span>
                                        <div>
                                            <strong>Impact estimation</strong>
                                            <p>See projected performance improvements before making changes</p>
                                        </div>
                                    </div>
                                    <div className="feature-item">
                                        <span className="check">🔔</span>
                                        <div>
                                            <strong>Smart notifications</strong>
                                            <p>Get alerted only when action is needed — no alert fatigue</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="step-visual">
                                <div className="recommendation-preview">
                                    <div className="rec-card critical">
                                        <div className="rec-header">
                                            <span className="severity">CRITICAL</span>
                                            <span className="rec-title">High Replication Lag Detected</span>
                                        </div>
                                        <p>Replica is 2.3 GB behind primary. WAL backlog growing.</p>
                                        <div className="rec-action">
                                            <button className="btn-small">View Details →</button>
                                        </div>
                                    </div>
                                    <div className="rec-card warning">
                                        <div className="rec-header">
                                            <span className="severity">WARNING</span>
                                            <span className="rec-title">Table Bloat on users</span>
                                        </div>
                                        <p>Table bloat: 34%. Run VACUUM FULL to reclaim 1.2 GB.</p>
                                        <div className="rec-action">
                                            <button className="btn-small">Copy SQL →</button>
                                        </div>
                                    </div>
                                    <div className="rec-card info">
                                        <div className="rec-header">
                                            <span className="severity">INFO</span>
                                            <span className="rec-title">Unused Index Found</span>
                                        </div>
                                        <p>Index idx_created_at has 0 scans. Consider dropping.</p>
                                        <div className="rec-action">
                                            <button className="btn-small">Learn More →</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-card">
                        <h2>Ready to start monitoring?</h2>
                        <p>Connect your PostgreSQL database and get your first health report in under 2 minutes.</p>
                        <div className="cta-buttons">
                            <Link href="/login" className="btn primary big">Start Free Monitoring</Link>
                            <Link href="/analysis" className="btn secondary big">Get Free Analysis</Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                .how-it-works-page { min-height: 100vh; }

                /* Hero */
                .hero {
                    padding: 120px 24px 80px;
                    text-align: center;
                    background: linear-gradient(180deg, var(--surface) 0%, var(--background) 100%);
                    border-bottom: 1px solid var(--border);
                }
                .hero-content { max-width: 800px; margin: 0 auto; }
                .hero h1 {
                    font-size: 48px;
                    color: var(--foreground);
                    margin-bottom: 16px;
                }
                .hero-subtitle {
                    font-size: 19px;
                    color: var(--foreground-muted);
                    line-height: 1.6;
                }

                /* Video Section */
                .video-section {
                    padding: 96px 24px;
                    background: var(--surface);
                    border-bottom: 1px solid var(--border);
                }
                .section-header {
                    text-align: center;
                    margin-bottom: 52px;
                }
                .section-header h2 { font-size: 36px; margin-bottom: 10px; color: var(--foreground); }
                .section-header p { font-size: 17px; color: var(--foreground-muted); }
                .video-wrapper {
                    max-width: 1000px;
                    margin: 0 auto;
                    position: relative;
                    height: 500px;
                    max-height: 500px;
                    overflow: hidden;
                    border-radius: var(--radius-xl);
                    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
                    border: 1px solid var(--border);
                    background: #000;
                }
                .video-wrapper iframe {
                    width: 100%;
                    height: 500px;
                    border: 0;
                    border-radius: var(--radius-xl);
                }
                .video-note {
                    max-width: 1000px;
                    margin: 32px auto 0;
                    text-align: center;
                    background: rgba(59,130,246,0.04);
                    border: 1px solid rgba(59,130,246,0.15);
                    border-radius: var(--radius-lg);
                    padding: 20px 28px;
                }
                .video-note p {
                    font-size: 15px;
                    color: var(--foreground-muted);
                    line-height: 1.6;
                    margin: 0;
                }
                .video-note strong {
                    color: var(--accent);
                    font-weight: 600;
                }

                /* Detailed Steps */
                .detailed-steps {
                    padding: 96px 24px;
                    background: var(--background);
                }
                .container { max-width: 1200px; margin: 0 auto; }
                .step-detail {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    margin-bottom: 120px;
                    align-items: center;
                }
                .step-detail.reverse {
                    direction: rtl;
                }
                .step-detail.reverse > * {
                    direction: ltr;
                }
                .step-detail:last-child { margin-bottom: 0; }
                .step-badge {
                    display: inline-block;
                    font-size: 12px;
                    font-weight: 700;
                    color: var(--accent);
                    background: var(--accent-light);
                    padding: 4px 12px;
                    border-radius: 6px;
                    margin-bottom: 20px;
                }
                .step-content h2 {
                    font-size: 32px;
                    color: var(--foreground);
                    margin-bottom: 16px;
                }
                .lead {
                    font-size: 17px;
                    color: var(--foreground-muted);
                    line-height: 1.6;
                    margin-bottom: 32px;
                }
                .features-list {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .feature-item {
                    display: flex;
                    gap: 14px;
                    align-items: flex-start;
                }
                .feature-item .check {
                    font-size: 20px;
                    color: var(--accent);
                    flex-shrink: 0;
                }
                .feature-item strong {
                    display: block;
                    font-size: 16px;
                    color: var(--foreground);
                    margin-bottom: 4px;
                }
                .feature-item p {
                    font-size: 14px;
                    color: var(--foreground-muted);
                    line-height: 1.5;
                    margin: 0;
                }

                /* Code Sample */
                .code-sample {
                    background: #1e1e1e;
                    border: 1px solid #333;
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                }
                .code-header {
                    background: #2d2d2d;
                    color: #999;
                    padding: 10px 16px;
                    font-size: 12px;
                    font-weight: 600;
                    border-bottom: 1px solid #333;
                }
                .code-sample pre {
                    margin: 0;
                    padding: 20px;
                    color: #d4d4d4;
                    font-size: 13px;
                    line-height: 1.6;
                    overflow-x: auto;
                }

                /* Metrics Preview */
                .metrics-preview {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }
                .metric-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    padding: 20px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }
                .metric-card.warning {
                    border-color: rgba(251, 191, 36, 0.3);
                    background: rgba(251, 191, 36, 0.03);
                }
                .metric-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                }
                .metric-label {
                    font-size: 13px;
                    color: var(--foreground-muted);
                    font-weight: 500;
                }
                .status-green { color: #10b981; font-size: 20px; }
                .status-yellow { color: #fbbf24; font-size: 20px; }
                .status-red { color: #ef4444; font-size: 20px; }
                .metric-value {
                    font-size: 28px;
                    font-weight: 700;
                    color: var(--foreground);
                }

                /* Recommendation Preview */
                .recommendation-preview {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .rec-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    padding: 18px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }
                .rec-card.critical {
                    border-left: 4px solid #ef4444;
                }
                .rec-card.warning {
                    border-left: 4px solid #fbbf24;
                }
                .rec-card.info {
                    border-left: 4px solid #3b82f6;
                }
                .rec-header {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    margin-bottom: 8px;
                }
                .severity {
                    font-size: 10px;
                    font-weight: 700;
                    padding: 3px 8px;
                    border-radius: 4px;
                    background: rgba(0,0,0,0.05);
                }
                .rec-card.critical .severity { color: #ef4444; background: rgba(239,68,68,0.1); }
                .rec-card.warning .severity { color: #fbbf24; background: rgba(251,191,36,0.1); }
                .rec-card.info .severity { color: #3b82f6; background: rgba(59,130,246,0.1); }
                .rec-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--foreground);
                }
                .rec-card p {
                    font-size: 13px;
                    color: var(--foreground-muted);
                    line-height: 1.5;
                    margin: 0 0 12px 0;
                }
                .btn-small {
                    background: transparent;
                    border: 1px solid var(--border);
                    color: var(--accent);
                    padding: 6px 14px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-small:hover {
                    background: var(--accent-light);
                    border-color: var(--accent);
                }

                /* CTA */
                .cta-section { padding: 100px 24px; }
                .cta-card {
                    max-width: 680px;
                    margin: 0 auto;
                    text-align: center;
                    background: linear-gradient(135deg, rgba(59,130,246,0.06), rgba(16,185,129,0.06));
                    border: 1px solid rgba(59,130,246,0.18);
                    border-radius: var(--radius-xl);
                    padding: 64px 40px;
                }
                .cta-card h2 { font-size: 32px; margin-bottom: 14px; color: var(--foreground); }
                .cta-card p { font-size: 16px; color: var(--foreground-muted); margin-bottom: 32px; }
                .cta-buttons {
                    display: flex;
                    gap: 14px;
                    justify-content: center;
                }

                /* Responsive */
                @media(max-width: 900px) {
                    .step-detail,
                    .step-detail.reverse {
                        grid-template-columns: 1fr;
                        gap: 40px;
                        direction: ltr;
                    }
                    .hero h1 { font-size: 36px; }
                    .video-wrapper { height: 400px; }
                    .video-wrapper iframe { height: 400px; }
                    .metrics-preview { grid-template-columns: 1fr; }
                }
                @media(max-width: 680px) {
                    .hero { padding-top: 80px; }
                    .cta-buttons { flex-direction: column; align-items: center; }
                    .video-wrapper { height: 300px; }
                    .video-wrapper iframe { height: 300px; }
                }
            `}</style>
        </>
    );
}
