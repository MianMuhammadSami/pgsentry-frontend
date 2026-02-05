"use client";

import NavBar from './NavBar';
import Footer from './Footer';
import Link from 'next/link';

export default function LandingContent() {
    return (
        <>
            <NavBar />
            <main className="landing-main">
                {/* Hero with subtle gradient background */}
                <section className="hero">
                    <div className="hero-bg"></div>
                    <div className="hero-content">
                        <div className="fade-in">
                            <span className="pill-badge">
                                <span className="dot green pulse"></span> New: Real-time Postgres Health Checks
                            </span>
                        </div>

                        <h1 className="fade-in delay-100">
                            Sleep soundly while<br />
                            <span className="text-gradient">pgSentry watches your DB.</span>
                        </h1>

                        <p className="hero-sub fade-in delay-200">
                            The micro-DBA for modern engineering teams. Detect replication lag, bloat, and slow queries — before they become incidents.
                        </p>

                        <div className="hero-actions fade-in delay-300">
                            <Link href="/login" className="btn primary big">Start Monitoring</Link>
                            <Link href="/analysis" className="btn secondary big">Get Free Analysis</Link>
                        </div>

                        {/* Live status demo card */}
                        <div className="status-card fade-in delay-300">
                            <div className="status-row">
                                <span className="dot green pulse"></span>
                                <span className="status-label">Production DB</span>
                                <span className="status-sep">|</span>
                                <span className="status-metric">Lag: <strong>0 ms</strong></span>
                                <span className="status-sep">|</span>
                                <span className="status-metric">Cache: <strong>97.4%</strong></span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Compatible providers */}
                <section className="social-proof">
                    <p className="label">WORKS WITH</p>
                    <div className="logos">
                        <span>AWS RDS</span>
                        <span>Supabase</span>
                        <span>Neon</span>
                        <span>Google Cloud SQL</span>
                        <span>Self-Hosted</span>
                    </div>
                </section>

                {/* How it works – 3 steps */}
                <section className="how-it-works container">
                    <div className="section-header">
                        <h2>How it works</h2>
                        <p>Three simple steps to full visibility.</p>
                    </div>
                    <div className="steps-grid">
                        <div className="step-card fade-in">
                            <div className="step-num">01</div>
                            <h3>Connect</h3>
                            <p>Add your Postgres connection with a read-only user. We support RDS, Supabase, Neon, Cloud SQL, and self-hosted.</p>
                        </div>
                        <div className="step-card fade-in delay-100">
                            <div className="step-num">02</div>
                            <h3>Scan</h3>
                            <p>pgSentry runs a comprehensive health check — bloat, replication lag, slow queries, index usage, and more.</p>
                        </div>
                        <div className="step-card fade-in delay-200">
                            <div className="step-num">03</div>
                            <h3>Act</h3>
                            <p>Get a clear dashboard with smart recommendations. No noise — just actionable insights ranked by impact.</p>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="features container">
                    <div className="section-header">
                        <h2>What we catch</h2>
                        <p>The silent killers that take down Postgres in production.</p>
                    </div>
                    <div className="feature-grid">
                        <div className="feature-card fade-in">
                            <div className="icon-wrap"><span className="icon">🔍</span></div>
                            <h3>Silent Risk Buildup</h3>
                            <p>Replication lag, WAL growth, and inactive replication slots often go unnoticed until it's too late. We catch them early.</p>
                        </div>
                        <div className="feature-card fade-in delay-100">
                            <div className="icon-wrap"><span className="icon">⚡</span></div>
                            <h3>Performance Regressions</h3>
                            <p>Detect sudden spikes in query time or blocking locks before your users notice latency.</p>
                        </div>
                        <div className="feature-card fade-in delay-200">
                            <div className="icon-wrap"><span className="icon">🛡️</span></div>
                            <h3>Maintenance Blind Spots</h3>
                            <p>Track bloat, vacuum efficiency, unused indexes, and connection saturation — automatically.</p>
                        </div>
                        <div className="feature-card fade-in delay-100">
                            <div className="icon-wrap"><span className="icon">📊</span></div>
                            <h3>Smart Partitioning Advice</h3>
                            <p>We inspect your largest tables and suggest range or time-based partitioning when it will actually help.</p>
                        </div>
                        <div className="feature-card fade-in delay-200">
                            <div className="icon-wrap"><span className="icon">🎯</span></div>
                            <h3>Index Optimization</h3>
                            <p>Unused indexes waste write performance. We flag them and tell you exactly which ones to drop or keep.</p>
                        </div>
                        <div className="feature-card fade-in delay-300">
                            <div className="icon-wrap"><span className="icon">📬</span></div>
                            <h3>Actionable Alerts</h3>
                            <p>Severity-ranked alerts with copy-paste SQL fixes. No generic warnings — just what matters for your DB.</p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="cta-section">
                    <div className="cta-card">
                        <h2>Ready to stabilize your database?</h2>
                        <p>Join teams using pgSentry to prevent Postgres incidents before they happen.</p>
                        <Link href="/login" className="btn primary big">Connect Your Database</Link>
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                .landing-main { min-height: 100vh; }

                /* ── Hero ── */
                .hero {
                    position: relative;
                    padding: 100px 24px 80px;
                    text-align: center;
                    overflow: hidden;
                }
                .hero-bg {
                    position: absolute;
                    inset: -60px -40px;
                    background:
                        radial-gradient(ellipse 700px 500px at 30% 20%, rgba(59,130,246,0.08) 0%, transparent 70%),
                        radial-gradient(ellipse 600px 400px at 75% 60%, rgba(16,185,129,0.07) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 0;
                }
                .hero-content {
                    position: relative;
                    z-index: 1;
                    max-width: 820px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .pill-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 16px;
                    background: rgba(59,130,246,0.08);
                    border: 1px solid rgba(59,130,246,0.2);
                    border-radius: 99px;
                    font-size: 13px;
                    color: var(--accent-dark);
                    font-weight: 500;
                    margin-bottom: 28px;
                }
                h1 {
                    font-size: 58px;
                    line-height: 1.08;
                    color: var(--foreground);
                    margin-bottom: 22px;
                }
                .hero-sub {
                    font-size: 19px;
                    color: var(--foreground-muted);
                    line-height: 1.6;
                    max-width: 580px;
                    margin-bottom: 40px;
                }
                .hero-actions {
                    display: flex;
                    gap: 14px;
                    margin-bottom: 48px;
                }

                /* Status demo card – glass style */
                .status-card {
                    background: rgba(255,255,255,0.82);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    border: 1px solid rgba(255,255,255,0.7);
                    border-radius: 12px;
                    padding: 12px 24px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.07);
                }
                .status-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 14px;
                    color: var(--foreground-muted);
                }
                .status-label { font-weight: 600; color: var(--foreground); }
                .status-sep { color: var(--border); }
                .status-metric strong { color: var(--foreground); }

                /* ── Social Proof ── */
                .social-proof {
                    text-align: center;
                    padding: 40px 24px;
                    border-top: 1px solid var(--border);
                    border-bottom: 1px solid var(--border);
                    background: var(--surface);
                }
                .social-proof .label {
                    font-size: 11px;
                    letter-spacing: 0.12em;
                    color: var(--foreground-subtle);
                    margin-bottom: 16px;
                    font-weight: 600;
                }
                .logos {
                    display: flex;
                    justify-content: center;
                    gap: 44px;
                    flex-wrap: wrap;
                    color: var(--foreground-subtle);
                    font-weight: 600;
                    font-size: 16px;
                }

                /* ── Section Header ── */
                .section-header {
                    text-align: center;
                    margin-bottom: 52px;
                }
                .section-header h2 { font-size: 36px; margin-bottom: 10px; color: var(--foreground); }
                .section-header p { font-size: 17px; color: var(--foreground-muted); }

                /* ── How it works ── */
                .how-it-works { padding: 96px 24px; }
                .steps-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 28px;
                }
                @media(max-width: 768px) { .steps-grid { grid-template-columns: 1fr; } }
                .step-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    padding: 36px 28px;
                    box-shadow: var(--shadow-sm);
                    transition: box-shadow 0.2s, transform 0.2s;
                }
                .step-card:hover { box-shadow: var(--shadow); transform: translateY(-3px); }
                .step-num {
                    font-size: 13px;
                    font-weight: 700;
                    color: var(--accent);
                    background: var(--accent-light);
                    display: inline-block;
                    padding: 3px 10px;
                    border-radius: 6px;
                    margin-bottom: 16px;
                }
                .step-card h3 { font-size: 19px; margin-bottom: 10px; color: var(--foreground); }
                .step-card p { font-size: 14px; color: var(--foreground-muted); line-height: 1.6; }

                /* ── Features ── */
                .features { padding: 96px 24px; background: var(--background); }
                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                }
                @media(max-width: 900px) { .feature-grid { grid-template-columns: repeat(2, 1fr); } }
                @media(max-width: 560px) { .feature-grid { grid-template-columns: 1fr; } }
                .feature-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    padding: 32px 26px;
                    box-shadow: var(--shadow-sm);
                    transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
                }
                .feature-card:hover {
                    border-color: var(--accent-light);
                    box-shadow: var(--shadow);
                    transform: translateY(-2px);
                }
                .icon-wrap { margin-bottom: 18px; }
                .icon { font-size: 26px; }
                .feature-card h3 { font-size: 17px; margin-bottom: 10px; color: var(--foreground); }
                .feature-card p { font-size: 14px; color: var(--foreground-muted); line-height: 1.6; }

                /* ── CTA ── */
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
                .cta-card p { font-size: 16px; color: var(--foreground-muted); margin-bottom: 28px; }

                /* ── Responsive ── */
                @media(max-width: 680px) {
                    h1 { font-size: 38px; }
                    .hero { padding-top: 72px; }
                    .hero-actions { flex-direction: column; align-items: center; }
                }
            `}</style>
        </>
    );
}
