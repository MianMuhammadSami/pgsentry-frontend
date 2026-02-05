"use client";

import { useRef, useEffect } from 'react';
import Script from 'next/script';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const HUBSPOT_PORTAL_ID = '48369013';
const HUBSPOT_FORM_ID = '039ead86-42c0-4713-aebb-fa53705e0aee';

export default function ContactPage() {
    const formContainerRef = useRef(null);
    const formCreatedRef = useRef(false);

    const tryCreateForm = () => {
        if (typeof window === 'undefined' || !window.hbspt) return;
        const el = document.getElementById('hubspot-contact-form');
        if (!el || formCreatedRef.current || el.children.length > 0) return;
        formCreatedRef.current = true;
        window.hbspt.forms.create({
            portalId: HUBSPOT_PORTAL_ID,
            formId: HUBSPOT_FORM_ID,
            region: 'na1',
            target: '#hubspot-contact-form',
        });
    };

    useEffect(() => {
        if (window.hbspt) {
            tryCreateForm();
        } else {
            const id = setInterval(() => {
                if (window.hbspt) {
                    clearInterval(id);
                    tryCreateForm();
                }
            }, 100);
            return () => clearInterval(id);
        }
    }, []);

    return (
        <>
            <Script
                src="https://js.hsforms.net/forms/embed/v2.js"
                strategy="afterInteractive"
                onLoad={() => {
                    setTimeout(tryCreateForm, 0);
                }}
            />
            <NavBar />
            <main className="contact-main">
                <div className="contact-hero">
                    <h1>Contact us</h1>
                    <p className="contact-lead">
                        Questions about pgSentry, PostgreSQL monitoring, or a custom setup? Send us a message and we’ll get back to you.
                    </p>
                </div>

                <div className="contact-form-wrap">
                    <div id="hubspot-contact-form" ref={formContainerRef} />
                </div>

                <div className="contact-other">
                    <p>
                        You can also reach out on{' '}
                        <a href="https://www.linkedin.com/in/mian-muhammad-sami/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.
                    </p>
                </div>
            </main>
            <Footer />

            <style jsx>{`
                .contact-main {
                    max-width: 620px;
                    margin: 0 auto;
                    padding: 48px 24px 80px;
                }
                .contact-hero {
                    text-align: center;
                    margin-bottom: 40px;
                }
                .contact-hero h1 {
                    font-size: 36px;
                    color: var(--foreground);
                    margin-bottom: 12px;
                }
                .contact-lead {
                    font-size: 17px;
                    color: var(--foreground-muted);
                    line-height: 1.6;
                }
                .contact-form-wrap {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-md);
                    padding: 32px;
                    box-shadow: var(--shadow-sm);
                    margin-bottom: 28px;
                }
                .contact-form-wrap :global(.hs-form) {
                    font-family: inherit;
                }
                .contact-form-wrap :global(.hs-input),
                .contact-form-wrap :global(input[type="text"]),
                .contact-form-wrap :global(input[type="email"]),
                .contact-form-wrap :global(textarea) {
                    width: 100%;
                    padding: 10px 14px;
                    border: 1.5px solid var(--border);
                    border-radius: var(--radius);
                    font-size: 14px;
                    font-family: inherit;
                }
                .contact-form-wrap :global(.hs-button) {
                    padding: 10px 20px;
                    border-radius: var(--radius);
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    background: var(--accent);
                    color: #fff;
                    border: none;
                }
                .contact-other {
                    text-align: center;
                    font-size: 14px;
                    color: var(--foreground-muted);
                }
                .contact-other a {
                    color: var(--accent);
                    text-decoration: none;
                }
                .contact-other a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </>
    );
}
