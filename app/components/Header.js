"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Header({ env = "Production" }) {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="app-header">
            <div className="header-inner">
                <div className="brand">
                    <Link href="/" className="logo-text">pgSentry</Link>
                    <span className="divider">/</span>
                    <span className="context">Dashboard</span>
                </div>

                <div className="actions">
                    <span className="env-pill">{env}</span>

                    {user && (
                        <div className="user-menu-wrap">
                            <button className="avatar-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="User menu">
                                <img src={user.avatar} alt={user.name || 'User'} />
                            </button>

                            {menuOpen && (
                                <>
                                    <div className="overlay" onClick={() => setMenuOpen(false)}></div>
                                    <div className="dropdown fade-in">
                                        <div className="user-info">
                                            <div className="name">{user.name || 'User'}</div>
                                            <div className="email">{user.email}</div>
                                        </div>
                                        <hr className="sep" />
                                        <Link href="/dashboard/settings" className="item" onClick={() => setMenuOpen(false)}>Settings</Link>
                                        <hr className="sep" />
                                        <button className="item danger" onClick={logout}>Log Out</button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .app-header {
                    border-bottom: 1px solid var(--border);
                    background: var(--surface);
                    padding: 14px 40px;
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }
                .header-inner {
                    max-width: 1160px;
                    margin: 0 auto;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .brand { display: flex; align-items: center; gap: 10px; }
                .logo-text { font-weight: 700; color: var(--foreground); font-size: 17px; }
                .divider { color: var(--border); font-size: 18px; }
                .context { color: var(--foreground-muted); font-size: 14px; }

                .actions { display: flex; gap: 12px; align-items: center; }
                .env-pill {
                    font-size: 11px;
                    font-weight: 600;
                    color: var(--success);
                    background: var(--success-bg);
                    padding: 3px 10px;
                    border-radius: 99px;
                }

                .user-menu-wrap { position: relative; }
                .avatar-btn {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    border: 2px solid var(--border);
                    padding: 0;
                    overflow: hidden;
                    cursor: pointer;
                    transition: border-color 0.18s;
                    background: none;
                }
                .avatar-btn:hover { border-color: var(--accent); }
                .avatar-btn img { width: 100%; height: 100%; object-fit: cover; }

                .overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 40;
                }
                .dropdown {
                    position: absolute;
                    top: 42px;
                    right: 0;
                    width: 200px;
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-md);
                    box-shadow: var(--shadow-md);
                    z-index: 60;
                    overflow: hidden;
                }
                .user-info { padding: 14px 16px; }
                .name { font-weight: 600; font-size: 14px; color: var(--foreground); }
                .email { font-size: 12px; color: var(--foreground-subtle); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .sep { border: none; border-top: 1px solid var(--border); margin: 0; }
                .item {
                    display: block;
                    width: 100%;
                    text-align: left;
                    padding: 10px 16px;
                    background: none;
                    border: none;
                    color: var(--foreground-muted);
                    font-size: 14px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: background 0.15s, color 0.15s;
                }
                .item:hover { background: var(--accent-light); color: var(--accent-dark); }
                .item.danger { color: var(--danger); }
                .item.danger:hover { background: var(--danger-bg); color: var(--danger); }
            `}</style>
        </header>
    );
}
