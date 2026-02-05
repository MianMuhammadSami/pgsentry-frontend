"use client";

import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function RequestPage() {
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [category, setCategory] = useState('Monitoring & Alerts');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API}/api/submit/request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, category, description, priority })
            });
            const data = await res.json();
            if (data.success) setSubmitted(true);
            else setError(data.message || 'Something went wrong.');
        } catch {
            setError('Network error. Please try again.');
        } finally { setLoading(false); }
    };

    return (
        <>
            <NavBar />
            <main className="request-main">
                <div className="request-card">
                    <h1>Request a Feature</h1>
                    <p className="sub">Help us shape the future of pgSentry. Every request is reviewed.</p>

                    {!submitted ? (
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label>Your Email</label>
                                <input type="email" placeholder="you@company.com" required value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="field">
                                <label>Feature Category</label>
                                <select value={category} onChange={e => setCategory(e.target.value)}>
                                    <option>Monitoring & Alerts</option>
                                    <option>Dashboard</option>
                                    <option>Integrations (Slack, etc)</option>
                                    <option>Reports</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="field">
                                <label>What would you like to see?</label>
                                <textarea placeholder="Describe the feature you need…" rows="5" required value={description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="field">
                                <label>Priority</label>
                                <div className="radio-group">
                                    <label className="radio-label"><input type="radio" name="prio" value="low" checked={priority === 'low'} onChange={() => setPriority('low')} /> Nice to have</label>
                                    <label className="radio-label"><input type="radio" name="prio" value="high" checked={priority === 'high'} onChange={() => setPriority('high')} /> Critical / Dealbreaker</label>
                                </div>
                            </div>
                            {error && <div className="error-box">{error}</div>}
                            <button type="submit" className="btn primary full" disabled={loading}>{loading ? 'Submitting…' : 'Submit Request'}</button>
                        </form>
                    ) : (
                        <div className="success-msg">
                            <div className="success-icon">✓</div>
                            <h3>Thank you!</h3>
                            <p>Your request has been logged. We review every submission and will follow up if needed.</p>
                            <button className="btn secondary" onClick={() => { setSubmitted(false); setEmail(''); setDescription(''); }}>Submit another</button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />

            <style jsx>{`
                .request-main { display:flex; justify-content:center; padding:96px 24px; }
                .request-card {
                    background:var(--surface); border:1px solid var(--border);
                    border-radius:var(--radius-lg); padding:44px 40px;
                    width:100%; max-width:520px; box-shadow:var(--shadow);
                }
                h1 { font-size:28px; color:var(--foreground); margin-bottom:6px; }
                .sub { color:var(--foreground-muted); font-size:14px; margin-bottom:28px; }

                .field { margin-bottom:20px; }
                .field label { display:block; margin-bottom:6px; font-size:13px; font-weight:600; color:var(--foreground-muted); }
                .field input, .field select, .field textarea {
                    width:100%; padding:10px 14px; border:1.5px solid var(--border);
                    border-radius:var(--radius); font-size:14px; color:var(--foreground);
                    background:var(--surface); font-family:inherit;
                }
                .field select {
                    appearance:none; -webkit-appearance:none;
                    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
                    background-repeat:no-repeat; background-position:right 12px center;
                    padding-right:36px;
                }
                .field input:focus, .field select:focus, .field textarea:focus {
                    outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow);
                }
                .field textarea { resize:vertical; }
                .radio-group { display:flex; gap:24px; }
                .radio-label { display:flex; align-items:center; gap:8px; font-size:14px; color:var(--foreground-muted); cursor:pointer; font-weight:400; }
                .radio-label input { accent-color:var(--accent); }
                .error-box { background:var(--danger-bg); color:var(--danger); padding:10px 14px; border-radius:var(--radius); font-size:13px; margin-bottom:16px; }
                .btn.full { width:100%; margin-top:8px; padding:12px; font-size:15px; }

                .success-msg { text-align:center; padding:32px 0; }
                .success-icon { font-size:40px; color:var(--success); margin-bottom:12px; }
                .success-msg h3 { font-size:22px; color:var(--foreground); margin-bottom:8px; }
                .success-msg p { color:var(--foreground-muted); font-size:14px; margin-bottom:20px; line-height:1.5; }
            `}</style>
        </>
    );
}
