"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
    const pathname = usePathname();
    const { user } = useAuth();

    const isActive = (path) => pathname === path ? 'active' : '';

    return (
        <nav className="navbar">
            <div className="nav-inner">
                <Link href="/" className="nav-logo">
                    <div className="logo-mark"></div>
                    <span className="logo-text">pgSentry</span>
                </Link>

                <div className="nav-links">
                    <Link href="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link href="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
                    <Link href="/request" className={`nav-link ${isActive('/request')}`}>Features</Link>
                    <Link href="/analysis" className={`nav-link ${isActive('/analysis')}`}>Free Analysis</Link>
                </div>

                <div className="nav-actions">
                    {user ? (
                        <Link href="/dashboard" className="btn primary small">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="btn secondary small">Log In</Link>
                            <Link href="/login" className="btn primary small">Get Started</Link>
                        </>
                    )}
                </div>
            </div>

            <style jsx>{`
                .navbar {
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    background: rgba(255,255,255,0.82);
                    backdrop-filter: blur(14px) saturate(1.2);
                    -webkit-backdrop-filter: blur(14px) saturate(1.2);
                    border-bottom: 1px solid var(--border);
                }
                .nav-inner {
                    max-width: 1160px;
                    margin: 0 auto;
                    padding: 14px 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    text-decoration: none;
                }
                .logo-mark {
                    width: 28px;
                    height: 28px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #3b82f6, #10b981);
                }
                .logo-text {
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--foreground);
                    letter-spacing: -0.03em;
                }
                .nav-links {
                    display: flex;
                    gap: 28px;
                }
                .nav-link {
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--foreground-muted);
                    transition: color 0.18s;
                    position: relative;
                    padding-bottom: 4px;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: var(--accent);
                    border-radius: 1px;
                    transition: width 0.22s;
                }
                .nav-link:hover { color: var(--foreground); }
                .nav-link:hover::after,
                .nav-link.active::after { width: 100%; }
                .nav-link.active { color: var(--foreground); }
                .nav-actions {
                    display: flex;
                    gap: 10px;
                }
                @media(max-width: 640px) {
                    .nav-links { display: none; }
                }
            `}</style>
        </nav>
    );
}
