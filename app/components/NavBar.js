"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
    const pathname = usePathname();
    const { user } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path) => pathname === path ? 'active' : '';
    const isBlogActive = pathname?.startsWith('/blog');

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (mobileOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/request', label: 'Features' },
        { href: '/analysis', label: 'Free Analysis' },
        { href: '/blog', label: 'Blog', active: isBlogActive },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="navbar">
            <div className="nav-inner">
                <Link href="/" className="nav-logo" aria-label="pgSentry Home">
                    <Image src="/pgsentry-logo.png" alt="" width={120} height={40} className="logo-img logo-transparent" style={{ objectFit: 'contain' }} />
                </Link>

                <div className="nav-links">
                    <Link href="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link href="/request" className={`nav-link ${isActive('/request')}`}>Features</Link>
                    <Link href="/analysis" className={`nav-link ${isActive('/analysis')}`}>Free Analysis</Link>
                    <Link href="/blog" className={`nav-link ${isBlogActive ? 'active' : ''}`}>Blog</Link>
                    <Link href="/about" className={`nav-link ${isActive('/about')}`}>About</Link>
                    <Link href="/contact" className={`nav-link ${isActive('/contact')}`}>Contact</Link>
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

                <button
                    type="button"
                    className="nav-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                >
                    <span className={mobileOpen ? 'nav-toggle-icon open' : 'nav-toggle-icon'} />
                    <span className={mobileOpen ? 'nav-toggle-icon open' : 'nav-toggle-icon'} />
                    <span className={mobileOpen ? 'nav-toggle-icon open' : 'nav-toggle-icon'} />
                </button>
            </div>

            <div className={`nav-mobile ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
                <div className="nav-mobile-inner">
                    {navLinks.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-mobile-link ${item.active || isActive(item.href) ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="nav-mobile-actions">
                        {user ? (
                            <Link href="/dashboard" className="btn primary full" onClick={() => setMobileOpen(false)}>
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="btn secondary full" onClick={() => setMobileOpen(false)}>Log In</Link>
                                <Link href="/login" className="btn primary full" onClick={() => setMobileOpen(false)}>Get Started</Link>
                            </>
                        )}
                    </div>
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
                    gap: 16px;
                }
                .nav-logo {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    height: 40px;
                    flex-shrink: 0;
                    min-width: 0;
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

                .nav-toggle {
                    display: none;
                    flex-direction: column;
                    justify-content: center;
                    gap: 5px;
                    width: 44px;
                    height: 44px;
                    padding: 10px;
                    background: none;
                    border: 1px solid var(--border);
                    border-radius: var(--radius);
                    cursor: pointer;
                    transition: background 0.2s, border-color 0.2s;
                }
                .nav-toggle:hover {
                    background: #f3f4f6;
                    border-color: var(--foreground-subtle);
                }
                .nav-toggle-icon {
                    display: block;
                    height: 2px;
                    background: var(--foreground);
                    border-radius: 1px;
                    transition: transform 0.25s, opacity 0.25s;
                }
                .nav-toggle-icon.open:nth-child(1) {
                    transform: translateY(7px) rotate(45deg);
                }
                .nav-toggle-icon.open:nth-child(2) {
                    opacity: 0;
                }
                .nav-toggle-icon.open:nth-child(3) {
                    transform: translateY(-7px) rotate(-45deg);
                }

                .nav-mobile {
                    display: none;
                    position: fixed;
                    inset: 0;
                    top: 72px;
                    z-index: 99;
                    background: rgba(243, 244, 246, 0.98);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    overflow-y: auto;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.25s, visibility 0.25s;
                }
                .nav-mobile.open {
                    opacity: 1;
                    visibility: visible;
                }
                .nav-mobile-inner {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .nav-mobile-link {
                    display: block;
                    padding: 14px 16px;
                    font-size: 16px;
                    font-weight: 500;
                    color: var(--foreground);
                    text-decoration: none;
                    border-radius: var(--radius);
                    transition: background 0.2s, color 0.2s;
                }
                .nav-mobile-link:hover,
                .nav-mobile-link.active {
                    background: var(--accent-light);
                    color: var(--accent-dark);
                }
                .nav-mobile-actions {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid var(--border);
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                @media (max-width: 900px) {
                    .nav-links { display: none; }
                    .nav-actions { display: none; }
                    .nav-toggle { display: flex; }
                    .nav-mobile { display: block; }
                }
            `}</style>
        </nav>
    );
}
