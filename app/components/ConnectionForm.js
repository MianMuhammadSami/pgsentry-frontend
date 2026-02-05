"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const SETUP_SQL = `-- 1. Create a dedicated user for pgSentry (choose a strong password)
CREATE USER pgsentry_monitor WITH PASSWORD 'your_secure_password';

-- 2. Grant the built-in monitoring role (PostgreSQL 10+)
--    This allows reading pg_stat_activity, pg_stat_*, and related views
GRANT pg_monitor TO pgsentry_monitor;

-- 3. Allow the user to connect to your database
GRANT CONNECT ON DATABASE your_database_name TO pgsentry_monitor;

-- 4. Optional: if you use pg_stat_statements for query analysis
--    Ensure the extension exists, then grant execute on the view
-- GRANT EXECUTE ON FUNCTION pg_stat_statements_reset() TO pgsentry_monitor;`;

export default function ConnectionForm({ onConnect }) {
    const { user } = useAuth();
    const [whitelistIps, setWhitelistIps] = useState([]);
    const [formData, setFormData] = useState({
        dbName: "", host: "", port: 5432, database: "", schema: "public",
        username: "", password: "", sslmode: "require", provider: "rds"
    });
    const [status, setStatus] = useState({ kind: "", title: "Ready", sub: "Fill in your connection details and click Test." });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(`${API}/api/whitelist-ips`);
                const data = await res.json();
                if (!cancelled && Array.isArray(data.ips)) setWhitelistIps(data.ips);
            } catch (_) {}
        })();
        return () => { cancelled = true; };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTest = async () => {
        setLoading(true);
        setStatus({ kind: "", title: "Testing…", sub: "Connecting to your database…" });
        try {
            const res = await fetch(`${API}/api/db/test`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) setStatus({ kind: "good", title: "Connection successful", sub: data.message });
            else setStatus({ kind: "bad", title: "Connection failed", sub: data.message });
        } catch (e) {
            setStatus({ kind: "bad", title: "Network error", sub: e.message });
        } finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ kind: "", title: "Saving…", sub: "Validating and storing connection…" });
        try {
            const res = await fetch(`${API}/api/db/connect`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Auth-User': user?.id || '' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                setStatus({ kind: "good", title: "Saved!", sub: "Redirecting to dashboard…" });
                if (onConnect) onConnect(data.connection_id);
            } else {
                setStatus({ kind: "bad", title: "Save failed", sub: data.message });
            }
        } catch (e) {
            setStatus({ kind: "bad", title: "Network error", sub: e.message });
        } finally { setLoading(false); }
    };

    return (
        <div className="conn-form-wrap">

            <div className="conn-card">
                <div className="conn-header">
                    <h2>Connect PostgreSQL</h2>
                    <span className={`pill ${loading ? 'loading' : ''}`}>{loading ? 'Working…' : 'Not connected'}</span>
                </div>

                <div className="callout">
                    <strong>Tip:</strong> Use the user created in the steps (e.g. <code>pgsentry_monitor</code>) in the form. We only need read-only access to system catalogs and stats.
                </div>

                <form onSubmit={handleSubmit} className="form-grid">
                    <Field label="Connection name" name="dbName" value={formData.dbName} onChange={handleChange} placeholder="e.g. Prod RDS (read-only)" required maxLength="40" />

                    <div className="row">
                        <Field label="Host" name="host" value={formData.host} onChange={handleChange} placeholder="db.example.com" required />
                        <Field label="Port" name="port" type="number" value={formData.port} onChange={handleChange} min="1" max="65535" required style={{ maxWidth: 110 }} />
                    </div>

                    <div className="row">
                        <Field label="Database" name="database" value={formData.database} onChange={handleChange} placeholder="postgres" required />
                        <Field label="Schema (optional)" name="schema" value={formData.schema} onChange={handleChange} placeholder="public" />
                    </div>

                    <div className="row">
                        <Field label="Username" name="username" value={formData.username} onChange={handleChange} placeholder="readonly_user" required />
                        <Field label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required />
                    </div>

                    <div className="row">
                        <SelectField label="TLS / SSL" name="sslmode" value={formData.sslmode} onChange={handleChange} options={[
                            { value: 'require', label: 'require (recommended)' },
                            { value: 'prefer',  label: 'prefer' },
                            { value: 'disable', label: 'disable' },
                        ]} />
                        <SelectField label="Provider" name="provider" value={formData.provider} onChange={handleChange} options={[
                            { value: 'rds',       label: 'AWS RDS / Aurora' },
                            { value: 'supabase',  label: 'Supabase' },
                            { value: 'neon',      label: 'Neon' },
                            { value: 'cloud_sql', label: 'GCP Cloud SQL' },
                            { value: 'other',     label: 'Self-hosted / Other' },
                        ]} />
                    </div>

                    {/* Status box */}
                    <div className={`status-box ${status.kind}`}>
                        <span className={`status-dot ${status.kind}`}></span>
                        <div>
                            <div className="status-title">{status.title}</div>
                            <div className="status-sub">{status.sub}</div>
                        </div>
                    </div>

                    <div className="actions">
                        <button className="btn secondary" type="button" onClick={handleTest} disabled={loading}>Test Connection</button>
                        <button className="btn primary" type="submit" disabled={loading}>Save & Open Dashboard</button>
                    </div>
                </form>
            </div>

            <div className="setup-guide">
                <h3 className="setup-title">Setup steps</h3>
                <p className="setup-intro">Follow these steps on your PostgreSQL server, then use the credentials in the form.</p>

                <div className="setup-step">
                    <strong>1. Whitelist our IPs</strong>
                    <p>You must allow connections from pgSentry's IPs in your firewall or security group (e.g. RDS, Cloud SQL, or <code>pg_hba.conf</code>).</p>
                    {whitelistIps.length > 0 ? (
                        <div className="ip-list">
                            <span className="ip-list-label">Whitelist these IPs:</span>
                            <ul>
                                {whitelistIps.map((ip) => (
                                    <li key={ip}><code>{ip}</code></li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="ip-list-fallback">IP list is loading… or contact us for current IPs.</p>
                    )}
                </div>

                <div className="setup-step">
                    <strong>2. Create a read-only monitoring user</strong>
                    <p>Run the following SQL as a superuser (e.g. <code>postgres</code>). Replace <code>your_secure_password</code> and <code>your_database_name</code> with your values.</p>
                    <pre className="setup-sql"><code>{SETUP_SQL}</code></pre>
                </div>
            </div>

            <style jsx>{`
                .conn-form-wrap {
                    display: grid;
                    grid-template-columns: 1.15fr 0.85fr;
                    gap: 28px;
                    max-width: 1280px;
                    margin: 0 auto;
                    align-items: start;
                }
                @media (max-width: 900px) {
                    .conn-form-wrap { grid-template-columns: 1fr; }
                }
                .conn-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    padding: 36px 40px;
                    box-shadow: var(--shadow-sm);
                }
                .conn-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:22px; }
                .conn-header h2 { font-size:20px; color:var(--foreground); }
                .pill { font-size:12px; font-weight:600; color:var(--foreground-muted); background:#f3f4f6; padding:4px 12px; border-radius:99px; }
                .pill.loading { color:var(--accent); background:var(--accent-light); }

                .setup-guide {
                    background:#f8fafc;
                    border:1px solid var(--border);
                    border-radius:var(--radius-lg);
                    padding:20px 24px;
                }
                .setup-title { font-size:16px; color:var(--foreground); margin:0 0 6px 0; }
                .setup-intro { font-size:13px; color:var(--foreground-muted); margin:0 0 16px 0; }
                .setup-step { margin-bottom:18px; }
                .setup-step:last-child { margin-bottom:0; }
                .setup-step strong { display:block; font-size:13px; color:var(--foreground); margin-bottom:6px; }
                .setup-step p { font-size:13px; color:var(--foreground-muted); margin:0 0 8px 0; line-height:1.45; }
                .setup-step code { background:#e2e8f0; padding:2px 6px; border-radius:4px; font-size:12px; }
                .ip-list { margin-top:8px; }
                .ip-list-label { font-size:12px; font-weight:600; color:var(--foreground-muted); }
                .ip-list ul { margin:6px 0 0 0; padding-left:20px; }
                .ip-list li { font-size:13px; margin-bottom:4px; }
                .ip-list li code { background:#e2e8f0; padding:2px 8px; border-radius:4px; }
                .ip-list-fallback { font-size:12px; color:var(--foreground-subtle); font-style:italic; margin-top:6px !important; }
                .setup-sql {
                    display:block; margin:0; padding:14px 16px; overflow-x:auto;
                    background:#1e293b; color:#e2e8f0; border-radius:var(--radius);
                    font-size:12px; line-height:1.5; font-family:ui-monospace, monospace;
                }
                .setup-sql code { background:transparent; padding:0; color:inherit; }

                .callout {
                    background:var(--accent-light);
                    border-left:3px solid var(--accent);
                    padding:12px 16px;
                    border-radius:0 var(--radius) var(--radius) 0;
                    font-size:13px;
                    color:var(--accent-dark);
                    margin-bottom:24px;
                }
                .callout code { background:rgba(59,130,246,0.12); padding:2px 6px; border-radius:4px; font-size:12px; }

                .form-grid { display:flex; flex-direction:column; gap:18px; }
                .row { display:flex; gap:16px; }
                .row > * { flex:1; min-width:0; }

                .status-box {
                    display:flex; align-items:center; gap:12px;
                    padding:14px 16px; border-radius:var(--radius);
                    background:#f9fafb; border:1px solid var(--border);
                    transition:background 0.2s, border-color 0.2s;
                }
                .status-box.good  { background:var(--success-bg); border-color:rgba(16,185,129,0.3); }
                .status-box.bad   { background:var(--danger-bg);  border-color:rgba(239,68,68,0.3); }
                .status-dot { width:10px; height:10px; border-radius:50%; background:var(--border); flex-shrink:0; }
                .status-dot.good { background:var(--success); }
                .status-dot.bad  { background:var(--danger); }
                .status-title { font-weight:600; font-size:14px; color:var(--foreground); }
                .status-sub { font-size:13px; color:var(--foreground-muted); }

                .actions { display:flex; gap:12px; margin-top:4px; }
                @media(max-width:580px) {
                    .row { flex-direction:column; }
                    .actions { flex-direction:column; }
                }
            `}</style>
        </div>
    );
}

/* Mini field helpers */
function Field({ label, style, ...props }) {
    return (
        <div className="field" style={style}>
            <label>{label}</label>
            <input {...props} />
            <style jsx>{`
                .field label { display:block; margin-bottom:6px; font-size:13px; font-weight:600; color:var(--foreground-muted); }
                .field input {
                    width:100%; padding:10px 14px;
                    border:1.5px solid var(--border); border-radius:var(--radius);
                    font-size:14px; color:var(--foreground); background:var(--surface);
                    transition:border-color 0.18s, box-shadow 0.18s;
                }
                .field input::placeholder { color:var(--foreground-subtle); }
                .field input:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow); }
            `}</style>
        </div>
    );
}

function SelectField({ label, options, ...props }) {
    return (
        <div className="sfield">
            <label>{label}</label>
            <select {...props}>
                {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <style jsx>{`
                .sfield label { display:block; margin-bottom:6px; font-size:13px; font-weight:600; color:var(--foreground-muted); }
                .sfield select {
                    width:100%; padding:10px 36px 10px 14px;
                    border:1.5px solid var(--border); border-radius:var(--radius);
                    font-size:14px; color:var(--foreground); background:var(--surface);
                    appearance:none; -webkit-appearance:none;
                    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
                    background-repeat:no-repeat; background-position:right 12px center;
                    transition:border-color 0.18s, box-shadow 0.18s; cursor:pointer;
                }
                .sfield select:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-glow); }
            `}</style>
        </div>
    );
}
