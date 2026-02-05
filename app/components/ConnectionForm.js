"use client";

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function ConnectionForm({ onConnect }) {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        dbName: "", host: "", port: 5432, database: "", schema: "public",
        username: "", password: "", sslmode: "require", provider: "rds"
    });
    const [status, setStatus] = useState({ kind: "", title: "Ready", sub: "Fill in your connection details and click Test." });
    const [loading, setLoading] = useState(false);

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
                    <strong>Tip:</strong> Create a <code>read-only</code> role for maximum security. We only need SELECT on system catalogs.
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

            <style jsx>{`
                .conn-form-wrap { max-width: 720px; margin: 0 auto; }
                .conn-card {
                    background: var(--surface);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-lg);
                    padding: 32px;
                    box-shadow: var(--shadow-sm);
                }
                .conn-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:22px; }
                .conn-header h2 { font-size:20px; color:var(--foreground); }
                .pill { font-size:12px; font-weight:600; color:var(--foreground-muted); background:#f3f4f6; padding:4px 12px; border-radius:99px; }
                .pill.loading { color:var(--accent); background:var(--accent-light); }

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
