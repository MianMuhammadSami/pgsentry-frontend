"use client";

import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function AnalysisPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [dbType, setDbType] = useState("rds");
    const [dbSize, setDbSize] = useState("small");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`${API}/api/submit/analysis`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, provider: dbType, db_size: dbSize })
            });
            const data = await res.json();
            if (data.success) setStep(2);
            else setError(data.message || "Something went wrong.");
        } catch {
            setError("Network error. Please try again.");
        } finally { setLoading(false); }
    };

    return (
        <>
            <NavBar />
            <main className="analysis-main">
                <div className="split">
                    <div className="info-side">
                        <h1>Free Infrastructure Analysis</h1>
                        <p>Not ready to connect yet? Tell us about your setup and we'll send you a sample Health Report based on common patterns at your scale.</p>
                        <ul className="benefits">
                            <li><span className="b-icon">🎯</span> Benchmark against similar stacks</li>
                            <li><span className="b-icon">📋</span> Checklist of top risks for your provider</li>
                            <li><span className="b-icon">💡</span> Tuning recommendations tailored to your size</li>
                            <li><span className="b-icon">🛡️</span> Security best-practices checklist</li>
                        </ul>
                    </div>

                    <div className="form-side">
                        {step === 1 ? (
                            <div className="analysis-card">
                                <h2>Get Your Analysis</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="field">
                                        <label>Work Email</label>
                                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" />
                                    </div>
                                    <div className="field">
                                        <label>Database Provider</label>
                                        <select value={dbType} onChange={e => setDbType(e.target.value)}>
                                            <option value="rds">AWS RDS / Aurora</option>
                                            <option value="supabase">Supabase</option>
                                            <option value="neon">Neon</option>
                                            <option value="cloud_sql">GCP Cloud SQL</option>
                                            <option value="self">Self-Hosted</option>
                                        </select>
                                    </div>
                                    <div className="field">
                                        <label>Approximate DB Size</label>
                                        <select value={dbSize} onChange={e => setDbSize(e.target.value)}>
                                            <option value="small">&lt; 10 GB</option>
                                            <option value="medium">10 GB – 100 GB</option>
                                            <option value="large">100 GB – 1 TB</option>
                                            <option value="xl">1 TB+</option>
                                        </select>
                                    </div>
                                    {error && <div className="error-box">{error}</div>}
                                    <button type="submit" className="btn primary full" disabled={loading}>{loading ? 'Submitting…' : 'Analyze My Stack'}</button>
                                </form>
                            </div>
                        ) : (
                            <div className="analysis-card success-card">
                                <div className="success-icon">🚀</div>
                                <h2>Report on its way!</h2>
                                <p>We've queued a detailed sample report for <strong>{email}</strong>. Check your inbox shortly.</p>
                                <a href="/login" className="btn primary full" style={{ marginTop: 20 }}>Try the Live Dashboard</a>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />

            <style jsx>{`
                .analysis-main { max-width: 1000px; margin: 0 auto; padding: 96px 24px; }
                .split { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
                @media(max-width:768px) { .split { grid-template-columns: 1fr; gap: 40px; } }

                .info-side h1 { font-size: 36px; color: var(--foreground); margin-bottom: 18px; line-height: 1.15; }
                .info-side p { font-size: 16px; color: var(--foreground-muted); line-height: 1.6; margin-bottom: 28px; }
                .benefits { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 14px; }
                .benefits li { font-size: 15px; color: var(--foreground-muted); display: flex; align-items: center; gap: 10px; }
                .b-icon { font-size: 20px; }

                .analysis-card {
                    background: var(--surface); border: 1px solid var(--border);
                    border-radius: var(--radius-lg); padding: 36px;
                    box-shadow: var(--shadow);
                }
                .analysis-card h2 { font-size: 22px; color: var(--foreground); margin-bottom: 24px; }
                .field { margin-bottom: 18px; }
                .field label { display:block; margin-bottom:6px; font-size:13px; font-weight:600; color:var(--foreground-muted); }
                .field input, .field select {
                    width:100%; padding:10px 14px; border:1.5px solid var(--border);
                    border-radius:var(--radius); font-size:14px; color:var(--foreground);
                    background:var(--surface); appearance:none; -webkit-appearance:none;
                }
                .field select {
                    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
                    background-repeat:no-repeat; background-position:right 12px center;
                    padding-right:36px;
                }
                .field input:focus, .field select:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow); }
                .error-box { background:var(--danger-bg); color:var(--danger); padding:10px 14px; border-radius:var(--radius); font-size:13px; margin-bottom:16px; }
                .btn.full { width:100%; margin-top:8px; padding:12px; font-size:15px; }

                .success-card { text-align: center; }
                .success-icon { font-size: 48px; margin-bottom: 16px; }
                .success-card h2 { margin-bottom: 12px; }
                .success-card p { color: var(--foreground-muted); font-size: 15px; line-height: 1.5; }
            `}</style>
        </>
    );
}
