"use client";

import React from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <NavBar />
      <main className="doc-page">
        <div className="doc-container">
          <h1>Privacy Policy</h1>
          <p className="effective">Effective date: January 1, 2025</p>

          <section>
            <h2>1. Introduction</h2>
            <p>pgSentry ("we", "our", "the Service") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you use pgSentry. Please read this policy carefully. If you disagree with its terms, please discontinue use of the Service.</p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>Account Information</h3>
            <ul>
              <li>Email address (used for authentication via OTP and communications)</li>
              <li>Display name and avatar (auto-generated from email)</li>
            </ul>
            <h3>Database Connection Metadata</h3>
            <ul>
              <li>Host, port, database name, and provider type</li>
              <li>Username for database authentication</li>
              <li>Password / secret (encrypted at rest; see Security section)</li>
              <li>SSL/TLS mode preference</li>
            </ul>
            <h3>Aggregated Metrics (from your database)</h3>
            <ul>
              <li>Database size and table sizes</li>
              <li>Connection counts and limits</li>
              <li>Replication lag and WAL statistics</li>
              <li>Dead tuple / bloat estimates</li>
              <li>Cache hit and index hit ratios</li>
              <li>Transaction commit / rollback counts</li>
              <li>Long-running query durations and anonymized query templates</li>
              <li>Index scan statistics</li>
              <li>Lock wait counts</li>
            </ul>
            <h3>What We Do NOT Collect</h3>
            <ul>
              <li>Actual data rows stored in your tables</li>
              <li>Full query results or SELECT output</li>
              <li>Personally identifiable information of your end users</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <ul>
              <li><strong>Authentication:</strong> To verify your identity via OTP login codes.</li>
              <li><strong>Monitoring:</strong> To generate health reports, alerts, and recommendations for your PostgreSQL databases.</li>
              <li><strong>Product Improvement:</strong> Anonymized usage data may be used to improve pgSentry features.</li>
              <li><strong>Communications:</strong> To send you health alerts, weekly reports (if opted in), and important account notifications.</li>
              <li><strong>Lead Capture:</strong> If you submit a free analysis request, we store your email and setup details to send the analysis report.</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Retention</h2>
            <p>We retain your account data for the duration of your use of the Service. Health reports and metric snapshots are retained for up to 90 days. Login codes are deleted immediately after successful verification or expiry. You may request deletion of your account and all associated data at any time by contacting us.</p>
          </section>

          <section>
            <h2>5. Security</h2>
            <ul>
              <li>All data in transit is encrypted via TLS 1.2+.</li>
              <li>Database credentials (passwords) are encrypted at rest using industry-standard encryption before storage.</li>
              <li>We recommend connecting with a read-only database role to minimize the blast radius if credentials are compromised.</li>
              <li>We do not log or store raw query results — only aggregated statistics.</li>
              <li>Access to your connection data is scoped to your authenticated session only.</li>
            </ul>
          </section>

          <section>
            <h2>6. Third-Party Services</h2>
            <p>We may use the following third-party services:</p>
            <ul>
              <li><strong>SendGrid / Resend:</strong> For sending OTP login codes and notification emails. See their respective privacy policies.</li>
              <li><strong>Supabase:</strong> As our application database provider in development. Production may use a different provider.</li>
              <li><strong>ui-avatars.com:</strong> For generating user avatar images based on email addresses.</li>
            </ul>
          </section>

          <section>
            <h2>7. Cookies</h2>
            <p>See our <Link href="/cookies">Cookie Policy</Link> for details on how we use cookies and similar technologies.</p>
          </section>

          <section>
            <h2>8. Your Rights</h2>
            <ul>
              <li><strong>Access:</strong> You may view the data associated with your account via the Settings page.</li>
              <li><strong>Deletion:</strong> You may delete individual database connections at any time. For full account deletion, contact us.</li>
              <li><strong>Opt-out:</strong> You may opt out of non-essential communications at any time.</li>
            </ul>
          </section>

          <section>
            <h2>9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email. Continued use of the Service after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2>10. Contact Us</h2>
            <p>If you have questions about this policy, please contact us via <a href="https://www.linkedin.com/in/mian-muhammad-sami/" target="_blank" rel="noopener noreferrer">LinkedIn</a> or email <strong>privacy@pgsentry.com</strong>.</p>
          </section>

          <p className="back-link"><Link href="/">← Back to home</Link></p>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .doc-page { background: var(--background); }
        .doc-container { max-width: 780px; margin: 0 auto; padding: 80px 24px 60px; }
        h1 { font-size: 36px; color: var(--foreground); margin-bottom: 8px; }
        .effective { font-size: 13px; color: var(--foreground-subtle); margin-bottom: 40px; }
        section { margin-bottom: 36px; }
        h2 { font-size: 22px; color: var(--foreground); margin-bottom: 12px; margin-top: 8px; }
        h3 { font-size: 16px; color: var(--accent-dark); margin-bottom: 8px; margin-top: 16px; }
        p { font-size: 15px; color: var(--foreground-muted); line-height: 1.7; margin-bottom: 12px; }
        ul { padding-left: 22px; margin-bottom: 12px; }
        ul li { font-size: 15px; color: var(--foreground-muted); line-height: 1.7; margin-bottom: 4px; }
        a { color: var(--accent); }
        .back-link { margin-top: 48px; }
        .back-link a { color: var(--accent); font-size: 14px; }
      `}</style>
    </>
  );
}
