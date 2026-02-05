"use client";

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function SettingsPage() {
    const { user } = useAuth();
    const [emailAlerts, setEmailAlerts] = useState(true);
    const [weeklyReport, setWeeklyReport] = useState(true);
    const [connThreshold, setConnThreshold] = useState(90);
    const [bloatThreshold, setBloatThreshold] = useState(100000);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="settings-page fade-in">
            <div className="page-header">
                <h1>Settings</h1>
                <p className="sub">Manage your notifications and alert preferences.</p>
            </div>

            <div className="settings-card">
                <h2>Account</h2>
                <div className="account-info">
                    <img src={user?.avatar} alt="Avatar" className="avatar" />
                    <div>
                        <div className="acc-name">{user?.name || 'User'}</div>
                        <div className="acc-email">{user?.email}</div>
                    </div>
                </div>
            </div>

            <div className="settings-card">
                <h2>Notifications</h2>
                <div className="toggle-row">
                    <div className="toggle-info">
                        <strong>Email Alerts</strong>
                        <p>Receive email notifications when critical or warning alerts fire.</p>
                    </div>
                    <div className={`toggle ${emailAlerts ? 'on' : ''}`} onClick={() => setEmailAlerts(!emailAlerts)}>
                        <div className="toggle-knob"></div>
                    </div>
                </div>
                <div className="toggle-row">
                    <div className="toggle-info">
                        <strong>Weekly Health Report</strong>
                        <p>Get a weekly summary of your database health every Monday.</p>
                    </div>
                    <div className={`toggle ${weeklyReport ? 'on' : ''}`} onClick={() => setWeeklyReport(!weeklyReport)}>
                        <div className="toggle-knob"></div>
                    </div>
                </div>
            </div>

            <div className="settings-card">
                <h2>Alert Thresholds</h2>
                <div className="threshold-row">
                    <label>Connection Usage Warning (%)</label>
                    <div className="threshold-input">
                        <input type="range" min="50" max="99" value={connThreshold} onChange={e => setConnThreshold(Number(e.target.value))} />
                        <span className="threshold-val">{connThreshold}%</span>
                    </div>
                    <p className="hint">Alert when connections exceed this % of max_connections.</p>
                </div>
                <div className="threshold-row">
                    <label>Dead Tuples Warning Threshold</label>
                    <div className="threshold-input">
                        <input type="number" min="1000" step="10000" value={bloatThreshold} onChange={e => setBloatThreshold(Number(e.target.value))} className="num-input" />
                    </div>
                    <p className="hint">Alert when cumulative dead tuples exceed this count.</p>
                </div>
            </div>

            <div className="save-row">
                <button className="btn primary" onClick={handleSave}>Save Settings</button>
                {saved && <span className="saved-msg">Saved</span>}
            </div>

            <style jsx>{`
                .settings-page { max-width: 680px; }
                .page-header { margin-bottom: 32px; }
                h1 { font-size: 24px; color: var(--foreground); margin-bottom: 4px; }
                .sub { color: var(--foreground-muted); font-size: 14px; }

                .settings-card {
                    background: var(--surface); border: 1px solid var(--border);
                    border-radius: var(--radius-md); padding: 28px;
                    box-shadow: var(--shadow-sm); margin-bottom: 20px;
                }
                .settings-card h2 { font-size: 17px; color: var(--foreground); margin-bottom: 18px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }

                .account-info { display: flex; align-items: center; gap: 16px; }
                .avatar { width: 48px; height: 48px; border-radius: 50%; border: 2px solid var(--border); object-fit: cover; }
                .acc-name { font-weight: 600; font-size: 15px; color: var(--foreground); }
                .acc-email { font-size: 14px; color: var(--foreground-muted); }

                .toggle-row { display: flex; justify-content: space-between; align-items: flex-start; padding: 16px 0; border-bottom: 1px solid var(--border); }
                .toggle-row:last-child { border-bottom: none; }
                .toggle-info { flex: 1; margin-right: 24px; }
                .toggle-info strong { font-size: 14px; color: var(--foreground); display: block; margin-bottom: 4px; }
                .toggle-info p { font-size: 13px; color: var(--foreground-muted); margin: 0; line-height: 1.5; }

                .toggle { width: 44px; height: 24px; background: var(--border); border-radius: 12px; position: relative; cursor: pointer; flex-shrink: 0; transition: background 0.2s; }
                .toggle.on { background: var(--accent); }
                .toggle-knob { width: 18px; height: 18px; background: #fff; border-radius: 50%; position: absolute; top: 3px; left: 3px; transition: left 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
                .toggle.on .toggle-knob { left: 23px; }

                .threshold-row { margin-bottom: 20px; }
                .threshold-row label { display: block; font-size: 13px; font-weight: 600; color: var(--foreground-muted); margin-bottom: 8px; }
                .threshold-input { display: flex; align-items: center; gap: 14px; }
                .threshold-input input[type="range"] { flex: 1; accent-color: var(--accent); }
                .threshold-val { font-weight: 700; font-size: 15px; color: var(--accent); min-width: 44px; text-align: right; }
                .num-input { width: 140px; padding: 8px 12px; border: 1.5px solid var(--border); border-radius: var(--radius); font-size: 14px; color: var(--foreground); }
                .num-input:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
                .hint { font-size: 12px; color: var(--foreground-subtle); margin-top: 6px; }

                .save-row { display: flex; align-items: center; gap: 16px; margin-top: 8px; }
                .saved-msg { font-size: 14px; color: var(--success); font-weight: 600; }
            `}</style>
        </div>
    );
}
