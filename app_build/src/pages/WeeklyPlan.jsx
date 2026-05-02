import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Settings2 } from 'lucide-react';
import { generateWeeklyPlan, babyProfile as defaultBaby, menus, getFilteredMenus, getMenuById } from '../data/mockData.js';
import morningBg from '../assets/morning.png';
import afternoonBg from '../assets/Afternoon.png';
import nightBg from '../assets/Night.png';
import './WeeklyPlan.css';

const MEALS = ['Pagi', 'Siang', 'Malam'];

export default function WeeklyPlan({ baby, weekPlan, setWeekPlan }) {
  const navigate = useNavigate();
  const profile = baby || defaultBaby;

  // Init weekPlan in App state if not yet created
  useEffect(() => {
    if (!weekPlan) {
      setWeekPlan(generateWeeklyPlan(profile.ageMonths, profile.exceptions || []));
    }
  }, []);

  const today = new Date();
  const dayOfWeek = today.getDay();
  const defaultDayIdx = Math.max(0, dayOfWeek === 0 ? 6 : dayOfWeek - 1);

  const [changeMealModal, setChangeMealModal] = useState(null);
  // Force re-render when reactions change
  const [reactionTick, setReactionTick] = useState(0);

  const handleCreatePlan = () => {
    setWeekPlan(generateWeeklyPlan(profile.ageMonths, profile.exceptions || []));
  };

  const handleDeletePlan = () => {
    if (window.confirm('Yakin ingin menghapus seluruh rencana minggu ini?')) {
      setWeekPlan(null);
    }
  };

  const handleChangeMeal = (dayIdx, mealName, newMenuId) => {
    const newPlan = weekPlan.map((day, di) => {
      if (di !== dayIdx) return day;
      return {
        ...day,
        meals: day.meals.map((m) =>
          m.meal === mealName
            ? { ...m, menu: getMenuById(newMenuId) || m.menu }
            : m
        ),
      };
    });
    setWeekPlan(newPlan);
    setChangeMealModal(null);
  };

  const formatDateStr = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  const formatDateParts = (date) => {
    if (!date) return { dateStr: '', monthStr: '' };
    const d = new Date(date);
    return {
      dateStr: d.toLocaleDateString('id-ID', { day: 'numeric' }),
      monthStr: d.toLocaleDateString('id-ID', { month: 'short' }),
    };
  };

  const isToday = (idx) => idx === defaultDayIdx;

  const renderDay = (day, idx, isTodayDay, isPast) => {
    const { dateStr, monthStr } = formatDateParts(day.date);
    const dateStrISO = formatDateStr(day.date);

    return (
      <div key={idx} className={`wp-day-section ${isPast ? 'wp-past' : ''}`}>
        <div className="wp-day-header">
          <div>
            <h2 className="wp-day-title">{day.day}</h2>
            <p className="wp-day-date-full">
              {`${dateStr} ${monthStr} ${new Date(day.date).getFullYear()}`}
            </p>
          </div>
        </div>

        <div className="wp-meal-list">
          {day.meals.map(({ meal, menu }) => {
            const carbIng = menu.ingredients.find((i) => i.category === 'carbs') || menu.ingredients[0];
            const proteinIng = menu.ingredients.find((i) => i.category === 'protein') || menu.ingredients[1];

            return (
              <div
                key={meal}
                className={`wp-meal-card ${isTodayDay ? `theme-${meal.toLowerCase()}` : 'theme-plain'}`}
              >
                <div
                  className="wp-meal-card-header"
                  style={isTodayDay ? {
                    backgroundImage: `url(${meal === 'Pagi' ? morningBg : meal === 'Siang' ? afternoonBg : nightBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center top',
                    color: meal === 'Malam' ? 'white' : '#1A3C6B',
                    minHeight: 80,
                  } : {}}
                >
                  <h3>{meal === 'Pagi' ? 'Sarapan' : `Makan ${meal}`}</h3>
                  {!isPast && (
                    <button
                      className="wp-change-btn-meal"
                      onClick={(e) => { e.stopPropagation(); setChangeMealModal({ dayIdx: idx, mealName: meal }); }}
                    >
                      <Settings2 size={16} /> Ganti Menu
                    </button>
                  )}
                </div>
                <div
                  className="wp-meal-card-body"
                  onClick={() => navigate(`/rencana/detail/${menu.id}`, { state: { meal, dayLabel: day.day, date: dateStrISO } })}
                  style={{ cursor: 'pointer', position: 'relative' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                    <div className="wp-meal-item">
                      <img src={menu.proteinImage} alt={proteinIng?.name} className="wp-meal-food-img" />
                      <div className="wp-meal-item-text">
                        <strong>{proteinIng?.name || 'Protein'}</strong>
                        <span>{proteinIng?.amount || ''}</span>
                      </div>
                    </div>
                    <span className="wp-meal-plus">+</span>
                    <div className="wp-meal-item">
                      <img src={menu.carbImage} alt={carbIng?.name} className="wp-meal-food-img" />
                      <div className="wp-meal-item-text">
                        <strong>{carbIng?.name || 'Karbo'}</strong>
                        <span>{carbIng?.amount || ''}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                    <ChevronRight size={24} color="var(--text-light)" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!weekPlan || weekPlan.length === 0) {
    return (
      <div className="page wp-page">
      <div className="page-header">
        <h1>Rencana MPASI</h1>
      </div>
      <div className="section" style={{ textAlign: 'center', marginTop: 40 }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>🍽️</div>
        <h2>Belum Ada Rencana</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Buat rencana makan 1 minggu ke depan untuk si Kecil sekarang juga.</p>
        <button className="btn btn-primary" onClick={handleCreatePlan}>Buat Rencana Baru</button>
      </div>
      </div>
    );
  }

  return (
    <div className="page wp-page">
      {/* Header */}
      <div className="page-header">
        <h1>Rencana MPASI</h1>
        <button
          className="btn-sm"
          onClick={handleDeletePlan}
          style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'var(--orange-pale)', color: 'var(--orange)', border: 'none', fontSize: 10, padding: '4px 8px', borderRadius: 6, minHeight: 0 }}
        >
          Reset
        </button>
      </div>

      <div className="wp-plan-list">
        {/* HARI INI */}
        {weekPlan.filter((_, idx) => isToday(idx)).length > 0 && (
          <div className="wp-section-group">
            <h2 className="wp-section-group-title">Hari ini</h2>
            {weekPlan.map((day, idx) => (isToday(idx) ? renderDay(day, idx, true, false) : null))}
          </div>
        )}

        {/* HARI BERIKUTNYA */}
        {weekPlan.filter((_, idx) => idx > defaultDayIdx).length > 0 && (
          <div className="wp-section-group" style={{ marginTop: 32 }}>
            <h2 className="wp-section-group-title">Hari berikutnya</h2>
            {weekPlan.map((day, idx) => (idx > defaultDayIdx ? renderDay(day, idx, false, false) : null))}
          </div>
        )}

        {/* HARI SEBELUMNYA */}
        {weekPlan.filter((_, idx) => idx < defaultDayIdx).length > 0 && (
          <div className="wp-section-group" style={{ marginTop: 32 }}>
            <h2 className="wp-section-group-title">Hari sebelumnya</h2>
            {weekPlan.map((day, idx) => (idx < defaultDayIdx ? renderDay(day, idx, false, true) : null))}
          </div>
        )}
      </div>

      {changeMealModal && (
        <div className="modal-overlay" onClick={() => setChangeMealModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: 16 }}>Pilih Alternatif Menu</h3>
            <div className="wp-alt-list">
              {getFilteredMenus(profile.ageMonths, profile.exceptions || [])
                .filter((m) => m.id !== weekPlan[changeMealModal.dayIdx].meals.find((x) => x.meal === changeMealModal.mealName)?.menu.id)
                .slice(0, 10)
                .map((m) => (
                  <button key={m.id} className="wp-alt-btn" onClick={() => handleChangeMeal(changeMealModal.dayIdx, changeMealModal.mealName, m.id)}>
                    <div style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}>
                      <img src={m.proteinImage} alt={m.name} style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--orange)', opacity: 0.5 }}>+</span>
                      <img src={m.carbImage} alt={m.name} style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
                    </div>
                    <div className="wp-alt-info">
                      <strong>{m.name}</strong>
                      <span>{m.calories} kkal · {m.cookMinutes} menit</span>
                    </div>
                  </button>
                ))}
            </div>
            <button className="btn btn-secondary btn-full" style={{ marginTop: 16 }} onClick={() => setChangeMealModal(null)}>Batal</button>
          </div>
        </div>
      )}
    </div>
  );
}
