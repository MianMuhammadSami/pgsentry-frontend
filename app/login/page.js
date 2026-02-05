"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function LoginPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();
    const router = useRouter();

    const handleRequestOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API}/api/auth/request-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (data.success) {
                setStep(2);
            } else {
                setError(data.message || 'Failed to send code.');
            }
        } catch {
            setError('Network error. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${API}/api/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code })
            });
            const data = await res.json();
            if (data.success) {
                login(data.user);
                router.push('/login/success');
            } else {
                setError(data.message || 'Invalid code.');
            }
        } catch {
            setError('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <NavBar />
            <div className="login-bg"></div>
            <main className="login-main">
                <div className="login-container">
                <div className="login-card fade-in">
                    {step === 1 ? (
                        <>
                            <h1>Welcome back</h1>
                            <p className="sub">Enter your email to continue.</p>
                            <form onSubmit={handleRequestOTP}>
                                <div className="field">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        required
                                        autoFocus
                                    />
                                </div>
                                {error && <div className="error-box">{error}</div>}
                                <button className="btn primary full" disabled={loading}>
                                    {loading ? 'Sending…' : 'Continue with Email'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h1>Check your inbox</h1>
                            <p className="sub">We sent a 6-digit code to <strong>{email}</strong>.</p>
                            <form onSubmit={handleVerify}>
                                <div className="field">
                                    <label>Login Code</label>
                                    <input
                                        type="text"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="123456"
                                        required
                                        autoFocus
                                        maxLength="6"
                                        className="code-input"
                                    />
                                </div>
                                {error && <div className="error-box">{error}</div>}
                                <button className="btn primary full" disabled={loading}>
                                    {loading ? 'Verifying…' : 'Sign In'}
                                </button>
                                <button type="button" className="back-link" onClick={() => { setStep(1); setError(''); }}>
                                    Use a different email
                                </button>
                            </form>
                        </>
                    )}
                </div>

                <p className="footer-note">
                    New here? <Link href="/analysis">Get a free analysis</Link>
                </p>
                </div>
            </main>
            <Footer />

            <style jsx>{`
                .login-page {
                    min-height: 100vh;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }
                .login-bg {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 600px 500px at 20% 30%, rgba(59,130,246,0.07) 0%, transparent 70%),
                        radial-gradient(ellipse 500px 400px at 80% 70%, rgba(16,185,129,0.06) 0%, transparent 70%);
                    pointer-events: none;
                }
                .login-main {
                    flex: 1;
                    position: relative;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 48px 24px;
                }
                .login-container {
                    width: 100%;
                    max-width: 420px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .login-card {
                    width: 100%;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    padding: 40px 36px;
                    box-shadow: var(--shadow);
                }
                h1 { font-size: 24px; text-align: center; margin-bottom: 6px; color: var(--foreground); }
                .sub { color: var(--foreground-muted); text-align: center; margin-bottom: 30px; font-size: 14px; line-height: 1.5; }

                .field { margin-bottom: 22px; }
                label { display: block; margin-bottom: 7px; font-size: 13px; font-weight: 600; color: var(--foreground-muted); }
                input {
                    width: 100%;
                    padding: 11px 14px;
                    border: 1.5px solid var(--border);
                    border-radius: var(--radius);
                    font-size: 15px;
                    color: var(--foreground);
                    background: var(--surface);
                    transition: border-color 0.18s, box-shadow 0.18s;
                }
                input::placeholder { color: var(--foreground-subtle); }
                input:focus {
                    outline: none;
                    border-color: var(--accent);
                    box-shadow: 0 0 0 3px var(--accent-glow);
                }
                .code-input {
                    letter-spacing: 6px;
                    text-align: center;
                    font-family: var(--font-mono);
                    font-size: 22px;
                    font-weight: 700;
                }

                .error-box {
                    background: var(--danger-bg);
                    color: var(--danger);
                    border: 1px solid rgba(239,68,68,0.25);
                    padding: 10px 14px;
                    border-radius: var(--radius);
                    font-size: 13px;
                    margin-bottom: 18px;
                    text-align: center;
                }

                .btn.full { margin-top: 4px; padding: 12px; font-size: 15px; }

                .back-link {
                    display: block;
                    width: 100%;
                    margin-top: 16px;
                    background: none;
                    border: none;
                    color: var(--foreground-subtle);
                    font-size: 13px;
                    cursor: pointer;
                    text-align: center;
                }
                .back-link:hover { color: var(--accent); }

                .footer-note {
                    margin-top: 28px;
                    font-size: 14px;
                    color: var(--foreground-muted);
                    text-align: center;
                }
                .footer-note a { color: var(--accent); font-weight: 600; }
            `}</style>
        </div>
    );
}
