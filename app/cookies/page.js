"use client";

import React from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function CookiesPage() {
  return (
    <>
      <NavBar />
      <main className="doc-page">
        <div className="doc-container">
          <h1>Cookie Policy</h1>
          <p className="effective">Effective date: January 1, 2025</p>

          <section>
            <h2>1. What Are Cookies?</h2>
            <p>Cookies are small text files placed on your device by a website to help the site provide a better experience. They can store information like login state, preferences, and usage data.</p>
          </section>

          <section>
            <h2>2. How We Use Cookies</h2>
            <p>pgSentry uses the following types of cookies:</p>
            <h3>Essential Cookies</h3>
            <p>These cookies are required for the Service to function. They enable features like authentication and session management. You cannot disable these cookies without breaking the Service.</p>
            <ul>
              <li><strong>pgs_user:</strong> Stored in localStorage. Contains your authenticated user profile (ID, email, display name, avatar). Required for dashboard access.</li>
            </ul>
            <h3>Functional Cookies</h3>
            <p>These cookies remember your preferences and settings to improve your experience.</p>
            <ul>
              <li>Selected database connection preference</li>
              <li>UI theme or display preferences (if implemented)</li>
            </ul>
            <h3>Analytics Cookies</h3>
            <p>We may use anonymized analytics to understand how the Service is used. We do not use third-party tracking cookies or sell your data to advertisers.</p>
          </section>

          <section>
            <h2>3. Local Storage</h2>
            <p>In addition to cookies, pgSentry uses browser localStorage to persist your login state across sessions. This data is stored entirely on your device and is not transmitted to our servers independently. You can clear it by logging out or clearing your browser data.</p>
          </section>

          <section>
            <h2>4. Third-Party Cookies</h2>
            <p>We do not currently deploy third-party tracking or advertising cookies. If this changes in the future, we will update this policy and notify you.</p>
          </section>

          <section>
            <h2>5. How to Control Cookies</h2>
            <ul>
              <li><strong>Browser settings:</strong> You can configure your browser to block or delete cookies. Note that blocking essential cookies may prevent pgSentry from working correctly.</li>
              <li><strong>Logout:</strong> Logging out of pgSentry clears your session data from localStorage.</li>
              <li><strong>Browser DevTools:</strong> You can inspect and manually delete cookies and localStorage entries using your browser's developer tools.</li>
            </ul>
          </section>

          <section>
            <h2>6. Changes to This Policy</h2>
            <p>We may update this Cookie Policy as our practices evolve. We will notify you of significant changes.</p>
          </section>

          <section>
            <h2>7. Questions?</h2>
            <p>If you have questions about our use of cookies, please contact us at <strong>privacy@pgsentry.com</strong>.</p>
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
