import React, { useState } from 'react';
import { babyProfile as defaultBaby, reactionOptions, historyData, EXCEPTION_OPTIONS } from '../data/mockData.js';
import { Edit2, Check, AlertCircle } from 'lucide-react';
import './Profile.css';

export default function Profile({ baby, onUpdate }) {
  const profile = baby || defaultBaby;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...profile });

  const totalHistory = historyData.length;
  const sukaCnt = historyData.filter(h => h.reaction === 'suka').length;

  const toggleException = (item) => {
    setForm(f => ({
      ...f,
      exceptions: f.exceptions?.includes(item)
        ? f.exceptions.filter(e => e !== item)
        : [...(f.exceptions || []), item],
    }));
  };

  const handleSave = () => {
    onUpdate(form);
    setEditing(false);
  };

  return (
    <div className="page prof-page">
      <div className="page-header">
        <h1>Profil Anak</h1>
      </div>

      {/* Avatar + name */}
      <div className="section">
        <div className="prof-hero-card">
          <div className="prof-avatar">
            <span>👶</span>
          </div>
          <div className="prof-hero-info">
            <h2 className="prof-name">{profile.name || 'Bayi'}</h2>
            <p className="prof-age">{profile.ageMonths} bulan</p>
            <div className="prof-badges">
              <span className="chip">Usia {profile.ageMonths} bulan</span>
            </div>
          </div>
          <button
            className="prof-edit-btn"
            onClick={() => setEditing(!editing)}
            id="btn-edit-profile"
          >
            {editing ? <Check size={18} /> : <Edit2 size={18} />}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="section">
        <div className="prof-stats-row">
          <div className="prof-stat-card">
            <span className="prof-stat-num">{totalHistory}</span>
            <span className="prof-stat-label">Total makan</span>
          </div>
          <div className="prof-stat-card">
            <span className="prof-stat-num" style={{ color: 'var(--lime)' }}>{sukaCnt}</span>
            <span className="prof-stat-label">Suka makan</span>
          </div>
          <div className="prof-stat-card">
            <span className="prof-stat-num" style={{ color: 'var(--orange)' }}>
              {totalHistory > 0 ? Math.round((sukaCnt / totalHistory) * 100) : 0}%
            </span>
            <span className="prof-stat-label">Tingkat suka</span>
          </div>
        </div>
      </div>

      {/* Edit form */}
      {editing ? (
        <div className="section fade-in">
          <h2 className="section-title">Edit Profil</h2>
          <div className="card">
            <div className="prof-field">
              <label className="prof-label">Nama Bayi</label>
              <input className="ob-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} id="edit-name" />
            </div>
            <div className="divider" />
            <div className="prof-field">
              <label className="prof-label">Usia (bulan)</label>
              <input className="ob-input" type="number" min={6} max={12} value={form.ageMonths} onChange={e => setForm(f => ({ ...f, ageMonths: Number(e.target.value) }))} id="edit-age" />
            </div>
          </div>

          {/* Exceptions */}
          <h2 className="section-title" style={{ marginTop: 20 }}>Alergi & Pantangan</h2>
          <div className="ob-except-grid">
            {EXCEPTION_OPTIONS.map(item => {
              const sel = form.exceptions?.includes(item);
              return (
                <button
                  key={item}
                  id={`edit-except-${item}`}
                  className={`ob-except-btn ${sel ? 'selected' : ''}`}
                  onClick={() => toggleException(item)}
                >
                  {sel && <Check size={14} />} {item}
                </button>
              );
            })}
          </div>

          <button className="btn btn-primary btn-full" style={{ marginTop: 16 }} onClick={handleSave} id="btn-save-profile">
            Simpan Perubahan
          </button>
        </div>
      ) : (
        <>
          {/* Read-only info */}
          <div className="section">
            <h2 className="section-title">Informasi</h2>
            <div className="card">
              {[
                { label: 'Nama', val: profile.name },
                { label: 'Usia', val: `${profile.ageMonths} bulan` },
              ].map(({ label, val }, i) => (
                <div key={label}>
                  <div className="prof-info-row">
                    <span className="prof-info-label">{label}</span>
                    <span className="prof-info-val">{val}</span>
                  </div>
                  {i < 1 && <div className="divider" style={{ margin: '8px 0' }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Exceptions */}
          {profile.exceptions?.length > 0 && (
            <div className="section">
              <h2 className="section-title">Alergi & Pantangan</h2>
              <div className="prof-exceptions">
                {profile.exceptions.map(e => (
                  <span key={e} className="chip" style={{ background: '#FFF0E3', color: '#E67422' }}>
                    <AlertCircle size={12} /> {e}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* About */}
      <div className="section">
        <div className="prof-about-card">
          <span className="prof-about-icon">🌿</span>
          <div>
            <h3>Tentang Pendasi</h3>
            <p>Aplikasi panduan MPASI untuk bayi usia 6–12 bulan. Rekomendasi menu bergizi sesuai usia si Kecil.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
