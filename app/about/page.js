"use client";

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function AboutPage() {
    return (
        <>
            <NavBar />
            <main className="about-main">
                <div className="about-hero">
                    <h1>About pgSentry</h1>
                    <p className="lead">Built from over a decade of hands-on data engineering experience.</p>
                </div>

                <div className="about-body">
                    <section>
                        <h2>The Story</h2>
                        <p>
                            Hi, I'm <a href="https://www.linkedin.com/in/mian-muhammad-sami/" target="_blank" rel="noopener noreferrer"><strong>Muhammad Sami</strong></a>.
                        </p>
                        <p>
                            For the past 10+ years I've been working deep in Data — managing everything from massive SQL clusters to complex NoSQL architectures. Throughout my career I noticed a recurring pattern among engineers and accidental DBAs working with PostgreSQL: <strong>visibility is the problem.</strong>
                        </p>
                        <p>
                            Postgres is incredible, but it fails silently. Bloat accumulates unnoticed until disk space runs out. Replication slots hold onto WAL files until the primary crashes. Queries degrade slowly until the application times out.
                        </p>
                        <p>
                            I built <strong>pgSentry</strong> to solve this specific problem — the tool I wished I'd had. A micro-DBA that proactively watches for these silent killers so you don't have to glue together random scripts or wait for an outage to know something is wrong.
                        </p>
                    </section>

                    <section>
                        <h2>Our Values</h2>
                        <div className="values">
                            <div className="value-card">
                                <div className="value-icon">🏗️</div>
                                <h3>Experience-Led</h3>
                                <p>Built on real-world battle scars, not theory. Every alert rule comes from an incident we've seen.</p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">🔒</div>
                                <h3>Security First</h3>
                                <p>Read-only access only. We never see your actual data rows — only aggregated metrics and stats.</p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">🎯</div>
                                <h3>Simplicity</h3>
                                <p>Complex metrics turned into simple, actionable alerts. No noise, no dashboards you'll never read.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />

            <style jsx>{`
                .about-main { max-width: 860px; margin: 0 auto; padding: 80px 24px; }
                .about-hero { text-align: center; margin-bottom: 64px; }
                .about-hero h1 { font-size: 42px; color: var(--foreground); margin-bottom: 14px; }
                .lead { font-size: 18px; color: var(--foreground-muted); line-height: 1.5; }

                .about-body section { margin-bottom: 56px; }
                .about-body h2 { font-size: 26px; color: var(--accent); margin-bottom: 20px; }
                .about-body p { font-size: 15px; color: var(--foreground-muted); line-height: 1.8; margin-bottom: 16px; }
                .about-body a { color: var(--accent); }
                .about-body strong { color: var(--foreground); }

                .values { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
                @media(max-width:700px) { .values { grid-template-columns: 1fr; } }
                .value-card {
                    background: var(--surface); border: 1px solid var(--border);
                    border-radius: var(--radius-md); padding: 28px 22px;
                    box-shadow: var(--shadow-sm);
                }
                .value-icon { font-size: 28px; margin-bottom: 14px; }
                .value-card h3 { font-size: 17px; margin-bottom: 10px; color: var(--foreground); }
                .value-card p { font-size: 14px; color: var(--foreground-muted); line-height: 1.6; margin: 0; }
            `}</style>
        </>
    );
}
