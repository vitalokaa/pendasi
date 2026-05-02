import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, Check } from 'lucide-react';
import { menus, reactionOptions } from '../data/mockData.js';
import { saveReactionEntry } from '../data/historyStore.js';
import './GiveReaction.css';

const AMOUNT_OPTIONS = ['Sedikit', 'Setengah', 'Habis'];

export default function GiveReaction() {
  const { menuId, meal } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { date, isEdit, existing } = location.state || {};

  const menu = menus.find((m) => m.id === Number(menuId));

  // Pre-fill if editing
  const [selectedReaction, setSelectedReaction] = useState(isEdit ? existing?.reaction : null);
  const [note, setNote] = useState(isEdit ? existing?.note || '' : '');
  const [amount, setAmount] = useState(isEdit ? existing?.amount || 'Habis' : 'Habis');

  // Use today's date if not passed
  const reactionDate = date || new Date().toISOString().split('T')[0];

  const handleSave = () => {
    if (!selectedReaction) return;
    saveReactionEntry({
      date: reactionDate,
      menuId: Number(menuId),
      meal,
      reaction: selectedReaction,
      note,
      amount,
      ingredients: menu?.ingredients || [],
    });
    navigate(-1);
  };

  return (
    <div className="page gr-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)} id="btn-back-reaction">
          <ChevronLeft size={20} /> Kembali
        </button>
        <h1>{isEdit ? 'Edit Respon' : 'Berikan Respon'}</h1>
      </div>

      <div className="section">
        {/* Food card */}
        <div className="gr-menu-card card">
          <img src={menu?.proteinImage} alt={menu?.name} style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
          <div>
            <h3>{menu?.name}</h3>
            <p className="gr-menu-meta">{meal} · {menu?.calories} kkal · {reactionDate}</p>
          </div>
        </div>
      </div>

      {/* Reaction selector */}
      <div className="section">
        <h2 className="section-title">Bagaimana reaksi si Kecil?</h2>
        <p className="gr-hint">Pilih salah satu reaksi berikut</p>
        <div className="gr-reaction-grid">
          {reactionOptions.map((r) => (
            <button
              key={r.key}
              id={`btn-reaction-${r.key}`}
              className={`gr-reaction-btn ${selectedReaction === r.key ? 'selected' : ''}`}
              style={selectedReaction === r.key ? { background: r.bg, borderColor: r.color } : {}}
              onClick={() => setSelectedReaction(r.key)}
            >
              <span className="gr-reaction-emoji">{r.emoji}</span>
              <span className="gr-reaction-label" style={selectedReaction === r.key ? { color: r.color } : {}}>
                {r.label}
              </span>
              {selectedReaction === r.key && (
                <div className="gr-reaction-check" style={{ background: r.color }}>
                  <Check size={12} color="white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Amount selector */}
      <div className="section">
        <h2 className="section-title">Berapa banyak yang dimakan?</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          {AMOUNT_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`btn ${amount === opt ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, fontSize: 14 }}
              onClick={() => setAmount(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="section">
        <h2 className="section-title">Catatan (opsional)</h2>
        <textarea
          id="input-reaction-note"
          className="gr-textarea"
          placeholder="Tulis catatan tentang makan si Kecil..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
        />
      </div>

      {/* Save */}
      <div className="section">
        <button
          className="btn btn-primary btn-full"
          onClick={handleSave}
          disabled={!selectedReaction}
          id="btn-save-reaction"
        >
          {isEdit ? 'Perbarui Respon' : 'Simpan Respon'}
        </button>
      </div>
    </div>
  );
}
