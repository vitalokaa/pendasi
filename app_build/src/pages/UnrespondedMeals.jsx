import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { generateWeeklyPlan, babyProfile as defaultBaby } from '../data/mockData.js';
import { getUnrespondedMeals } from '../data/historyStore.js';

export default function UnrespondedMeals({ baby, weekPlan: passedPlan }) {
  const navigate = useNavigate();
  const profile = baby || defaultBaby;

  // Use passed plan or generate if missing (fallback)
  const weekPlan = passedPlan || generateWeeklyPlan(profile.ageMonths, profile.exceptions || []);
  const unresponded = getUnrespondedMeals(weekPlan);

  // Group by date for display
  const grouped = unresponded.reduce((acc, item) => {
    if (!acc[item.date]) acc[item.date] = { day: item.day, date: item.date, items: [] };
    acc[item.date].items.push(item);
    return acc;
  }, {});

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });

  const MEAL_ICON = { Pagi: '🌅', Siang: '☀️', Malam: '🌙' };

  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/riwayat')} id="btn-back-unresponded">
          <ChevronLeft size={20} /> Kembali
        </button>
        <h1>Belum Direspon</h1>
      </div>

      {unresponded.length === 0 ? (
        <div className="empty-state">
          <span style={{ fontSize: 48 }}>✅</span>
          <h3>Semua Sudah Dicatat!</h3>
          <p>Semua makan minggu ini sudah mendapat respon.</p>
        </div>
      ) : (
        <div className="section">
          {Object.values(grouped).map(({ day, date, items }) => (
            <div key={date} style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {formatDate(date)}
              </h2>
              {items.map(({ meal, menu }) => (
                <div
                  key={`${date}-${meal}`}
                  className="card"
                  style={{ marginBottom: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 24 }}>{MEAL_ICON[meal]}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{meal === 'Pagi' ? 'Sarapan' : `Makan ${meal}`}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{menu.name}</div>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary"
                    style={{ fontSize: 13, padding: '8px 16px', whiteSpace: 'nowrap' }}
                    onClick={() =>
                      navigate(`/respon/${menu.id}/${meal}`, { state: { date, isEdit: false } })
                    }
                    id={`btn-respon-unresponded-${meal.toLowerCase()}-${date}`}
                  >
                    Berikan Respon
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
