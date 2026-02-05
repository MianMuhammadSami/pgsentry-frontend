"use client";

import { useRef, useEffect } from 'react';
import Script from 'next/script';

const HUBSPOT_PORTAL_ID = '48369013';
const HUBSPOT_FORM_ID = '039ead86-42c0-4713-aebb-fa53705e0aee';

export default function DashboardFeedbackPage() {
    const formContainerRef = useRef(null);
    const formCreatedRef = useRef(false);

    const tryCreateForm = () => {
        if (typeof window === 'undefined' || !window.hbspt) return;
        const el = document.getElementById('hubspot-feedback-form');
        if (!el || formCreatedRef.current || el.children.length > 0) return;
        formCreatedRef.current = true;
        window.hbspt.forms.create({
            portalId: HUBSPOT_PORTAL_ID,
            formId: HUBSPOT_FORM_ID,
            region: 'na1',
            target: '#hubspot-feedback-form',
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
            <div className="feedback-page">
                <div className="feedback-hero">
                    <h1>Feedback</h1>
                    <p className="feedback-lead">
                        We&apos;re happy to hear your thoughts and the features you&apos;d like. Send us a message and we&apos;ll get back to you.
                    </p>
                </div>

                <div className="feedback-form-wrap">
                    <div id="hubspot-feedback-form" ref={formContainerRef} />
                </div>
            </div>

            <style jsx>{`
                .feedback-page {
                    max-width: 620px;
                }
                .feedback-hero {
                    margin-bottom: 28px;
                }
                .feedback-hero h1 {
                    font-size: 24px;
                    color: var(--foreground);
                    margin-bottom: 8px;
                }
                .feedback-lead {
                    font-size: 15px;
                    color: var(--foreground-muted);
                    line-height: 1.6;
                }
                .feedback-form-wrap {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-md);
                    padding: 32px;
                    box-shadow: var(--shadow-sm);
                }
                .feedback-form-wrap :global(.hs-form) {
                    font-family: inherit;
                }
                .feedback-form-wrap :global(.hs-input),
                .feedback-form-wrap :global(input[type="text"]),
                .feedback-form-wrap :global(input[type="email"]),
                .feedback-form-wrap :global(textarea) {
                    width: 100%;
                    padding: 10px 14px;
                    border: 1.5px solid var(--border);
                    border-radius: var(--radius);
                    font-size: 14px;
                    font-family: inherit;
                }
                .feedback-form-wrap :global(.hs-button) {
                    padding: 10px 20px;
                    border-radius: var(--radius);
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    background: var(--accent);
                    color: #fff;
                    border: none;
                }
            `}</style>
        </>
    );
}
