"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const { user, loading } = useAuth();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    if (loading || !user) {
        return <div className="loading-screen">Loading…</div>;
    }

    const isActive = (path) => {
        if (path === '/dashboard') return pathname === '/dashboard' ? 'active' : '';
        return pathname?.startsWith(path) ? 'active' : '';
    };

    const Icons = {
        dashboard: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
        ),
        databases: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M3 5v14a9 3 0 0 0 18 0V5"/>
                <path d="M3 12a9 3 0 0 0 18 0"/>
            </svg>
        ),
        settings: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
        ),
        optimizer: (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <polyline points="8 11 10 13 16 7"/>
            </svg>
        ),
        arrow: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
            </svg>
        ),
    };

    const navItems = [
        { href: '/dashboard', label: 'Dashboard', icon: Icons.dashboard },
        { href: '/dashboard/query-optimizer', label: 'Query Optimizer', icon: Icons.optimizer },
        { href: '/dashboard/databases', label: 'Databases', icon: Icons.databases },
        { href: '/dashboard/settings', label: 'Settings', icon: Icons.settings },
    ];

    return (
        <div className="dashboard-shell">
            {/* Mobile menu button — visible only on small screens */}
            <button
                type="button"
                className="dashboard-mobile-menu-btn"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
            >
                <span className="dashboard-mobile-menu-icon" />
                <span className="dashboard-mobile-menu-icon" />
                <span className="dashboard-mobile-menu-icon" />
            </button>

            {/* Overlay when sidebar is open on mobile */}
            {mobileMenuOpen && (
                <div
                    className="dashboard-sidebar-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                    onKeyDown={(e) => e.key === 'Escape' && setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
            )}

            <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'dashboard-sidebar-open' : ''}`}>
                <button
                    type="button"
                    className="dashboard-sidebar-close"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                >
                    ×
                </button>
                <Link href="/" className="dashboard-sidebar-brand" aria-label="pgSentry Home">
                    <Image src="/pgsentry-logo.png" alt="" width={132} height={36} className="logo-transparent" style={{ objectFit: 'contain' }} />
                </Link>

                <nav className="dashboard-nav-group" aria-label="Platform navigation">
                    <span className="dashboard-nav-group-label">Platform</span>
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href} className={`dashboard-nav-item ${isActive(item.href)}`} onClick={() => setMobileMenuOpen(false)}>
                            <span className="dashboard-nav-item-icon">{item.icon}</span>
                            <span className="dashboard-nav-item-text">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <nav className="dashboard-nav-group dashboard-nav-group-bottom">
                    <Link href="/" className="dashboard-nav-item dashboard-nav-item-back" onClick={() => setMobileMenuOpen(false)}>
                        <span className="dashboard-nav-item-icon">{Icons.arrow}</span>
                        <span className="dashboard-nav-item-text">Back to Home</span>
                    </Link>
                </nav>
            </aside>

            <main className="dashboard-main">
                <Header env="Production" />
                <div className="dashboard-beta-notice">
                    <span className="dashboard-beta-notice-text">
                        <strong>Beta release.</strong> We&apos;re happy to hear your thoughts and the features you&apos;d like — <Link href="/contact" className="dashboard-beta-notice-link">contact us</Link>.
                    </span>
                </div>
                <div className="dashboard-content">
                    {children}
                </div>
            </main>

            <style jsx>{`
                .loading-screen {
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--foreground-muted);
                    font-size: 15px;
                }
                .dashboard-main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                }
                .dashboard-beta-notice {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    padding: 12px 40px;
                    background: var(--accent-light);
                    border-bottom: 1px solid rgba(37, 99, 235, 0.2);
                    font-size: 14px;
                    color: var(--accent-dark);
                }
                .dashboard-beta-notice-text {
                    flex: 1;
                    min-width: 0;
                }
                .dashboard-beta-notice-link {
                    color: var(--accent-dark);
                    font-weight: 600;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                }
                .dashboard-beta-notice-link:hover {
                    opacity: 0.9;
                }
                .dashboard-content {
                    padding: 32px 40px 60px;
                    max-width: 1100px;
                    width: 100%;
                    margin: 0 auto;
                    flex: 1;
                }
                .dashboard-mobile-menu-btn {
                    display: none;
                    position: fixed;
                    top: 18px;
                    left: 16px;
                    z-index: 101;
                    width: 44px;
                    height: 44px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 5px;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    cursor: pointer;
                    box-shadow: var(--shadow-sm);
                }
                .dashboard-mobile-menu-btn:hover { background: #f9fafb; }
                .dashboard-mobile-menu-icon {
                    display: block;
                    width: 18px;
                    height: 2px;
                    background: var(--foreground);
                    border-radius: 1px;
                }
                .dashboard-sidebar-close {
                    display: none;
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    width: 36px;
                    height: 36px;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    line-height: 1;
                    color: var(--foreground-muted);
                    background: none;
                    border: none;
                    cursor: pointer;
                    border-radius: var(--radius);
                }
                .dashboard-sidebar-close:hover { background: #f3f4f6; color: var(--foreground); }
                @media (max-width: 768px) {
                    .dashboard-mobile-menu-btn { display: flex; }
                    .dashboard-main :global(.app-header) {
                        padding-left: 68px;
                    }
                    .dashboard-beta-notice { padding: 12px 20px; }
                    .dashboard-content { padding: 24px 20px; padding-top: 56px; }
                }
            `}</style>
        </div>
    );
}
