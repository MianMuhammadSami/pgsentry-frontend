"use client";

import React from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function TermsPage() {
  return (
    <>
      <NavBar />
      <main className="doc-page">
        <div className="doc-container">
          <h1>Terms of Service</h1>
          <p className="effective">Effective date: January 1, 2025</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using pgSentry ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>
          </section>

          <section>
            <h2>2. Eligibility</h2>
            <p>You must be at least 18 years of age to use this Service. By using the Service, you represent that you meet this requirement.</p>
          </section>

          <section>
            <h2>3. Account Responsibilities</h2>
            <ul>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You are responsible for all actions taken under your account.</li>
              <li>You must notify us immediately of any unauthorized use of your account.</li>
              <li>Each account is for a single individual or organization. Sharing accounts is not permitted.</li>
            </ul>
          </section>

          <section>
            <h2>4. Acceptable Use</h2>
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Access or monitor databases for which you do not have authorization.</li>
              <li>Attempt to reverse-engineer, hack, or compromise the Service.</li>
              <li>Store or transmit malicious code or malware.</li>
              <li>Violate any applicable laws, regulations, or third-party rights.</li>
              <li>Use the Service for any purpose that could cause harm to pgSentry or other users.</li>
            </ul>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <p>The Service and its content (including logos, text, graphics, and software) are owned by pgSentry and are protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without express written permission.</p>
          </section>

          <section>
            <h2>6. Your Data and Permissions</h2>
            <p>By connecting a database, you grant pgSentry permission to read system catalog and statistical views from that database to generate health reports. We do not access, store, or transmit your application data (table rows). You may revoke this permission at any time by deleting the connection.</p>
          </section>

          <section>
            <h2>7. Free Tier and Paid Services</h2>
            <p>pgSentry may offer both free and paid tiers. Details of paid plans, including pricing, features, and billing terms, will be provided at the time of subscription. Cancellation terms will be specified in the billing agreement.</p>
          </section>

          <section>
            <h2>8. Disclaimer of Warranties</h2>
            <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. We do not guarantee that the Service will be uninterrupted, error-free, or secure.</p>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>To the extent permitted by law, pgSentry shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of the Service.</p>
          </section>

          <section>
            <h2>10. Termination</h2>
            <p>We may terminate or suspend your account and access to the Service at any time, with or without cause, with or without notice. Upon termination, your right to use the Service will cease immediately.</p>
          </section>

          <section>
            <h2>11. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which pgSentry operates, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2>12. Changes to These Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will provide notice of significant changes. Continued use of the Service after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2>13. Contact</h2>
            <p>For questions about these Terms, please contact us at <strong>legal@pgsentry.com</strong> or via <a href="https://www.linkedin.com/in/mian-muhammad-sami/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
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
