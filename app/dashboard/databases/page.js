"use client";

import React, { useState, useEffect } from 'react';
import ConnectionForm from '../../components/ConnectionForm';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function DatabasesPage() {
    const [view, setView] = useState("list");
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, getAuthHeaders } = useAuth();

    const fetchConnections = async () => {
        try {
            const res = await fetch(`${API}/api/db/list`, {
                headers: getAuthHeaders()
            });
            if (res.ok) setConnections(await res.json());
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    };

    useEffect(() => { if (user) fetchConnections(); }, [user]);

    const handleConnect = () => { setView("list"); fetchConnections(); };

    const handleDelete = async (id) => {
        if (!confirm('Delete this connection? This cannot be undone.')) return;
        try {
            const res = await fetch(`${API}/api/db/delete?connectionId=${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            if (res.ok) fetchConnections();
        } catch (e) { console.error(e); }
    };

    return (
        <div className="db-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Databases</h1>
                    <p className="sub">Manage your monitored PostgreSQL connections.</p>
                </div>
                {view === 'list' && <button className="btn primary" onClick={() => setView('add')}>+ Add Database</button>}
                {view === 'add'  && <button className="btn secondary" onClick={() => setView('list')}>Cancel</button>}
            </div>

            {view === 'list' ? (
                <div className="list-view">
                    {loading ? <p className="loading-text">Loading…</p> : connections.length > 0 ? (
                        <div className="grid">
                            {connections.map(conn => (
                                <div key={conn.id} className="db-card">
                                    <div className="db-card-top">
                                        <div className="db-status-dot"></div>
                                        <div className="db-info">
                                            <h3>{conn.name}</h3>
                                            <div className="meta">{conn.host} · {conn.database}</div>
                                        </div>
                                    </div>
                                    <div className="db-actions">
                                        <Link href={`/dashboard`} className="btn secondary sm">View</Link>
                                        <button className="btn ghost sm danger-btn" onClick={() => handleDelete(conn.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">🗄️</div>
                            <h3>No databases connected</h3>
                            <p>Connect your first PostgreSQL database to start monitoring.</p>
                            <button className="btn primary" onClick={() => setView('add')}>Connect Database</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="add-view fade-in">
                    <ConnectionForm onConnect={handleConnect} />
                </div>
            )}

            <style jsx>{`
                .page-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:32px; }
                h1 { font-size:24px; color:var(--foreground); margin-bottom:4px; }
                .sub { color:var(--foreground-muted); font-size:14px; }
                .loading-text { color:var(--foreground-muted); padding:40px 0; }

                .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:20px; }
                .db-card {
                    background:var(--surface); border:1px solid var(--border);
                    border-radius:var(--radius-md); padding:22px;
                    box-shadow:var(--shadow-sm);
                    transition:border-color 0.2s, box-shadow 0.2s, transform 0.15s;
                }
                .db-card:hover { border-color:var(--accent-light); box-shadow:var(--shadow); transform:translateY(-2px); }
                .db-card-top { display:flex; align-items:center; gap:14px; margin-bottom:16px; }
                .db-status-dot { width:10px; height:10px; border-radius:50%; background:var(--success); box-shadow:0 0 6px rgba(16,185,129,0.4); flex-shrink:0; }
                .db-info { flex:1; min-width:0; }
                .db-info h3 { font-size:16px; margin-bottom:3px; color:var(--foreground); }
                .meta { font-size:13px; color:var(--foreground-muted); font-family:var(--font-mono); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
                .db-actions { display:flex; gap:8px; }
                .danger-btn { color:var(--danger) !important; }
                .danger-btn:hover { background:var(--danger-bg) !important; }

                .empty-state { text-align:center; padding:80px 24px; border:2px dashed var(--border); border-radius:var(--radius-lg); background:var(--surface); }
                .empty-icon { font-size:48px; margin-bottom:16px; }
                .empty-state h3 { margin-bottom:8px; color:var(--foreground); }
                .empty-state p { color:var(--foreground-muted); margin-bottom:20px; font-size:14px; }
            `}</style>
        </div>
    );
}
