"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function QueryOptimizerPage() {
    const { user } = useAuth();
    const [connections, setConnections] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConns = async () => {
            try {
                const res = await fetch(`${API}/api/db/list`, {
                    headers: { 'X-Auth-User': user?.id || '' }
                });
                if (res.ok) {
                    const data = await res.json();
                    setConnections(data);
                    if (data.length > 0) setSelectedId(data[0].id);
                }
            } catch (e) { console.error(e); }
        };
        if (user) fetchConns();
    }, [user]);

    const handleExplain = async (e) => {
        e.preventDefault();
        if (!selectedId || !query.trim()) return;
        setLoading(true);
        setError('');
        setResult(null);
        try {
            const res = await fetch(`${API}/api/query/explain`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ connectionId: selectedId, query: query.trim() })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setResult(data);
            } else {
                setError(data.detail || data.message || 'Explain failed.');
            }
        } catch {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fmt = (bytes) => {
        if (bytes == null || isNaN(bytes)) return '—';
        const u = ['B','KB','MB','GB','TB'];
        let v = Number(bytes), i = 0;
        while (v >= 1024 && i < u.length - 1) { v /= 1024; i++; }
        return v.toFixed(1) + ' ' + u[i];
    };

    return (
        <div className="optimizer-page fade-in">
            <div className="opt-header">
                <div>
                    <h2>Query Optimizer</h2>
                    <p className="opt-sub">Paste a SELECT query, run EXPLAIN ANALYZE, and get an instant breakdown of what's slow and why.</p>
                </div>
            </div>

            <form onSubmit={handleExplain} className="opt-form">
                <div className="opt-row">
                    <div className="opt-field db-select">
                        <label>Database</label>
                        <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
                            {connections.map(c => (
                                <option key={c.id} value={c.id}>{c.name} — {c.host}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="opt-field">
                    <label>SQL Query <span className="hint-label">(SELECT only)</span></label>
                    <textarea
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={"SELECT u.name, o.total\nFROM orders o\nJOIN users u ON u.id = o.user_id\nWHERE o.created_at > '2024-01-01'\nORDER BY o.total DESC\nLIMIT 100;"}
                        rows={6}
                        required
                        spellCheck={false}
                    />
                </div>
                {error && <div className="error-box">{error}</div>}
                <button type="submit" className="btn primary" disabled={loading || !selectedId}>
                    {loading ? 'Analyzing…' : 'Run EXPLAIN ANALYZE'}
                </button>
            </form>

            {result && (
                <div className="opt-results">
                    {/* Summary cards */}
                    <div className="summary-row">
                        <SummaryCard label="Execution Time" value={result.summary.total_time_ms != null ? `${result.summary.total_time_ms} ms` : '—'} />
                        <SummaryCard label="Planning Time" value={result.summary.planning_time_ms != null ? `${result.summary.planning_time_ms} ms` : '—'} />
                        <SummaryCard label="Est. Rows" value={result.summary.rows_estimated != null ? Number(result.summary.rows_estimated).toLocaleString() : '—'} />
                        <SummaryCard label="Actual Rows" value={result.summary.rows_actual != null ? Number(result.summary.rows_actual).toLocaleString() : '—'} />
                    </div>

                    {/* Warnings */}
                    {result.summary.warnings && result.summary.warnings.length > 0 && (
                        <div className="warnings-panel">
                            <h4>Warnings</h4>
                            <ul>
                                {result.summary.warnings.map((w, i) => (
                                    <li key={i}><span className="warn-dot"></span>{w}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Missing indexes */}
                    {result.summary.missing_indexes && result.summary.missing_indexes.length > 0 && (
                        <div className="missing-panel">
                            <h4>Potential Missing Indexes</h4>
                            <p>Sequential scans detected on these tables. Consider adding indexes on columns used in WHERE / JOIN / ORDER BY clauses:</p>
                            <div className="tag-row">
                                {result.summary.missing_indexes.map((t, i) => (
                                    <span key={i} className="tag">{t}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Node types */}
                    {result.summary.node_types && result.summary.node_types.length > 0 && (
                        <div className="nodes-row">
                            <span className="nodes-label">Plan nodes:</span>
                            {result.summary.node_types.map((n, i) => (
                                <span key={i} className={`node-tag ${n === 'Seq Scan' ? 'bad' : 'neutral'}`}>{n}</span>
                            ))}
                        </div>
                    )}

                    {/* Raw plan */}
                    <div className="plan-panel">
                        <h4>Raw Execution Plan</h4>
                        <pre className="plan-pre">{result.plan_lines.join('\n')}</pre>
                    </div>
                </div>
            )}

            <style jsx>{`
                .optimizer-page { display:flex; flex-direction:column; gap:24px; }

                /* Header */
                .opt-header h2 { font-size:22px; color:var(--foreground); margin-bottom:4px; }
                .opt-sub { font-size:14px; color:var(--foreground-muted); }

                /* Form */
                .opt-form { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); padding:24px; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:16px; }
                .opt-field { display:flex; flex-direction:column; gap:6px; }
                .opt-field label { font-size:13px; font-weight:600; color:var(--foreground-muted); }
                .hint-label { font-weight:400; color:var(--foreground-subtle); }
                .opt-field select, .opt-field textarea {
                    border:1.5px solid var(--border); border-radius:var(--radius);
                    padding:10px 14px; font-size:14px; color:var(--foreground);
                    background:var(--surface); font-family:inherit; transition:border-color 0.18s, box-shadow 0.18s;
                }
                .opt-field textarea { font-family:var(--font-mono); font-size:13px; resize:vertical; line-height:1.6; }
                .opt-field select, .opt-field textarea:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow); }
                .opt-field select {
                    appearance:none; -webkit-appearance:none;
                    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
                    background-repeat:no-repeat; background-position:right 12px center; padding-right:36px;
                }
                .error-box { background:var(--danger-bg); color:var(--danger); border:1px solid rgba(239,68,68,0.25); padding:10px 14px; border-radius:var(--radius); font-size:13px; }

                /* Results */
                .opt-results { display:flex; flex-direction:column; gap:16px; }

                .summary-row { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
                @media(max-width:768px) { .summary-row { grid-template-columns:repeat(2,1fr); } }

                .warnings-panel, .missing-panel, .plan-panel {
                    background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); padding:18px; box-shadow:var(--shadow-sm);
                }
                .warnings-panel { border-left:3px solid var(--warning); }
                .missing-panel { border-left:3px solid var(--accent); }
                .warnings-panel h4, .missing-panel h4, .plan-panel h4 { font-size:14px; color:var(--foreground); margin-bottom:10px; }
                .warnings-panel ul { list-style:none; padding:0; display:flex; flex-direction:column; gap:8px; }
                .warnings-panel li { font-size:13px; color:var(--foreground-muted); display:flex; align-items:flex-start; gap:8px; }
                .warn-dot { display:inline-block; width:8px; height:8px; min-width:8px; border-radius:50%; background:var(--warning); margin-top:4px; }
                .missing-panel p { font-size:13px; color:var(--foreground-muted); margin-bottom:10px; line-height:1.5; }
                .tag-row { display:flex; flex-wrap:wrap; gap:8px; }
                .tag { background:var(--accent-light); color:var(--accent-dark); padding:4px 12px; border-radius:99px; font-size:13px; font-weight:600; font-family:var(--font-mono); }

                .nodes-row { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
                .nodes-label { font-size:13px; color:var(--foreground-muted); font-weight:600; }
                .node-tag { padding:3px 10px; border-radius:99px; font-size:12px; font-weight:600; }
                .node-tag.bad { background:var(--danger-bg); color:var(--danger); }
                .node-tag.neutral { background:#f3f4f6; color:var(--foreground-muted); }

                .plan-panel pre { background:#f9fafb; border:1px solid var(--border); border-radius:var(--radius); padding:14px; overflow-x:auto; font-family:var(--font-mono); font-size:12px; color:var(--foreground); line-height:1.7; white-space:pre; }
            `}</style>
        </div>
    );
}

function SummaryCard({ label, value }) {
    return (
        <div className="sum-card">
            <div className="sum-label">{label}</div>
            <div className="sum-value">{value}</div>
            <style jsx>{`
                .sum-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); padding:16px; box-shadow:var(--shadow-sm); }
                .sum-label { font-size:11px; font-weight:700; color:var(--foreground-subtle); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:6px; }
                .sum-value { font-size:22px; font-weight:700; color:var(--foreground); }
            `}</style>
        </div>
    );
}
