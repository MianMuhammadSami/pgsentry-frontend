"use client";

import Link from 'next/link';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

export default function LoginSuccessPage() {
    return (
        <div className="success-page">
            <NavBar />
            <div className="success-bg"></div>
            <main className="success-main">
                <div className="success-container fade-in">
                    <div className="checkmark">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <circle cx="24" cy="24" r="24" fill="#d1fae5"/>
                            <path d="M14 25l7 7 13-14" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h1>You're in!</h1>
                    <p className="sub">Welcome to pgSentry. Let's get your first database connected.</p>
                    <div className="actions">
                        <Link href="/dashboard/databases" className="btn primary big">Connect a Database</Link>
                        <Link href="/dashboard" className="btn secondary big">Go to Dashboard</Link>
                    </div>
                </div>
            </main>
            <Footer />

            <style jsx>{`
                .success-page {
                    min-height: 100vh;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }
                .success-bg {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 700px 500px at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%);
                    pointer-events: none;
                }
                .success-main {
                    flex: 1;
                    position: relative;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 48px 24px;
                }
                .success-container {
                    text-align: center;
                    max-width: 480px;
                }
                .checkmark { margin-bottom: 28px; }
                h1 { font-size: 36px; color: var(--foreground); margin-bottom: 12px; }
                .sub { font-size: 17px; color: var(--foreground-muted); margin-bottom: 36px; line-height: 1.5; }
                .actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
            `}</style>
        </div>
    );
}
