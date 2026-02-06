"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function QueryOptimizerPage() {
    const { user, getAuthHeaders } = useAuth();
    const [connections, setConnections] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchConns = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${API}/api/db/list`, {
                    headers: getAuthHeaders()
                });
                if (res.ok) {
                    const data = await res.json();
                    setConnections(data);
                    if (data.length > 0) setSelectedId(data[0].id);
                }
            } catch (e) { console.error(e); }
            setLoading(false);
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
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeaders()
                },
                body: JSON.stringify({ connectionId: selectedId, query: query.trim() })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setResult(data);
            } else {
                setError(data.detail || data.message || 'Analysis failed.');
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

    const copyPlan = () => {
        if (!result) return;
        navigator.clipboard.writeText(result.plan_lines.join('\n'));
        alert('Execution plan copied to clipboard!');
    };

    const downloadReport = () => {
        if (!result) return;
        const report = `
PostgreSQL Query Analysis Report
Generated: ${new Date().toISOString()}

=== Query ===
${query}

=== Summary ===
Execution Time: ${result.summary.total_time_ms?.toFixed(3)} ms
Planning Time: ${result.summary.planning_time_ms?.toFixed(3)} ms
Estimated Rows: ${result.summary.rows_estimated || 'N/A'}
Actual Rows: ${result.summary.rows_actual || 'N/A'}
${result.summary.cost?.total ? `Total Cost: ${result.summary.cost.total.toFixed(2)}` : ''}

=== Warnings ===
${result.summary.warnings?.join('\n') || 'None'}

=== Full Execution Plan ===
${result.plan_lines.join('\n')}
        `.trim();

        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `query-analysis-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (loading && connections.length === 0) {
        return <div className="loading-center">Loading...</div>;
    }

    if (connections.length === 0) {
        return (
            <div className="empty-state fade-in">
                <div className="empty-icon">🗄️</div>
                <h2>No databases connected</h2>
                <p>Connect your first PostgreSQL database to start using Query Optimizer.</p>
                <Link href="/dashboard/databases" className="btn primary">Connect Database</Link>
                <style jsx>{`
                    .loading-center { text-align: center; padding: 60px; color: var(--foreground-muted); }
                    .empty-state { text-align: center; padding: 100px 24px; }
                    .empty-icon { font-size: 48px; margin-bottom: 20px; }
                    .empty-state h2 { margin-bottom: 10px; font-size: 24px; }
                    .empty-state p { color: var(--foreground-muted); margin-bottom: 24px; font-size: 15px; max-width: 420px; margin-left: auto; margin-right: auto; }
                `}</style>
            </div>
        );
    }

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
                    <label>SQL Query <span className="hint-label">(SELECT queries only - read-only for safety)</span></label>
                    <div className="safety-warning">
                        ⚠️ <strong>SELECT queries only.</strong> Write operations (DELETE/UPDATE/INSERT) are blocked because EXPLAIN ANALYZE executes them.
                    </div>
                    <textarea
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={"-- Only SELECT queries are allowed:\nSELECT u.name, o.total\nFROM orders o\nJOIN users u ON u.id = o.user_id\nWHERE o.created_at > '2024-01-01'\nORDER BY o.total DESC\nLIMIT 100;"}
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
                        <SummaryCard label="Execution Time" value={result.summary.total_time_ms != null ? `${result.summary.total_time_ms.toFixed(3)} ms` : '—'} />
                        <SummaryCard label="Planning Time" value={result.summary.planning_time_ms != null ? `${result.summary.planning_time_ms.toFixed(3)} ms` : '—'} />
                        <SummaryCard label="Est. Rows" value={result.summary.rows_estimated != null ? Number(result.summary.rows_estimated).toLocaleString() : '—'} />
                        <SummaryCard label="Actual Rows" value={result.summary.rows_actual != null ? Number(result.summary.rows_actual).toLocaleString() : '—'} />
                    </div>

                    {/* Cost & Buffer Stats */}
                    <div className="technical-stats-grid">
                        {result.summary.cost && result.summary.cost.total && (
                            <div className="tech-stat-card">
                                <h4>Query Cost</h4>
                                <div className="cost-row">
                                    <span className="label">Startup:</span>
                                    <span className="value">{result.summary.cost.startup.toFixed(2)}</span>
                                </div>
                                <div className="cost-row">
                                    <span className="label">Total:</span>
                                    <span className="value">{result.summary.cost.total.toFixed(2)}</span>
                                </div>
                                <p className="hint">Lower is better. Relative units.</p>
                            </div>
                        )}

                        {(result.summary.buffers.shared_hit > 0 || result.summary.buffers.shared_read > 0) && (
                            <div className="tech-stat-card">
                                <h4>Buffer I/O</h4>
                                <div className="buffer-row">
                                    <span className="label">Shared Hit:</span>
                                    <span className="value good">{result.summary.buffers.shared_hit.toLocaleString()}</span>
                                </div>
                                <div className="buffer-row">
                                    <span className="label">Shared Read:</span>
                                    <span className="value warn">{result.summary.buffers.shared_read.toLocaleString()}</span>
                                </div>
                                {result.summary.buffers.temp_written > 0 && (
                                    <div className="buffer-row">
                                        <span className="label">Temp Written:</span>
                                        <span className="value bad">{result.summary.buffers.temp_written.toLocaleString()}</span>
                                    </div>
                                )}
                                {result.summary.buffer_hit_ratio && (
                                    <p className="hint">Cache Hit: {result.summary.buffer_hit_ratio}%</p>
                                )}
                            </div>
                        )}

                        {result.summary.index_scans && result.summary.index_scans.length > 0 && (
                            <div className="tech-stat-card">
                                <h4>Indexes Used</h4>
                                {result.summary.index_scans.map((idx, i) => (
                                    <div key={i} className="index-badge">{idx}</div>
                                ))}
                            </div>
                        )}

                        {result.summary.joins && result.summary.joins.length > 0 && (
                            <div className="tech-stat-card">
                                <h4>Join Operations</h4>
                                {result.summary.joins.map((join, i) => (
                                    <div key={i} className="join-type-badge">{join.type}</div>
                                ))}
                                <p className="hint">Hash Join &gt; Merge Join &gt; Nested Loop for large sets</p>
                            </div>
                        )}

                        {result.summary.cardinality_issues && result.summary.cardinality_issues.length > 0 && (
                            <div className="tech-stat-card alert">
                                <h4>⚠️ Cardinality Issues</h4>
                                {result.summary.cardinality_issues.map((issue, i) => (
                                    <div key={i} className="cardinality-issue">
                                        <span>Est: {issue.estimated.toLocaleString()}</span>
                                        <span>→</span>
                                        <span>Act: {issue.actual.toLocaleString()}</span>
                                        <span className="ratio-badge">{issue.ratio}x off</span>
                                    </div>
                                ))}
                                <p className="hint">Run ANALYZE or increase statistics target</p>
                            </div>
                        )}
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
                                <span key={i} className={`node-tag ${n === 'Seq Scan' ? 'bad' : n === 'Index Scan' ? 'good' : 'neutral'}`}>{n}</span>
                            ))}
                        </div>
                    )}

                    {/* Performance Tips */}
                    {(result.summary.seq_scans?.length > 0 || result.summary.cardinality_issues?.length > 0 || result.summary.buffers?.temp_written > 0) && (
                        <div className="tips-panel">
                            <h4>🎯 Optimization Tips</h4>
                            <ul className="tips-list">
                                {result.summary.seq_scans?.length > 0 && (
                                    <li>
                                        <strong>Add Indexes:</strong> Tables {result.summary.seq_scans.join(', ')} are being scanned sequentially.
                                        Create indexes on columns in WHERE, JOIN, or ORDER BY clauses. Use <code>CREATE INDEX idx_name ON table(column);</code>
                                    </li>
                                )}
                                {result.summary.cardinality_issues?.length > 0 && (
                                    <li>
                                        <strong>Update Statistics:</strong> PostgreSQL's planner has wrong row estimates.
                                        Run <code>ANALYZE table_name;</code> or increase statistics target with <code>ALTER TABLE table_name ALTER COLUMN col_name SET STATISTICS 1000;</code>
                                    </li>
                                )}
                                {result.summary.buffers?.temp_written > 0 && (
                                    <li>
                                        <strong>Increase work_mem:</strong> Query is spilling to disk ({(result.summary.buffers.temp_written * 8 / 1024).toFixed(1)} MB temp files).
                                        Try <code>SET work_mem = '64MB';</code> for this session or adjust globally in postgresql.conf.
                                    </li>
                                )}
                                {result.summary.joins?.some(j => j.type === 'Nested Loop') && result.summary.rows_actual > 1000 && (
                                    <li>
                                        <strong>Nested Loop on Large Dataset:</strong> Nested Loop joins are slow for large result sets.
                                        Ensure join columns are indexed or consider <code>SET enable_nestloop = off;</code> to force Hash/Merge join.
                                    </li>
                                )}
                                {result.summary.buffer_hit_ratio && result.summary.buffer_hit_ratio < 90 && (
                                    <li>
                                        <strong>Low Cache Hit Ratio:</strong> Only {result.summary.buffer_hit_ratio}% of data is served from cache.
                                        Consider increasing <code>shared_buffers</code> (typically 25% of RAM) or running VACUUM ANALYZE more frequently.
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}

                    {/* Raw plan */}
                    <div className="plan-panel">
                        <div className="plan-header">
                            <h4>Full Execution Plan (EXPLAIN ANALYZE)</h4>
                            <div className="plan-actions">
                                <button onClick={copyPlan} className="btn-small secondary">📋 Copy</button>
                                <button onClick={downloadReport} className="btn-small secondary">💾 Download Report</button>
                            </div>
                        </div>
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
                .safety-warning { background:rgba(239, 68, 68, 0.1); border:1px solid rgba(239, 68, 68, 0.3); border-radius:var(--radius); padding:10px 14px; margin:8px 0; font-size:13px; color:var(--danger); display:flex; align-items:center; gap:8px; }
                .safety-warning strong { font-weight:700; }
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

                /* Technical Stats Grid */
                .technical-stats-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin:16px 0; }
                .tech-stat-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); padding:18px; box-shadow:var(--shadow-sm); }
                .tech-stat-card.alert { border-left:3px solid var(--warning); background:rgba(251, 191, 36, 0.05); }
                .tech-stat-card h4 { font-size:13px; color:var(--foreground); margin-bottom:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; }
                .cost-row, .buffer-row { display:flex; justify-content:space-between; align-items:center; padding:6px 0; border-bottom:1px solid var(--border); }
                .cost-row:last-of-type, .buffer-row:last-of-type { border-bottom:none; }
                .cost-row .label, .buffer-row .label { font-size:13px; color:var(--foreground-muted); }
                .cost-row .value, .buffer-row .value { font-size:15px; font-weight:600; font-family:var(--font-mono); }
                .buffer-row .value.good { color:var(--success); }
                .buffer-row .value.warn { color:var(--warning); }
                .buffer-row .value.bad { color:var(--danger); }
                .tech-stat-card .hint { font-size:11px; color:var(--foreground-subtle); margin-top:10px; font-style:italic; }
                .index-badge, .join-type-badge { display:inline-block; background:var(--accent-light); color:var(--accent-dark); padding:5px 12px; border-radius:99px; font-size:12px; font-weight:600; margin:4px 4px 4px 0; font-family:var(--font-mono); }
                .join-type-badge { background:#f3f4f6; color:var(--foreground); }
                .cardinality-issue { display:flex; align-items:center; gap:8px; padding:8px; background:var(--background); border-radius:var(--radius); margin:8px 0; font-size:13px; font-family:var(--font-mono); }
                .cardinality-issue span { color:var(--foreground-muted); }
                .ratio-badge { background:var(--warning-bg); color:var(--warning); padding:2px 8px; border-radius:99px; font-size:11px; font-weight:700; }

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
                .node-tag.good { background:var(--success-bg); color:var(--success); }
                .node-tag.neutral { background:#f3f4f6; color:var(--foreground-muted); }

                /* Tips Panel */
                .tips-panel { background:linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05)); border:1px solid var(--accent); border-radius:var(--radius-md); padding:20px; margin:16px 0; }
                .tips-panel h4 { font-size:15px; color:var(--foreground); margin-bottom:14px; font-weight:600; }
                .tips-list { list-style:none; padding:0; display:flex; flex-direction:column; gap:14px; }
                .tips-list li { font-size:14px; line-height:1.6; color:var(--foreground-muted); padding-left:24px; position:relative; }
                .tips-list li::before { content:'→'; position:absolute; left:0; color:var(--accent); font-weight:700; font-size:16px; }
                .tips-list li strong { color:var(--foreground); display:block; margin-bottom:4px; }
                .tips-list li code { background:var(--background); padding:2px 6px; border-radius:4px; font-family:var(--font-mono); font-size:12px; color:var(--accent); border:1px solid var(--border); }

                .plan-panel .plan-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:12px; }
                .plan-panel .plan-actions { display:flex; gap:8px; }
                .btn-small { padding:6px 12px; font-size:12px; border-radius:var(--radius); cursor:pointer; border:1px solid var(--border); background:var(--surface); color:var(--foreground); transition:all 0.2s; font-weight:500; }
                .btn-small:hover { background:var(--background); border-color:var(--accent); }
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
