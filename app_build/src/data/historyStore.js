// ── History Store (localStorage-backed) ──────────────────────────
// Keys: 'pendasi_reactions' → array of reaction objects
// Each: { id, date, menuId, meal, reaction, note, amount, ingredients }

import { historyData } from './mockData.js';

const KEY = 'pendasi_reactions';
const VERSION_KEY = 'pendasi_data_version';
const CURRENT_VERSION = 2; // Bump when data model changes

function load() {
  try {
    const storedVersion = Number(localStorage.getItem(VERSION_KEY) || 0);
    if (storedVersion < CURRENT_VERSION) {
      // Data model changed, reseed
      localStorage.setItem(KEY, JSON.stringify(historyData));
      localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
      return historyData;
    }
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  // Seed with data on first load
  localStorage.setItem(KEY, JSON.stringify(historyData));
  localStorage.setItem(VERSION_KEY, String(CURRENT_VERSION));
  return historyData;
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getAllReactions() {
  return load();
}

// Returns a single reaction entry for a given date+menuId+meal, or null
export function getReactionEntry(date, menuId, meal) {
  return load().find(
    (h) => h.date === date && h.menuId === Number(menuId) && h.meal === meal
  ) || null;
}

// Save or update a reaction entry
export function saveReactionEntry({ date, menuId, meal, reaction, note, amount, ingredients }) {
  const all = load();
  const idx = all.findIndex(
    (h) => h.date === date && h.menuId === Number(menuId) && h.meal === meal
  );
  const entry = {
    id: idx >= 0 ? all[idx].id : `r_${Date.now()}`,
    date,
    menuId: Number(menuId),
    meal,
    reaction,
    note,
    amount: amount || 'Habis',
    ingredients: ingredients || [],
  };
  if (idx >= 0) {
    all[idx] = entry;
  } else {
    all.push(entry);
  }
  save(all);
  return entry;
}

// Return all dates+meals from a given weekPlan that have NO reaction entry
// weekPlan: [{ day, date, meals: [{ meal, menu }] }]
export function getUnrespondedMeals(weekPlan) {
  const all = load();
  const unresponded = [];
  weekPlan.forEach(({ day, date, meals }) => {
    const dateStr = new Date(date).toISOString().split('T')[0];
    meals.forEach(({ meal, menu }) => {
      const exists = all.find(
        (h) => h.date === dateStr && h.menuId === menu.id && h.meal === meal
      );
      if (!exists) {
        unresponded.push({ day, date: dateStr, meal, menu });
      }
    });
  });
  return unresponded;
}
