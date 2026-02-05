"use client";

import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function DashboardStatsPage() {
  const [connections, setConnections] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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
      finally { setLoading(false); }
    };
    if (user) fetchConns();
  }, [user]);

  useEffect(() => {
    if (!selectedId) return;
    const fetchReport = async () => {
      try {
        const res = await fetch(`${API}/api/report/latest?connectionId=${selectedId}`);
        if (res.ok) {
          const data = await res.json();
          setReport(data);
        }
      } catch (e) { console.error(e); }
    };
    fetchReport();
  }, [selectedId]);

  const handleRefresh = async () => {
    setReport(null);
    try {
      const res = await fetch(`${API}/api/report/refresh?connectionId=${selectedId}`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setReport(data);
      } else {
        const fallback = await fetch(`${API}/api/report/latest?connectionId=${selectedId}`);
        if (fallback.ok) setReport(await fallback.json());
      }
    } catch (e) { console.error(e); }
  };

  if (loading) return <div className="loading-center">Loading…</div>;

  if (connections.length === 0) {
    return (
      <div className="empty-dashboard fade-in">
        <div className="empty-icon">🗄️</div>
        <h2>No databases connected</h2>
        <p>Connect your first PostgreSQL database to start monitoring.</p>
        <Link href="/dashboard/databases" className="btn primary">Connect Database</Link>
        <style jsx>{`
          .empty-dashboard { text-align: center; padding: 100px 24px; }
          .empty-icon { font-size: 48px; margin-bottom: 20px; }
          h2 { margin-bottom: 10px; }
          p { color: var(--foreground-muted); margin-bottom: 24px; font-size: 15px; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-view fade-in">
      <div className="toolbar">
        <div className="selector">
          <label>Viewing</label>
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {connections.map(c => (
              <option key={c.id} value={c.id}>{c.name} — {c.host}</option>
            ))}
          </select>
        </div>
      </div>

      <Dashboard report={report} onRefresh={handleRefresh} connectionId={selectedId} />

      <style jsx>{`
        .loading-center { text-align: center; padding: 60px; color: var(--foreground-muted); }
        .toolbar {
            display: flex;
            align-items: center;
            margin-bottom: 28px;
        }
        .selector { display: flex; align-items: center; gap: 14px; }
        .selector label { font-size: 14px; color: var(--foreground-muted); font-weight: 600; }
        .selector select {
            background: var(--surface);
            border: 1.5px solid var(--border);
            color: var(--foreground);
            padding: 9px 36px 9px 14px;
            border-radius: var(--radius);
            font-size: 14px;
            min-width: 260px;
            appearance: none;
            -webkit-appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 12px center;
            cursor: pointer;
        }
        .selector select:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px var(--accent-glow);
        }
      `}</style>
    </div>
  );
}
