"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
    const pathname = usePathname();
    const { user } = useAuth();

    const isActive = (path) => pathname === path ? 'active' : '';
    const isBlogActive = pathname?.startsWith('/blog');

    return (
        <nav className="navbar">
            <div className="nav-inner">
                <Link href="/" className="nav-logo" aria-label="pgSentry Home">
                    <Image src="/pgsentry-logo.png" alt="" width={120} height={40} className="logo-img" style={{ objectFit: 'contain' }} />
                </Link>

                <div className="nav-links">
                    <Link href="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link href="/blog" className={`nav-link ${isBlogActive ? 'active' : ''}`}>Blog</Link>
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
                    text-decoration: none;
                    height: 40px;
                }
                .logo-img {
                    height: 40px;
                    width: auto;
                    max-width: 140px;
                    object-fit: contain;
                    border-radius: 6px;
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
