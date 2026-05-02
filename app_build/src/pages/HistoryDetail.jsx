import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { menus, reactionOptions } from '../data/mockData.js';
import { getAllReactions } from '../data/historyStore.js';
import './HistoryDetail.css';

export default function HistoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const menuId = Number(id);
  // Always read live from localStorage so counts and details stay in sync
  const allReactions = getAllReactions();
  const menuHistory = allReactions.filter(h => h.menuId === menuId).sort((a, b) => new Date(b.date) - new Date(a.date));
  const menu = menus.find(m => m.id === menuId);

  if (!menu || menuHistory.length === 0) return null;

  const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="modal-overlay" onClick={() => navigate(-1)}>
      <div className="modal-sheet hd-sheet" style={{ maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
        <div className="modal-handle" />

        {/* Header */}
        <div className="hd-header">
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: 'var(--white)', padding: '8px 12px', borderRadius: 12, border: '1px solid var(--border)' }}>
              <img src={menu.proteinImage} alt={menu.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
              <span style={{ fontSize: 16, color: 'var(--text-muted)' }}>+</span>
              <img src={menu.carbImage} alt={menu.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
            </div>
          </div>
          <h2 className="hd-title">{menu.name}</h2>
          <button className="hd-close" onClick={() => navigate(-1)} id="btn-close-history-detail">
            <X size={20} />
          </button>
        </div>

        {/* History List */}
        <div style={{ paddingBottom: 24 }}>
          {menuHistory.map((h, i) => {
            const reaction = reactionOptions.find(r => r.key === h.reaction);
            return (
              <div key={h.id} className="card" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>{formatDate(h.date)} · {h.meal}</span>
                  <span className="chip" style={{ background: reaction?.bg, color: reaction?.color, fontSize: 12, fontWeight: 700 }}>
                    {reaction?.emoji} {reaction?.label}
                  </span>
                </div>
                {h.amount && (
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>
                    🍽️ Dimakan: <strong style={{ color: 'var(--text-dark)' }}>{h.amount}</strong>
                  </div>
                )}
                {h.note && (
                  <div style={{ background: 'var(--cream)', padding: 12, borderRadius: 8 }}>
                    <p style={{ fontSize: 13, color: 'var(--text-dark)', fontStyle: 'italic' }}>"{h.note}"</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
