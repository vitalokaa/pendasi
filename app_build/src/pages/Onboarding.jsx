import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { EXCEPTION_OPTIONS } from '../data/mockData.js';
import './Onboarding.css';

function calcAgeMonths(dob) {
  if (!dob) return null;
  const birth = new Date(dob);
  const now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  return Math.max(0, months);
}

export default function Onboarding({ onComplete }) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [exceptions, setExceptions] = useState([]);
  const [errors, setErrors] = useState({});

  const toggleException = (item) => {
    setExceptions((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const ageMonths = calcAgeMonths(dob);
  const ageValid = ageMonths !== null && ageMonths >= 6 && ageMonths <= 12;

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Nama bayi wajib diisi';
    if (!dob) e.dob = 'Tanggal lahir wajib diisi';
    else if (!ageValid) e.dob = 'Usia bayi harus antara 6–12 bulan';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onComplete({ name: name.trim(), ageMonths, birthDate: dob, exceptions });
  };

  return (
    <div className="onboarding">
      <div className="ob-blob ob-blob1" />
      <div className="ob-blob ob-blob2" />

      <div className="ob-content fade-in">
        <div className="ob-step">
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div className="ob-step-icon">👶</div>
            <h1 className="ob-step-title" style={{ fontSize: 24 }}>Profil Si Kecil</h1>
            <p className="ob-step-desc">Isi informasi bayi untuk memulai perjalanan MPASI</p>
          </div>

          {/* Name */}
          <div className="ob-field" style={{ marginBottom: 20 }}>
            <label className="ob-label">Nama Bayi <span style={{ color: 'var(--orange)' }}>*</span></label>
            <input
              id="input-baby-name"
              className={`ob-input ${errors.name ? 'ob-input-error' : ''}`}
              type="text"
              placeholder="Contoh: Aisha"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
              autoFocus
            />
            {errors.name && <p className="ob-error">{errors.name}</p>}
          </div>

          {/* Date of Birth */}
          <div className="ob-field" style={{ marginBottom: 20 }}>
            <label className="ob-label">Tanggal Lahir <span style={{ color: 'var(--orange)' }}>*</span></label>
            <input
              id="input-baby-dob"
              className={`ob-input ${errors.dob ? 'ob-input-error' : ''}`}
              type="date"
              value={dob}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => { setDob(e.target.value); setErrors((prev) => ({ ...prev, dob: undefined })); }}
            />
            {dob && ageMonths !== null && (
              <p className="ob-hint" style={{ color: ageValid ? 'var(--green)' : 'var(--orange)', marginTop: 6 }}>
                {ageValid ? `✅ Usia: ${ageMonths} bulan — siap MPASI!` : `⚠️ Usia ${ageMonths} bulan — MPASI untuk 6–12 bulan`}
              </p>
            )}
            {errors.dob && <p className="ob-error">{errors.dob}</p>}
          </div>

          {/* Allergies */}
          <div className="ob-field" style={{ marginBottom: 32 }}>
            <label className="ob-label">Alergi & Pantangan <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(opsional)</span></label>
            <p className="ob-step-desc" style={{ marginBottom: 12 }}>Pilih bahan yang perlu dihindari</p>
            <div className="ob-except-grid">
              {EXCEPTION_OPTIONS.map((item) => {
                const selected = exceptions.includes(item);
                return (
                  <button
                    key={item}
                    id={`btn-except-${item.toLowerCase().replace(' ', '-')}`}
                    className={`ob-except-btn ${selected ? 'selected' : ''}`}
                    onClick={() => toggleException(item)}
                    type="button"
                  >
                    {selected && <Check size={14} />}
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="ob-actions">
            <button
              className="btn btn-primary btn-full"
              onClick={handleSubmit}
              id="btn-start-app"
            >
              Mulai Pendasi 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
