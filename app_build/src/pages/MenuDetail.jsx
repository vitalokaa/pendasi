import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ChevronLeft, Clock, Flame, ChevronRight } from 'lucide-react';
import { menus, nutritionCategories } from '../data/mockData.js';
import { getReactionEntry } from '../data/historyStore.js';
import './MenuDetail.css';

export default function MenuDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { meal, dayLabel, date } = location.state || {};

  const menu = menus.find((m) => m.id === Number(id));

  // Check if user already responded for this meal+date combo
  const reactionDate = date || new Date().toISOString().split('T')[0];
  const existing = meal ? getReactionEntry(reactionDate, menu?.id, meal) : null;
  const hasReaction = !!existing;

  if (!menu) return (
    <div className="page" style={{ padding: 24 }}>
      <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">← Kembali</button>
      <p>Menu tidak ditemukan.</p>
    </div>
  );

  const getCat = (catId) =>
    nutritionCategories.find(c => c.id === catId) || { color: '#999', emoji: '🥗', label: catId };

  return (
    <div className="page md-page">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)} id="btn-back-menu-detail">
          <ChevronLeft size={20} /> Kembali
        </button>
        <h1>{menu.name}</h1>
      </div>

      {/* Hero Illustration (moved down) */}
      <div className="md-hero" style={{ height: 160 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <img src={menu.proteinImage} alt={menu.proteinData?.name} className="md-hero-food-img" />
          <div style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--orange)', opacity: 0.6 }}>+</div>
          <img src={menu.carbImage} alt={menu.carbData?.name} className="md-hero-food-img" />
        </div>
        <div className="md-hero-gradient" />
      </div>

      {/* Content */}
      <div className="md-content">
        {/* Meta chips */}
        <div className="md-chips">
          {menu.categories.map(c => {
            const cat = getCat(c);
            return (
              <span key={c} className="chip" style={{ background: cat.color + '22', color: cat.color }}>
                {cat.emoji} {cat.label}
              </span>
            );
          })}
        </div>

        <h1 className="md-menu-name">{menu.name}</h1>
        <p className="md-menu-desc">{menu.description}</p>



        {/* Stats */}
        <div className="md-stats">
          <div className="md-stat">
            <Clock size={16} color="var(--orange)" />
            <span>{menu.cookMinutes} menit</span>
          </div>
          <div className="md-stat">
            <Flame size={16} color="var(--orange)" />
            <span>{menu.calories} kkal</span>
          </div>
          <div className="md-stat">
            <span>👶</span>
            <span>{menu.ageMin}–{menu.ageMax} bln</span>
          </div>
          <div className="md-stat">
            <span>🥄</span>
            <span>{menu.texture.join(', ')}</span>
          </div>
        </div>

        {/* Ingredients Section */}
        <div style={{ marginTop: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Bahan-bahan</h2>
          <div className="card" style={{ padding: '16px 20px' }}>
            {menu.ingredients.map((ing, i) => {
              const cat = getCat(ing.category);
              return (
                <div key={i} className="md-ingredient">
                  <div className="md-ing-dot" style={{ background: cat.color }} />
                  <span className="md-ing-name">{ing.name}</span>
                  <span className="md-ing-amount" style={{ color: cat.color }}>{ing.amount}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nutrition Section */}
        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Kandungan Nutrisi</h2>
          <div className="card" style={{ padding: '20px' }}>
            {Object.entries(menu.nutrition).map(([key, val]) => {
              const labels = { protein: 'Protein', carbs: 'Karbohidrat', fat: 'Lemak', fiber: 'Serat' };
              const colors = { protein: '#E67422', carbs: '#FFB200', fat: '#637725', fiber: '#47B300' };
              const maxVals = { protein: 20, carbs: 30, fat: 15, fiber: 8 };
              return (
                <div key={key} className="md-nutrient">
                  <span className="md-nutrient-label">{labels[key]}</span>
                  <div className="md-nutrient-bar-bg">
                    <div
                      className="md-nutrient-bar-fill"
                      style={{ width: `${(val / maxVals[key]) * 100}%`, background: colors[key] }}
                    />
                  </div>
                  <span className="md-nutrient-val" style={{ color: colors[key] }}>{val}g</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Companion Recommendation */}
        {menu.companion && (
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Saran Pelengkap</h2>
            <div className="card" style={{ padding: '16px' }}>
              <div className="md-companion-row">
                <strong>🥬 Serat:</strong> <span>{menu.companion.fiber}</span>
              </div>
              <div className="md-companion-row">
                <strong>🥜 Protein Nabati:</strong> <span>{menu.companion.plantProtein}</span>
              </div>
              <div className="md-companion-row">
                <strong>🥑 Lemak Tambahan:</strong> <span>{menu.companion.healthyFat}</span>
              </div>
              <div className="md-companion-row" style={{ borderTop: '1px solid var(--border)', marginTop: 8, paddingTop: 12 }}>
                <strong>👩‍🍳 Saran Memasak:</strong> <span>{menu.companion.cookingMethod}</span>
              </div>
            </div>
          </div>
        )}

        {menu.fact && (
          <div className="card" style={{ background: '#FFF8DC', borderColor: '#FFB200', marginBottom: 20, padding: '12px 16px' }}>
            <h3 style={{ fontSize: 13, color: '#FFB200', marginBottom: 4 }}>💡 Tahukah Ibu?</h3>
            <p style={{ fontSize: 13, color: 'var(--text-dark)', lineHeight: 1.5 }}>{menu.fact}</p>
          </div>
        )}

        {/* Give reaction CTA */}
        {meal && (
          <div className="md-respon-cta">
            <p>{hasReaction ? `Respon tercatat: ${existing.reaction === 'suka' ? '😍 Suka' : existing.reaction === 'tidak_suka' ? '😖 Tidak Suka' : '🤮 Alergi'}` : 'Sudah diberikan hari ini?'}</p>
            <button
              className={`btn btn-full ${hasReaction ? 'btn-secondary' : 'btn-primary'}`}
              onClick={() => navigate(`/respon/${menu.id}/${meal}`, { state: { date: reactionDate, isEdit: hasReaction, existing } })}
              id="btn-beri-respon"
            >
              {hasReaction ? '✏️ Edit Respon' : '💬 Berikan Respon si Kecil'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
