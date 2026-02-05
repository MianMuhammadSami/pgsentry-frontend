"use client";

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function Badge({ kind, children }) {
    return <span className={`badge ${kind}`}>{children}<style jsx>{`
        .badge { display:inline-flex; align-items:center; padding:3px 10px; border-radius:99px; font-size:12px; font-weight:600; }
        .badge.good  { background:#d1fae5; color:#047857; }
        .badge.warn  { background:#fef3c7; color:#b45309; }
        .badge.bad   { background:#fee2e2; color:#dc2626; }
    `}</style></span>;
}

export default function Dashboard({ report, onRefresh, connectionId }) {
    const { user } = useAuth();
    const [insights, setInsights] = useState([]);
    const [insightsLoading, setInsightsLoading] = useState(false);

    if (!report) {
        return (
            <div className="empty-state fade-in">
                <div className="empty-icon">📊</div>
                <h3>No report loaded</h3>
                <p>Connect a database or click Refresh to generate a health report.</p>
                <style jsx>{`
                    .empty-state { text-align:center; padding:80px 24px; border:2px dashed var(--border); border-radius:var(--radius-lg); background:var(--surface); }
                    .empty-icon { font-size:44px; margin-bottom:16px; }
                    h3 { margin-bottom:8px; color:var(--foreground); }
                    p { color:var(--foreground-muted); font-size:14px; }
                `}</style>
            </div>
        );
    }

    const { kpi, alerts, recommendations, top_tables, transactions, long_running_queries, index_usage, top_queries, unused_indexes_detail, dead_tuples_detail, blocking_queries = [], deadlocks = 0, temp_files = 0, temp_bytes = 0, status } = report;

    const fmt = (bytes) => {
        if (bytes == null || isNaN(bytes)) return "—";
        const u = ["B","KB","MB","GB","TB"];
        let v = Number(bytes), i = 0;
        while (v >= 1024 && i < u.length-1) { v /= 1024; i++; }
        return v.toFixed(1) + " " + u[i];
    };
    const num = (n) => n != null && !isNaN(n) ? Number(n).toLocaleString() : "—";

    const connUsage = kpi.max_connections ? ((kpi.connections / kpi.max_connections) * 100).toFixed(1) : 0;
    const cacheHit  = Number(kpi.cache_hit_ratio || 0);
    const idxHit    = Number(kpi.index_hit_rate || 0);
    const repLag    = Number(kpi.replication_lag) || 0;
    const statusLabel = status === 'CRITICAL' ? 'Critical' : status === 'WARN' ? 'Needs attention' : 'Healthy';
    const statusClass = status === 'CRITICAL' ? 'bad' : status === 'WARN' ? 'warn' : 'good';
    const summaryText = alerts && alerts.length > 0
        ? `${alerts.length} issue${alerts.length !== 1 ? 's' : ''} need attention. Check alerts below.`
        : 'No issues detected. Your database looks healthy.';

    const fetchInsights = async () => {
        if (!connectionId || !user?.id) return;
        setInsightsLoading(true);
        try {
            const res = await fetch(`${API}/api/insights/suggest?connectionId=${connectionId}`, {
                headers: { 'X-Auth-User': user.id }
            });
            if (res.ok) {
                const data = await res.json();
                setInsights(data.recommendations || []);
            }
        } catch (e) { console.error(e); }
        finally { setInsightsLoading(false); }
    };

    const displayRecs = insights.length ? insights : (recommendations || []);

    return (
        <div className="dash fade-in">
            {/* Header row */}
            <div className="dash-header">
                <h2>Health Overview</h2>
                <button className="btn secondary sm" onClick={onRefresh}>↻ Refresh</button>
            </div>

            {/* Status + quick summary for non-DBAs */}
            <div className="dash-status-row">
                <Badge kind={statusClass}>{statusLabel}</Badge>
                <span className="dash-summary">{summaryText}</span>
            </div>

            {/* KPI Cards */}
            <div className="kpi-row">
                <KpiCard label="DB Size" value={fmt(kpi.db_size)} sub="Total size on disk" />
                <KpiCard label="Connections" value={`${kpi.connections || 0} / ${kpi.max_connections || '?'}`} sub={`${connUsage}% of limit`} highlight={connUsage > 80 ? 'warn' : connUsage > 95 ? 'bad' : ''} />
                <KpiCard label="Replication Lag" value={repLag === 0 ? 'Primary' : `${repLag.toFixed(1)}s`} sub={repLag === 0 ? 'Not a replica' : repLag > 5 ? 'Check replica' : 'OK'} highlight={repLag > 60 ? 'bad' : repLag > 5 ? 'warn' : ''} />
                <KpiCard label="Cache Hit" value={`${cacheHit.toFixed(1)}%`} sub={cacheHit > 95 ? 'Excellent' : cacheHit > 85 ? 'Good' : 'Needs attention'} highlight={cacheHit < 85 ? 'warn' : ''} />
                <KpiCard label="Index Hit" value={`${idxHit.toFixed(1)}%`} sub={idxHit > 95 ? 'Healthy' : 'Check indexes'} highlight={idxHit < 80 ? 'warn' : ''} />
            </div>

            {/* Alerts */}
            <Panel title="Active Alerts" count={alerts ? alerts.length : 0} icon="🚨">
                {alerts && alerts.length > 0 ? alerts.map((a, i) => (
                    <div key={i} className="alert-row">
                        <Badge kind={a.severity === 'bad' || a.severity === 'critical' ? 'bad' : a.severity === 'warn' ? 'warn' : 'good'}>
                            {(a.severity || 'info').toUpperCase()}
                        </Badge>
                        <div className="alert-body">
                            <div className="alert-title">{a.title}</div>
                            <div className="alert-rec">{a.recommendation}</div>
                        </div>
                        {a.signal && <code className="alert-signal">{a.signal}</code>}
                    </div>
                )) : <div className="panel-empty">✓ No active alerts — system healthy</div>}
            </Panel>

            {/* Top Queries */}
            <Panel title="Top Queries by Total Time" icon="⚡">
                {top_queries && top_queries.length > 0 ? (
                    <div className="table-wrap">
                        <table className="tbl">
                            <thead><tr><th>Query</th><th>Calls</th><th>Avg</th><th>Total</th></tr></thead>
                            <tbody>
                                {top_queries.map((q, i) => (
                                    <tr key={i}>
                                        <td className="q-col"><code>{q.query}</code></td>
                                        <td>{num(q.calls)}</td>
                                        <td>{Number(q.avg_time).toFixed(2)} ms</td>
                                        <td>{Number(q.total_time).toFixed(2)} s</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="panel-empty">
                        {kpi.pg_stat_statements_enabled === false ? (
                            <div>
                                <p><strong>pg_stat_statements</strong> is not enabled on this database.</p>
                                <p className="hint">Run <code>CREATE EXTENSION IF NOT EXISTS pg_stat_statements;</code> then restart Postgres.</p>
                            </div>
                        ) : 'No query stats available yet.'}
                    </div>
                )}
            </Panel>

            {/* Two-col: Top Tables + Long Running */}
            <div className="two-col">
                {top_tables && top_tables.length > 0 && (
                    <Panel title="Top Tables by Size" icon="📦">
                        {top_tables.map((t, i) => (
                            <div key={i} className="table-row">
                                <span className="tname">{t.name}</span>
                                <span className="tsize">{fmt(t.size)}</span>
                            </div>
                        ))}
                    </Panel>
                )}

                {long_running_queries && long_running_queries.length > 0 && (
                    <Panel title="Long-Running Queries" count={long_running_queries.length} icon="⏱️">
                        {long_running_queries.map((q, i) => (
                            <div key={i} className="lq-item">
                                <div className="lq-header">
                                    <span className="lq-dur">{q.duration}</span>
                                    <Badge kind={q.state === 'active' ? 'warn' : 'good'}>{q.state}</Badge>
                                </div>
                                <code className="lq-text">{q.query}</code>
                            </div>
                        ))}
                    </Panel>
                )}
            </div>

            {/* Blocking queries — who is blocking whom */}
            {blocking_queries && blocking_queries.length > 0 && (
                <Panel title="Blocking / Lock Waits" count={blocking_queries.length} icon="🔒">
                    <p className="panel-hint-inline">One or more queries are waiting on locks held by other queries. Resolve by finishing or terminating the blocking session.</p>
                    <div className="table-wrap">
                        <table className="tbl">
                            <thead><tr><th>Blocked PID</th><th>Blocking PID</th><th>Blocked (waiting)</th><th>Blocking (holder)</th><th>Wait time</th></tr></thead>
                            <tbody>
                                {blocking_queries.map((b, i) => (
                                    <tr key={i}>
                                        <td><code>{b.blocked_pid}</code></td>
                                        <td><code>{b.blocking_pid}</code></td>
                                        <td className="q-col"><code>{b.blocked_query}</code></td>
                                        <td className="q-col"><code>{b.blocking_query}</code></td>
                                        <td>{b.blocked_duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Panel>
            )}

            {/* Two-col: Transactions + Index Usage */}
            <div className="two-col">
                {transactions && (
                    <Panel title="Transactions & Database Stats" icon="💳">
                        <StatRow label="Commits" value={num(transactions.commits)} />
                        <StatRow label="Rollbacks" value={num(transactions.rollbacks)} />
                        {transactions.commits > 0 && (
                            <StatRow label="Rollback Rate" value={((transactions.rollbacks / transactions.commits) * 100).toFixed(2) + '%'} />
                        )}
                        <StatRow label="Deadlocks (lifetime)" value={num(deadlocks)} warn={deadlocks > 0} />
                        <StatRow label="Temp files written" value={num(temp_files)} warn={temp_files > 0} />
                        {temp_bytes > 0 && <StatRow label="Temp data size" value={fmt(temp_bytes)} />}
                    </Panel>
                )}

                {index_usage && (
                    <Panel title="Index Usage" icon="🔍">
                        <StatRow label="Total Index Scans" value={num(index_usage.total_scans)} />
                        <StatRow label="Unused Indexes" value={num(index_usage.unused_indexes)} warn={index_usage.unused_indexes > 0} />
                        <StatRow label="Waiting Locks" value={num(kpi.active_locks || 0)} warn={(kpi.active_locks || 0) > 0} />
                    </Panel>
                )}
            </div>

            {/* Unused Indexes Detail */}
            {unused_indexes_detail && unused_indexes_detail.length > 0 && (
                <Panel title="Unused Indexes" count={unused_indexes_detail.length} icon="🗂️">
                    <div className="table-wrap">
                        <table className="tbl">
                            <thead><tr><th>Index</th><th>Table</th><th>Size</th></tr></thead>
                            <tbody>
                                {unused_indexes_detail.map((idx, i) => (
                                    <tr key={i}>
                                        <td><code className="idx-name">{idx.name}</code></td>
                                        <td><code className="idx-table">{idx.table}</code></td>
                                        <td className="idx-size">{fmt(idx.size)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="panel-hint">These indexes have zero scans. Dropping them reduces write overhead and bloat.</p>
                </Panel>
            )}

            {/* Dead Tuples per Table (with bloat %) */}
            {dead_tuples_detail && dead_tuples_detail.length > 0 && (
                <Panel title="Dead Tuples & Bloat by Table" count={dead_tuples_detail.length} icon="🧹">
                    <div className="table-wrap">
                        <table className="tbl">
                            <thead><tr><th>Table</th><th>Dead Tuples</th><th>Live Tuples</th><th>Bloat %</th><th>Last Autovacuum</th></tr></thead>
                            <tbody>
                                {dead_tuples_detail.map((row, i) => {
                                    const total = (row.live_tuples || 0) + (row.dead_tuples || 0);
                                    const bloatPct = total > 0 ? ((row.dead_tuples / total) * 100).toFixed(1) : '0';
                                    const bloatNum = parseFloat(bloatPct);
                                    return (
                                        <tr key={i}>
                                            <td><code className="idx-table">{row.table}</code></td>
                                            <td className={bloatNum > 20 ? 'val-warn' : 'val-ok'}>{num(row.dead_tuples)}</td>
                                            <td>{num(row.live_tuples)}</td>
                                            <td className={bloatNum > 20 ? 'val-warn' : 'val-ok'}>{bloatPct}%</td>
                                            <td className="idx-table">{row.last_autovacuum ? new Date(row.last_autovacuum).toLocaleString() : '—'}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <p className="panel-hint">High bloat % means dead row versions are piling up. Run VACUUM ANALYZE or use pg_repack to reclaim space.</p>
                </Panel>
            )}

            {/* What this means — for non-DBAs */}
            <details className="dash-glossary">
                <summary>What these terms mean</summary>
                <ul>
                    <li><strong>Replication lag</strong> — How far behind a replica is. High lag risks data loss on failover.</li>
                    <li><strong>Cache hit / Index hit</strong> — % of reads served from RAM. Low = more disk I/O, often fixable with more memory or better indexes.</li>
                    <li><strong>Dead tuples / Bloat</strong> — Old row versions not yet reclaimed. VACUUM cleans them; high bloat slows queries and wastes space.</li>
                    <li><strong>Blocking</strong> — One query holds a lock; others wait. Often resolved by finishing or cancelling the blocking query.</li>
                    <li><strong>Temp files</strong> — Queries spilling to disk (sorts, hashes). Increasing work_mem can reduce this.</li>
                    <li><strong>Unused indexes</strong> — Indexes never used; they slow writes and add bloat. Safe to drop after verification.</li>
                </ul>
            </details>

            {/* Recommendations / Insights */}
            <Panel title="Recommendations" icon="💡" action={
                <button className="btn ghost sm" onClick={fetchInsights} disabled={insightsLoading}>
                    {insightsLoading ? 'Loading…' : '✦ Get Smart Insights'}
                </button>
            }>
                {displayRecs && displayRecs.length > 0 ? (
                    <ul className="rec-list">
                        {displayRecs.map((r, i) => {
                            const item = typeof r === 'string' ? { title: r } : r;
                            return (
                                <li key={i} className="rec-item">
                                    <strong className="rec-title">{item.title}</strong>
                                    {item.detail && <p className="rec-detail">{item.detail}</p>}
                                </li>
                            );
                        })}
                    </ul>
                ) : <div className="panel-empty">No recommendations at this time.</div>}
            </Panel>

            <style jsx>{`
                .dash { display:flex; flex-direction:column; gap:24px; }

                /* Header */
                .dash-header { display:flex; justify-content:space-between; align-items:center; }
                .dash-header h2 { font-size:22px; color:var(--foreground); }

                /* Status + summary */
                .dash-status-row { display:flex; align-items:center; gap:12px; margin-bottom:20px; flex-wrap:wrap; }
                .dash-summary { font-size:14px; color:var(--foreground-muted); }
                .panel-hint-inline { font-size:13px; color:var(--foreground-muted); margin-bottom:14px; line-height:1.5; }
                /* Glossary */
                .dash-glossary { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); padding:0; }
                .dash-glossary summary { padding:14px 18px; cursor:pointer; font-weight:600; font-size:14px; color:var(--foreground); }
                .dash-glossary ul { margin:0 18px 18px; padding-left:20px; font-size:13px; color:var(--foreground-muted); line-height:1.6; }
                .dash-glossary li { margin-bottom:8px; }
                /* KPI */
                .kpi-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
                @media(max-width:1100px) { .kpi-row { grid-template-columns:repeat(3,1fr); } }
                @media(max-width:700px) { .kpi-row { grid-template-columns:repeat(2,1fr); } }
                @media(max-width:480px) { .kpi-row { grid-template-columns:1fr; } }

                /* Two col */
                .two-col { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
                @media(max-width:768px) { .two-col { grid-template-columns:1fr; } }

                /* Alert rows */
                .alert-row { display:flex; align-items:flex-start; gap:14px; padding:14px 0; border-bottom:1px solid var(--border); }
                .alert-row:last-child { border-bottom:none; }
                .alert-body { flex:1; min-width:0; }
                .alert-title { font-weight:600; font-size:14px; color:var(--foreground); margin-bottom:3px; }
                .alert-rec { font-size:13px; color:var(--foreground-muted); }
                .alert-signal { font-size:12px; color:var(--foreground-muted); background:#f3f4f6; padding:3px 8px; border-radius:4px; white-space:nowrap; }

                /* Table */
                .table-wrap { overflow-x:auto; }
                .tbl { width:100%; border-collapse:collapse; font-size:13px; }
                .tbl th { text-align:left; padding:10px 14px; background:#f9fafb; color:var(--foreground-muted); font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.04em; border-bottom:1px solid var(--border); }
                .tbl td { padding:10px 14px; border-bottom:1px solid var(--border); color:var(--foreground); }
                .tbl tr:last-child td { border-bottom:none; }
                .q-col { max-width:380px; }
                .q-col code { color:var(--accent-dark); font-family:var(--font-mono); font-size:12px; display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }

                /* Table rows (top tables) */
                .table-row { display:flex; justify-content:space-between; padding:11px 0; border-bottom:1px solid var(--border); }
                .table-row:last-child { border-bottom:none; }
                .tname { font-family:var(--font-mono); font-size:13px; color:var(--foreground); }
                .tsize { font-weight:600; color:var(--accent); font-size:13px; }

                /* Long queries */
                .lq-item { padding:12px 0; border-bottom:1px solid var(--border); }
                .lq-item:last-child { border-bottom:none; }
                .lq-header { display:flex; align-items:center; gap:10px; margin-bottom:6px; }
                .lq-dur { font-size:12px; font-weight:600; color:var(--accent); }
                .lq-text { font-family:var(--font-mono); font-size:12px; color:var(--foreground-muted); display:block; background:#f3f4f6; padding:6px 10px; border-radius:5px; overflow-x:auto; white-space:nowrap; }

                /* Stat rows */
                .stat-row { display:flex; justify-content:space-between; padding:9px 0; border-bottom:1px solid var(--border); }
                .stat-row:last-child { border-bottom:none; }
                .stat-label { font-size:14px; color:var(--foreground-muted); }
                .stat-value { font-weight:600; font-size:14px; color:var(--foreground); }
                .stat-value.warn { color:var(--warning); }

                /* Recommendations */
                .rec-list { list-style:none; padding:0; }
                .rec-item { padding:14px 0; border-bottom:1px solid var(--border); }
                .rec-item:last-child { border-bottom:none; }
                .rec-title { font-size:14px; color:var(--foreground); display:block; margin-bottom:4px; }
                .rec-detail { font-size:13px; color:var(--foreground-muted); margin:0; line-height:1.5; }

                .panel-empty { padding:28px; text-align:center; color:var(--foreground-muted); font-size:14px; }
                .hint { color:var(--foreground-subtle); font-size:13px; margin-top:8px; }
                .hint code { background:#f3f4f6; padding:2px 6px; border-radius:4px; font-size:12px; }

                /* Unused indexes / dead tuples tables */
                .idx-name { color:var(--accent-dark); font-family:var(--font-mono); font-size:12px; }
                .idx-table { color:var(--foreground-muted); font-family:var(--font-mono); font-size:12px; }
                .idx-size { font-weight:600; color:var(--foreground); font-size:13px; }
                .val-warn { color:var(--danger); font-weight:600; }
                .val-ok { color:var(--foreground); font-weight:600; }
                .panel-hint { font-size:12px; color:var(--foreground-subtle); margin:12px 0 0; padding-top:10px; border-top:1px solid var(--border); }
            `}</style>
        </div>
    );
}

/* ── Sub-components ── */
function KpiCard({ label, value, sub, highlight }) {
    return (
        <div className={`kpi-card ${highlight || ''}`}>
            <div className="kpi-label">{label}</div>
            <div className="kpi-value">{value}</div>
            <div className="kpi-sub">{sub}</div>
            <style jsx>{`
                .kpi-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-md);
                    padding: 20px;
                    box-shadow: var(--shadow-sm);
                    transition: border-color 0.18s, box-shadow 0.18s;
                }
                .kpi-card:hover { border-color: var(--accent-light); box-shadow: var(--shadow); }
                .kpi-card.warn { border-color: rgba(245,158,11,0.35); }
                .kpi-card.bad  { border-color: rgba(239,68,68,0.35); }
                .kpi-label { font-size: 12px; font-weight: 600; color: var(--foreground-subtle); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
                .kpi-value { font-size: 26px; font-weight: 700; color: var(--foreground); margin-bottom: 4px; }
                .kpi-sub { font-size: 13px; color: var(--foreground-muted); }
            `}</style>
        </div>
    );
}

function Panel({ title, icon, count, action, children }) {
    return (
        <div className="panel">
            <div className="panel-head">
                <div className="panel-title-row">
                    <span className="panel-icon">{icon}</span>
                    <h3>{title}</h3>
                    {count != null && count > 0 && <span className="badge info">{count}</span>}
                </div>
                {action && <div className="panel-action">{action}</div>}
            </div>
            <div className="panel-body">{children}</div>
            <style jsx>{`
                .panel { background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); box-shadow:var(--shadow-sm); overflow:hidden; }
                .panel-head { display:flex; justify-content:space-between; align-items:center; padding:14px 18px; border-bottom:1px solid var(--border); background:#fafafa; }
                .panel-title-row { display:flex; align-items:center; gap:8px; }
                .panel-icon { font-size:18px; }
                .panel-head h3 { font-size:15px; color:var(--foreground); font-weight:600; }
                .badge { display:inline-flex; align-items:center; padding:2px 8px; border-radius:99px; font-size:11px; font-weight:700; background:var(--accent-light); color:var(--accent-dark); }
                .panel-body { padding:4px 18px 18px; }
            `}</style>
        </div>
    );
}

function StatRow({ label, value, warn }) {
    return (
        <div className="stat-row">
            <span className="stat-label">{label}</span>
            <span className={`stat-value ${warn ? 'warn' : ''}`}>{value}</span>
        </div>
    );
}
