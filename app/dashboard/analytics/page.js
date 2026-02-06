"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function AdvancedAnalyticsPage() {
    const { user, getAuthHeaders } = useAuth();
    const [connections, setConnections] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [activeTab, setActiveTab] = useState('indexes');
    const [loading, setLoading] = useState(false);

    // Data states
    const [indexRecs, setIndexRecs] = useState([]);
    const [bloatData, setBloatData] = useState([]);
    const [queryTrends, setQueryTrends] = useState([]);
    const [connPoolData, setConnPoolData] = useState(null);
    const [vacuumRecs, setVacuumRecs] = useState([]);

    useEffect(() => {
        const fetchConns = async () => {
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

    useEffect(() => {
        if (selectedId && activeTab) {
            loadAnalytics();
        }
    }, [selectedId, activeTab]);

    const loadAnalytics = async () => {
        if (!selectedId) return;
        setLoading(true);

        try {
            const headers = getAuthHeaders();

            if (activeTab === 'indexes') {
                const res = await fetch(`${API}/api/analytics/index-recommendations?connectionId=${selectedId}`, { headers });
                if (res.ok) {
                    const data = await res.json();
                    setIndexRecs(data.recommendations || []);
                }
            } else if (activeTab === 'bloat') {
                const res = await fetch(`${API}/api/analytics/table-bloat-analysis?connectionId=${selectedId}`, { headers });
                if (res.ok) {
                    const data = await res.json();
                    setBloatData(data.bloat_analysis || []);
                }
            } else if (activeTab === 'queries') {
                const res = await fetch(`${API}/api/analytics/query-performance-trends?connectionId=${selectedId}`, { headers });
                if (res.ok) {
                    const data = await res.json();
                    setQueryTrends(data.query_trends || []);
                }
            } else if (activeTab === 'connections') {
                const res = await fetch(`${API}/api/analytics/connection-pool-analysis?connectionId=${selectedId}`, { headers });
                if (res.ok) {
                    const data = await res.json();
                    setConnPoolData(data);
                }
            } else if (activeTab === 'vacuum') {
                const res = await fetch(`${API}/api/analytics/vacuum-recommendations?connectionId=${selectedId}`, { headers });
                if (res.ok) {
                    const data = await res.json();
                    setVacuumRecs(data.vacuum_recommendations || []);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    const getBloatPriority = (percent) => {
        if (percent > 20) return 'critical';
        if (percent > 10) return 'high';
        return 'medium';
    };

    if (loading) {
        return <div className="loading-center">Loading...</div>;
    }

    if (connections.length === 0) {
        return (
            <div className="empty-state fade-in">
                <div className="empty-icon">🗄️</div>
                <h2>No databases connected</h2>
                <p>Connect your first PostgreSQL database to start using Advanced Analytics.</p>
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
        <div className="analytics-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Advanced Analytics</h1>
                    <p className="sub">Deep insights into your PostgreSQL performance and optimization opportunities</p>
                </div>
                <Link href="/dashboard" className="btn secondary">← Back to Dashboard</Link>
            </div>

            <div className="connection-selector">
                <label>Database:</label>
                <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                    {connections.map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.host})</option>
                    ))}
                </select>
            </div>

            <div className="tabs">
                <button className={activeTab === 'indexes' ? 'active' : ''} onClick={() => setActiveTab('indexes')}>
                    Index Recommendations
                </button>
                <button className={activeTab === 'bloat' ? 'active' : ''} onClick={() => setActiveTab('bloat')}>
                    Table Bloat Analysis
                </button>
                <button className={activeTab === 'queries' ? 'active' : ''} onClick={() => setActiveTab('queries')}>
                    Query Performance
                </button>
                <button className={activeTab === 'connections' ? 'active' : ''} onClick={() => setActiveTab('connections')}>
                    Connection Pool
                </button>
                <button className={activeTab === 'vacuum' ? 'active' : ''} onClick={() => setActiveTab('vacuum')}>
                    Vacuum Scheduler
                </button>
            </div>

            {loading ? (
                <div className="loading-state">Loading analytics...</div>
            ) : (
                <div className="tab-content">
                    {activeTab === 'indexes' && (
                        <div className="indexes-panel">
                            <h2>Missing Index Recommendations ({indexRecs.length})</h2>
                            {indexRecs.length === 0 ? (
                                <div className="empty-message">No index recommendations at this time. Your indexes look good!</div>
                            ) : (
                                <div className="recommendations-list">
                                    {indexRecs.map((rec, i) => (
                                        <div key={i} className="rec-card">
                                            <div className="rec-header">
                                                <span className="table-name">{rec.table_name}</span>
                                                <span className="column-badge">{rec.column_name}</span>
                                            </div>
                                            <p className="reason">{rec.reason}</p>
                                            <p className="benefit">{rec.estimated_benefit}</p>
                                            <div className="sql-block">
                                                <code>{rec.create_sql}</code>
                                                <button onClick={() => copyToClipboard(rec.create_sql)} className="copy-btn">Copy</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'bloat' && (
                        <div className="bloat-panel">
                            <h2>Table Bloat Analysis ({bloatData.length} tables)</h2>
                            {bloatData.length === 0 ? (
                                <div className="empty-message">No significant table bloat detected!</div>
                            ) : (
                                <div className="bloat-table">
                                    {bloatData.map((item, i) => (
                                        <div key={i} className={`bloat-row priority-${getBloatPriority(item.bloat_percent)}`}>
                                            <div className="bloat-info">
                                                <h3>{item.table_name}</h3>
                                                <div className="stats">
                                                    <span>Bloat: {item.bloat_percent}% ({item.bloat_size_mb} MB)</span>
                                                    <span>Total Size: {item.total_size_mb} MB</span>
                                                    <span>Dead: {item.dead_tuples.toLocaleString()} | Live: {item.live_tuples.toLocaleString()}</span>
                                                </div>
                                                <p className="recommendation">{item.recommendation}</p>
                                                <div className="vacuum-info">
                                                    <small>Last Vacuum: {item.last_vacuum}</small>
                                                    <small>Last Autovacuum: {item.last_autovacuum}</small>
                                                </div>
                                            </div>
                                            <div className="bloat-action">
                                                <code>{item.fix_sql}</code>
                                                <button onClick={() => copyToClipboard(item.fix_sql)} className="copy-btn">Copy SQL</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'queries' && (
                        <div className="queries-panel">
                            <h2>Query Performance Trends (Top {queryTrends.length})</h2>
                            {queryTrends.length === 0 ? (
                                <div className="empty-message">Enable pg_stat_statements extension to see query performance data.</div>
                            ) : (
                                <div className="query-trends-table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Query Sample</th>
                                                <th>Calls</th>
                                                <th>Total Time</th>
                                                <th>Mean Time</th>
                                                <th>Max Time</th>
                                                <th>Cache Hit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {queryTrends.map((q, i) => (
                                                <tr key={i} className={q.mean_time_ms > 1000 ? 'slow-query' : ''}>
                                                    <td><code className="query-sample">{q.query_sample}...</code></td>
                                                    <td>{q.calls.toLocaleString()}</td>
                                                    <td>{q.total_time_ms.toFixed(2)} ms</td>
                                                    <td>{q.mean_time_ms.toFixed(2)} ms</td>
                                                    <td>{q.max_time_ms.toFixed(2)} ms</td>
                                                    <td>
                                                        <span className={`cache-badge ${q.cache_hit_ratio > 90 ? 'good' : 'warn'}`}>
                                                            {q.cache_hit_ratio.toFixed(1)}%
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'connections' && connPoolData && (
                        <div className="connections-panel">
                            <h2>Connection Pool Analysis</h2>
                            <div className="pool-stats-grid">
                                <div className="stat-card">
                                    <label>Total Connections</label>
                                    <div className="stat-value">{connPoolData.pool_stats.current_connections} / {connPoolData.pool_stats.max_connections}</div>
                                    <div className={`usage-bar ${connPoolData.usage_percent > 80 ? 'critical' : connPoolData.usage_percent > 60 ? 'warn' : 'good'}`}>
                                        <div className="fill" style={{width: `${connPoolData.usage_percent}%`}}></div>
                                    </div>
                                    <small>{connPoolData.usage_percent}% capacity</small>
                                </div>
                                <div className="stat-card">
                                    <label>Active</label>
                                    <div className="stat-value">{connPoolData.pool_stats.active_connections}</div>
                                </div>
                                <div className="stat-card">
                                    <label>Idle</label>
                                    <div className="stat-value">{connPoolData.pool_stats.idle_connections}</div>
                                </div>
                                <div className="stat-card">
                                    <label>Idle in Transaction</label>
                                    <div className="stat-value warn">{connPoolData.pool_stats.idle_in_transaction}</div>
                                </div>
                                <div className="stat-card">
                                    <label>Waiting (Locks)</label>
                                    <div className="stat-value warn">{connPoolData.pool_stats.waiting_connections}</div>
                                </div>
                            </div>

                            {connPoolData.recommendations && connPoolData.recommendations.length > 0 && (
                                <div className="recommendations-box">
                                    <h3>Recommendations</h3>
                                    {connPoolData.recommendations.map((rec, i) => (
                                        <div key={i} className="recommendation-item">{rec}</div>
                                    ))}
                                </div>
                            )}

                            <h3>Connections by Application</h3>
                            <div className="app-connections-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Application</th>
                                            <th>Total</th>
                                            <th>Active</th>
                                            <th>Idle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {connPoolData.connections_by_app.map((app, i) => (
                                            <tr key={i}>
                                                <td>{app.application_name || '(unknown)'}</td>
                                                <td>{app.connection_count}</td>
                                                <td>{app.active}</td>
                                                <td>{app.idle}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'vacuum' && (
                        <div className="vacuum-panel">
                            <h2>Vacuum & Analyze Recommendations ({vacuumRecs.length})</h2>
                            {vacuumRecs.length === 0 ? (
                                <div className="empty-message">All tables are properly maintained. No vacuum needed!</div>
                            ) : (
                                <div className="vacuum-recs-list">
                                    {vacuumRecs.map((rec, i) => (
                                        <div key={i} className={`vacuum-card priority-${rec.priority.toLowerCase()}`}>
                                            <div className="vacuum-header">
                                                <h3>{rec.table_name}</h3>
                                                <span className={`priority-badge ${rec.priority.toLowerCase()}`}>{rec.priority}</span>
                                            </div>
                                            <div className="vacuum-stats">
                                                <span>Dead Ratio: {rec.dead_ratio_percent}%</span>
                                                <span>Dead Tuples: {rec.dead_tuples.toLocaleString()}</span>
                                                <span>Mods Since Analyze: {rec.mods_since_analyze.toLocaleString()}</span>
                                            </div>
                                            <div className="vacuum-history">
                                                <small>Last Vacuum: {rec.last_vacuum}</small>
                                                <small>Last Analyze: {rec.last_analyze}</small>
                                            </div>
                                            <div className="vacuum-actions">
                                                <strong>Recommended:</strong>
                                                {rec.recommended_actions.map((action, j) => (
                                                    <div key={j} className="action-item">{action}</div>
                                                ))}
                                            </div>
                                            <div className="sql-block">
                                                <code>{rec.sql}</code>
                                                <button onClick={() => copyToClipboard(rec.sql)} className="copy-btn">Copy SQL</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <style jsx>{`
                .analytics-page { padding: 24px; max-width: 1400px; margin: 0 auto; }
                .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
                h1 { font-size: 28px; margin-bottom: 6px; }
                .sub { color: var(--foreground-muted); font-size: 14px; }

                .connection-selector { margin-bottom: 24px; }
                .connection-selector label { display: inline-block; margin-right: 12px; font-weight: 600; }
                .connection-selector select { padding: 8px 12px; border: 1px solid var(--border); border-radius: var(--radius); background: var(--surface); color: var(--foreground); }

                .tabs { display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 2px solid var(--border); }
                .tabs button { padding: 12px 20px; background: none; border: none; color: var(--foreground-muted); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all 0.2s; }
                .tabs button:hover { color: var(--foreground); }
                .tabs button.active { color: var(--accent); border-bottom-color: var(--accent); font-weight: 600; }

                .loading-state { text-align: center; padding: 60px; color: var(--foreground-muted); }
                .empty-message { text-align: center; padding: 40px; color: var(--foreground-muted); background: var(--surface); border-radius: var(--radius); }

                .rec-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; margin-bottom: 12px; }
                .rec-header { display: flex; gap: 12px; align-items: center; margin-bottom: 8px; }
                .table-name { font-weight: 600; color: var(--foreground); }
                .column-badge { background: var(--accent-glow); color: var(--accent); padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
                .reason { color: var(--foreground-muted); font-size: 14px; margin: 8px 0; }
                .benefit { color: var(--success); font-size: 13px; font-weight: 500; }
                .sql-block { background: var(--background); padding: 12px; border-radius: var(--radius); margin-top: 12px; display: flex; justify-content: space-between; align-items: center; }
                .sql-block code { font-family: var(--font-mono); font-size: 13px; color: var(--foreground); }
                .copy-btn { padding: 6px 12px; background: var(--accent); color: white; border: none; border-radius: var(--radius); cursor: pointer; font-size: 12px; }
                .copy-btn:hover { opacity: 0.9; }

                .bloat-row { background: var(--surface); border-left: 4px solid var(--border); padding: 16px; margin-bottom: 12px; border-radius: var(--radius); }
                .bloat-row.priority-critical { border-left-color: var(--danger); }
                .bloat-row.priority-high { border-left-color: var(--warning); }
                .bloat-row h3 { margin-bottom: 8px; }
                .stats { display: flex; gap: 16px; margin: 8px 0; font-size: 13px; color: var(--foreground-muted); }
                .stats span { background: var(--background); padding: 4px 10px; border-radius: var(--radius); }
                .vacuum-info { display: flex; gap: 16px; margin-top: 8px; }
                .vacuum-info small { color: var(--foreground-subtle); }
                .bloat-action { margin-top: 12px; }

                .query-trends-table { overflow-x: auto; }
                table { width: 100%; border-collapse: collapse; background: var(--surface); border-radius: var(--radius); overflow: hidden; }
                th, td { padding: 12px; text-align: left; border-bottom: 1px solid var(--border); }
                th { background: var(--background); font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
                .query-sample { font-size: 12px; max-width: 300px; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .slow-query { background: rgba(239, 68, 68, 0.05); }
                .cache-badge { padding: 4px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; }
                .cache-badge.good { background: var(--success-bg); color: var(--success); }
                .cache-badge.warn { background: var(--warning-bg); color: var(--warning); }

                .pool-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
                .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; }
                .stat-card label { display: block; font-size: 12px; color: var(--foreground-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
                .stat-value { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
                .stat-value.warn { color: var(--warning); }
                .usage-bar { height: 8px; background: var(--border); border-radius: 999px; overflow: hidden; margin: 8px 0; }
                .usage-bar .fill { height: 100%; background: var(--accent); transition: width 0.3s; }
                .usage-bar.critical .fill { background: var(--danger); }
                .usage-bar.warn .fill { background: var(--warning); }

                .recommendations-box { background: var(--accent-glow); border: 1px solid var(--accent); border-radius: var(--radius); padding: 16px; margin: 24px 0; }
                .recommendations-box h3 { margin-bottom: 12px; }
                .recommendation-item { padding: 8px 0; font-size: 14px; }

                .vacuum-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 16px; margin-bottom: 12px; }
                .vacuum-card.priority-critical { border-left: 4px solid var(--danger); }
                .vacuum-card.priority-high { border-left: 4px solid var(--warning); }
                .vacuum-card.priority-medium { border-left: 4px solid var(--accent); }
                .vacuum-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .priority-badge { padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 700; }
                .priority-badge.critical { background: var(--danger-bg); color: var(--danger); }
                .priority-badge.high { background: var(--warning-bg); color: var(--warning); }
                .priority-badge.medium { background: var(--accent-glow); color: var(--accent); }
                .vacuum-stats { display: flex; gap: 16px; margin: 8px 0; font-size: 13px; }
                .vacuum-stats span { background: var(--background); padding: 4px 10px; border-radius: var(--radius); }
                .vacuum-history { display: flex; gap: 16px; margin: 8px 0; }
                .vacuum-actions { margin: 12px 0; padding: 12px; background: var(--background); border-radius: var(--radius); }
                .vacuum-actions strong { display: block; margin-bottom: 8px; }
                .action-item { padding: 4px 0; font-size: 14px; color: var(--foreground-muted); }
            `}</style>
        </div>
    );
}
