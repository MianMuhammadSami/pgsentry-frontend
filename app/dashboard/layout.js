"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
    const pathname = usePathname();
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

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
        { href: '/dashboard/databases', label: 'Databases', icon: Icons.databases },
        { href: '/dashboard/query-optimizer', label: 'Query Optimizer', icon: Icons.optimizer },
        { href: '/dashboard/settings', label: 'Settings', icon: Icons.settings },
    ];

    return (
        <div className="dashboard-shell">
            <aside className="sidebar">
                <Link href="/" className="sidebar-brand" aria-label="pgSentry Home">
                    <Image src="/pgsentry-logo.png" alt="" width={132} height={36} className="sb-logo" style={{ objectFit: 'contain' }} />
                </Link>

                <nav className="nav-group" aria-label="Platform navigation">
                    <span className="nav-group-label">Platform</span>
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href} className={`nav-item ${isActive(item.href)}`}>
                            <span className="nav-item-icon">{item.icon}</span>
                            <span className="nav-item-text">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <nav className="nav-group bottom">
                    <Link href="/" className="nav-item nav-item-back">
                        <span className="nav-item-icon">{Icons.arrow}</span>
                        <span className="nav-item-text">Back to Home</span>
                    </Link>
                </nav>
            </aside>

            <main className="main-area">
                <Header env="Production" />
                <div className="content-wrap">
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
                .dashboard-shell {
                    display: flex;
                    min-height: 100vh;
                    background: var(--background);
                }

                /* ── Sidebar ── */
                .sidebar {
                    width: 260px;
                    min-width: 260px;
                    background: var(--surface);
                    border-right: 1px solid var(--border);
                    display: flex;
                    flex-direction: column;
                    padding: 24px 0;
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    overflow-y: auto;
                }
                .sidebar-brand {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 20px 32px;
                    margin-bottom: 8px;
                    border-bottom: 1px solid var(--border);
                    text-decoration: none;
                }
                .sb-logo {
                    height: 36px;
                    width: auto;
                    max-width: 132px;
                    object-fit: contain;
                    border-radius: 6px;
                }

                .nav-group {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    padding: 16px 12px;
                    margin-bottom: 0;
                }
                .nav-group-label {
                    font-size: 11px;
                    font-weight: 600;
                    color: var(--foreground-subtle);
                    letter-spacing: 0.06em;
                    padding: 0 12px 10px;
                    margin-bottom: 4px;
                }
                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 12px 14px;
                    border-radius: 10px;
                    color: var(--foreground-muted);
                    font-size: 14px;
                    font-weight: 500;
                    text-decoration: none;
                    transition: background 0.2s, color 0.2s;
                    min-width: 0;
                    line-height: 1.3;
                }
                .nav-item:hover {
                    background: var(--surface-alt, #fafafa);
                    color: var(--foreground);
                }
                .nav-item.active {
                    background: var(--accent-light);
                    color: var(--accent-dark);
                    font-weight: 600;
                }
                .nav-item-icon {
                    width: 20px;
                    height: 20px;
                    min-width: 20px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0.9;
                }
                .nav-item.active .nav-item-icon { opacity: 1; }
                .nav-item-text {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .nav-group.bottom {
                    margin-top: auto;
                    border-top: 1px solid var(--border);
                    padding-top: 16px;
                    padding-bottom: 0;
                }
                .nav-item-back {
                    color: var(--foreground-subtle);
                    font-size: 13px;
                }
                .nav-item-back:hover { color: var(--foreground); }

                /* ── Main ── */
                .main-area {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                }
                .content-wrap {
                    padding: 32px 40px 60px;
                    max-width: 1100px;
                    width: 100%;
                    margin: 0 auto;
                    flex: 1;
                }

                @media(max-width: 768px) {
                    .sidebar { display: none; }
                    .content-wrap { padding: 24px 20px; }
                }
            `}</style>
        </div>
    );
}
