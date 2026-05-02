import React, { useMemo } from 'react';
import { generateWeeklyPlan, babyProfile as defaultBaby, nutritionCategories } from '../data/mockData.js';
import './Ingredients.css';

export default function Ingredients({ baby, weekPlan: sharedWeekPlan }) {
  const profile = baby || defaultBaby;
  // Use the shared weekPlan (reflects menu changes) if available, otherwise generate a fresh one
  const weekPlan = useMemo(() =>
    sharedWeekPlan || generateWeeklyPlan(profile.ageMonths, profile.exceptions || []),
    [sharedWeekPlan, profile.ageMonths, profile.exceptions]
  );

  const allIngredients = useMemo(() => {
    const map = {};
    weekPlan.forEach(day => {
      day.meals.forEach(({ menu }) => {
        menu.ingredients.forEach(ing => {
          if (!map[ing.name]) map[ing.name] = { ...ing, count: 0 };
          map[ing.name].count += 1;
        });
      });
    });
    return map;
  }, [weekPlan]);

  const grouped = useMemo(() => {
    const cats = {};
    Object.values(allIngredients).forEach(ing => {
      if (!cats[ing.category]) cats[ing.category] = [];
      cats[ing.category].push(ing);
    });
    return cats;
  }, [allIngredients]);

  const getCat = (id) => nutritionCategories.find(c => c.id === id) || { label: id, color: '#999', emoji: '🥗' };

  return (
    <div className="page ing-page">
      <div className="page-header">
        <h1>Bahan MPASI</h1>
      </div>
      <div className="section">
        <div className="ing-summary-card">
          <span className="ing-summary-illo">🛒</span>
          <div>
            <h2>{Object.keys(allIngredients).length} bahan</h2>
            <p>untuk 7 hari × 3 kali makan</p>
          </div>
          <span className="chip" style={{ marginLeft: 'auto' }}>Minggu Ini</span>
        </div>
      </div>
      {Object.entries(grouped).map(([catId, items]) => {
        const cat = getCat(catId);
        return (
          <div key={catId} className="section">
            <div className="ing-cat-header">
              <span>{cat.emoji}</span>
              <h2 className="ing-cat-title" style={{ color: cat.color }}>{cat.label}</h2>
              <span className="chip" style={{ background: cat.color + '22', color: cat.color, marginLeft: 'auto' }}>{items.length} item</span>
            </div>
            <div className="card">
              {items.map((ing, i) => (
                <div key={ing.name}>
                  <div className="ing-item">
                    <div className="ing-dot" style={{ background: cat.color }} />
                    <div className="ing-item-info">
                      <p className="ing-item-name">{ing.name}</p>
                      <p className="ing-item-meta">Digunakan {ing.count}× minggu ini</p>
                    </div>
                    <div className="ing-item-amount" style={{ color: cat.color }}>
                      <span>{scaleAmount(ing.amount, ing.count)}</span>
                      <small>total</small>
                    </div>
                  </div>
                  {i < items.length - 1 && <div className="divider" style={{ margin: 0 }} />}
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="section">
        <div className="ing-note">
          <span>💡</span>
          <p>Jumlah ini adalah perkiraan untuk semua menu dalam seminggu. Sesuaikan dengan kebutuhan si Kecil.</p>
        </div>
      </div>
    </div>
  );
}

function scaleAmount(amount, count) {
  const match = amount.match(/^([\d.]+)\s*(.*)$/);
  if (match) {
    const num = parseFloat(match[1]);
    const unit = match[2];
    return `${(num * count).toFixed(num % 1 !== 0 ? 1 : 0)} ${unit}`;
  }
  return `${count}× ${amount}`;
}
