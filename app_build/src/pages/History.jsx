import React, { useState, useMemo } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { menus, reactionOptions, generateWeeklyPlan, babyProfile as defaultBaby } from '../data/mockData.js';
import { getAllReactions, getUnrespondedMeals } from '../data/historyStore.js';
import './History.css';

export default function History({ baby, weekPlan: passedPlan }) {
  const navigate = useNavigate();
  const profile = baby || defaultBaby;
  const [search, setSearch] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]); // 'suka', 'tidak_suka', 'alergi'

  // Always read fresh from localStorage
  const historyData = getAllReactions();

  // Use passed plan or generate if missing
  const weekPlan = passedPlan || generateWeeklyPlan(profile.ageMonths, profile.exceptions || []);
  const unrespondedCount = getUnrespondedMeals(weekPlan).length;

  const getMenu = (id) => menus.find((m) => m.id === id);

  const toggleFilter = (key) => {
    setSelectedFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Filter history by search AND reaction types
  const filteredHistory = useMemo(() => {
    let result = historyData;

    // 1. Filter by search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((h) => {
        const menu = getMenu(h.menuId);
        if (!menu) return false;
        return menu.name.toLowerCase().includes(q) ||
          menu.ingredients.some((i) => i.name.toLowerCase().includes(q));
      });
    }

    // 2. Filter by reaction multi-select
    if (selectedFilters.length > 0) {
      result = result.filter((h) => selectedFilters.includes(h.reaction));
    }

    return result;
  }, [search, selectedFilters, historyData]);

  // Group by menu
  const groupedByMenu = useMemo(() => {
    return filteredHistory.reduce((acc, h) => {
      const mId = h.menuId;
      if (!acc[mId]) acc[mId] = [];
      acc[mId].push(h);
      return acc;
    }, {});
  }, [filteredHistory]);

  return (
    <div className="page hist-page">
      <div className="page-header">
        <h1>Riwayat MPASI</h1>
      </div>

      {/* Search bar */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <div style={{ position: 'relative' }}>
          <input
            id="input-search-riwayat"
            type="text"
            placeholder="🔍  Cari menu... (contoh: Ayam, Nasi)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 12,
              border: '1.5px solid var(--border)',
              fontSize: 14,
              background: 'white',
              boxSizing: 'border-box',
              outline: 'none',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text-muted)' }}
            >×</button>
          )}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="section" style={{ paddingTop: 12, paddingBottom: 0 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          {reactionOptions.map((r) => (
            <button
              key={r.key}
              onClick={() => toggleFilter(r.key)}
              style={{
                padding: '8px 12px',
                borderRadius: 20,
                border: '1.5px solid',
                borderColor: selectedFilters.includes(r.key) ? r.color : 'var(--border)',
                background: selectedFilters.includes(r.key) ? r.bg : 'white',
                color: selectedFilters.includes(r.key) ? r.color : 'var(--text-muted)',
                fontSize: 12,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span>{r.emoji}</span>
              {r.label}
            </button>
          ))}
          {selectedFilters.length > 0 && (
            <button
              onClick={() => setSelectedFilters([])}
              style={{
                padding: '8px 12px',
                borderRadius: 20,
                border: 'none',
                background: 'none',
                color: 'var(--orange)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div className="section">
        <div className="hist-stats">
          {reactionOptions.map((r) => {
            const count = historyData.filter((h) => h.reaction === r.key).length;
            return (
              <div key={r.key} className="hist-stat-card" style={{ background: r.bg }}>
                <span className="hist-stat-emoji">{r.emoji}</span>
                <span className="hist-stat-num" style={{ color: r.color }}>{count}</span>
                <span className="hist-stat-label">{r.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Belum Diberikan Respon section */}
      {!search && unrespondedCount > 0 && (
        <div className="section" style={{ paddingTop: 0 }}>
          <button
            className="card fade-in"
            id="btn-unresponded-section"
            style={{
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFF8DC',
              border: '1.5px solid #FFB200',
              borderRadius: 16,
            }}
            onClick={() => navigate('/riwayat/belum-respon')}
          >
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, color: '#B8860B', marginBottom: 2 }}>⏳ Belum Diberikan Respon</div>
              <div style={{ fontSize: 13, color: '#7A6010' }}>Ada {unrespondedCount} makan yang belum dicatat</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}

      {/* History list */}
      {Object.keys(groupedByMenu).length === 0 ? (
        <div className="empty-state">
          <span style={{ fontSize: 48 }}>📋</span>
          <h3>{search ? `Tidak ada hasil untuk "${search}"` : 'Belum ada riwayat'}</h3>
          <p>{search ? 'Coba kata kunci lain' : 'Riwayat makan si Kecil akan muncul di sini'}</p>
        </div>
      ) : (
        <div className="section" style={{ marginTop: 8 }}>
          {Object.entries(groupedByMenu).map(([menuId, items]) => {
            const menu = getMenu(Number(menuId));
            const totalEaten = items.length;
            const countSuka = items.filter((h) => h.reaction === 'suka').length;
            const countTidakSuka = items.filter((h) => h.reaction === 'tidak_suka').length;
            const countAlergi = items.filter((h) => h.reaction === 'alergi').length;

            return (
              <div
                key={menuId}
                className="card fade-in"
                style={{ marginBottom: 16, cursor: 'pointer', padding: 20 }}
                onClick={() => navigate(`/riwayat/detail/${menuId}`)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--orange)', flex: 1, paddingRight: 8 }}>{menu?.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--orange)', fontWeight: 800, flexShrink: 0 }}>
                    <span style={{ fontSize: 16 }}>{totalEaten} kali</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { emoji: '😍', label: 'Tidak alergi dan suka', count: countSuka },
                    { emoji: '😖', label: 'Tidak alergi tetapi tidak suka', count: countTidakSuka },
                    { emoji: '🤮', label: 'Alergi pada makanan ini', count: countAlergi },
                  ].map(({ emoji, label, count }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 15, color: 'var(--text-dark)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 20 }}>{emoji}</span>
                        <span>{label}</span>
                      </div>
                      <span style={{ fontWeight: 500 }}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
