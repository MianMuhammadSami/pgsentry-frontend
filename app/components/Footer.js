"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="col brand-col">
                        <Link href="/" className="footer-logo" aria-label="pgSentry Home">
                            <Image src="/pgsentry-logo.png" alt="" width={120} height={44} className="logo-transparent" style={{ objectFit: 'contain' }} />
                        </Link>
                        <p>The micro-DBA for modern engineering teams. Catch Postgres issues before they become incidents.</p>
                        <a href="https://www.producthunt.com/products/pgsentry?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-pgsentry" target="_blank" rel="noopener noreferrer" className="product-hunt-badge">
                            <img alt="pgSentry - PostgreSQL-only. The micro-DBA for modern engineering teams  | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1074523&theme=neutral&t=1770377509358" />
                        </a>
                        <div className="copy">&copy; {new Date().getFullYear()} pgSentry. All rights reserved.</div>
                    </div>

                    <div className="col">
                        <h4>Product</h4>
                        <Link href="/dashboard">Live Dashboard</Link>
                        <Link href="/analysis">Free Analysis</Link>
                        <Link href="/request">Request Feature</Link>
                    </div>

                    <div className="col">
                        <h4>Resources</h4>
                        <Link href="/blog">Blog</Link>
                        <Link href="/about">About Us</Link>
                        <Link href="/contact">Contact</Link>
                    </div>

                    <div className="col">
                        <h4>Legal</h4>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                        <Link href="/cookies">Cookie Policy</Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .site-footer {
                    background: var(--surface);
                    border-top: 1px solid var(--border);
                    padding: 72px 0 36px;
                }
                .footer-grid {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1fr;
                    gap: 40px;
                }
                @media(max-width: 768px) {
                    .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
                }
                @media(max-width: 480px) {
                    .footer-grid { grid-template-columns: 1fr; }
                }
                .footer-logo {
                    display: inline-block;
                    text-decoration: none;
                    margin-bottom: 14px;
                    height: 44px;
                }
                .footer-logo img {
                    height: 44px;
                    width: auto;
                    max-width: 140px;
                    object-fit: contain;
                    border-radius: 6px;
                }
                .brand-col p {
                    font-size: 14px;
                    color: var(--foreground-muted);
                    line-height: 1.6;
                    margin-bottom: 20px;
                    max-width: 260px;
                }
                .product-hunt-badge {
                    display: inline-block;
                    margin: 16px 0;
                    transition: opacity 0.2s;
                }
                .product-hunt-badge:hover {
                    opacity: 0.85;
                }
                .product-hunt-badge img {
                    display: block;
                    width: auto;
                    height: auto;
                    max-width: 100%;
                }
                .copy {
                    font-size: 13px;
                    color: var(--foreground-subtle);
                }
                h4 {
                    font-size: 13px;
                    font-weight: 600;
                    color: var(--foreground);
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    margin-bottom: 16px;
                }
                .col {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .col a {
                    font-size: 14px;
                    color: var(--foreground-muted);
                    transition: color 0.18s;
                }
                .col a:hover { color: var(--accent); }
            `}</style>
        </footer>
    );
}
