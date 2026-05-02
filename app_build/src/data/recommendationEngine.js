// ── Adaptive Recommendation Engine ─────────────────────────────
// Transforms Pendasi from a static planner into an intelligent
// recommendation system that learns from user feedback.
//
// Pipeline:
//   1. Get all menus → 2. Personalization filter → 3. Allergy history filter
//   4. Score calculation → 5. Sort → 6. Variation rules → 7. Exploration injection
//   8. Generate 7-day × 3-meal plan

import { getAllMenus, getFilteredMenus } from './foodDatabase.js';
import { getAllReactions } from './historyStore.js';

// ── 1. HISTORY AGGREGATION ─────────────────────────────────────
// Build per-menu stats from all saved reactions.
// Returns: Map<menuId, { totalEaten, likeCount, dislikeCount, allergyCount }>

export function aggregateHistory() {
  const reactions = getAllReactions();
  const stats = new Map();

  reactions.forEach(({ menuId, reaction }) => {
    if (!stats.has(menuId)) {
      stats.set(menuId, { totalEaten: 0, likeCount: 0, dislikeCount: 0, allergyCount: 0 });
    }
    const s = stats.get(menuId);
    s.totalEaten++;

    switch (reaction) {
      case 'suka':       s.likeCount++;    break;
      case 'tidak_suka': s.dislikeCount++; break;
      case 'alergi':     s.allergyCount++; break;
      // 'netral' and unknown reactions don't affect scoring
    }
  });

  return stats;
}

// ── 2. SCORING ─────────────────────────────────────────────────
// score = (likeCount × 2) − (dislikeCount × 1) − (allergyCount × 5)
// New/unseen menus get a score of 0 (neutral, eligible for exploration).

export function calculateScore(stats) {
  if (!stats) return 0;
  return (stats.likeCount * 2) - (stats.dislikeCount * 1) - (stats.allergyCount * 5);
}

// ── 3. SMART WEEKLY PLAN GENERATOR ─────────────────────────────
// Full pipeline with history-driven scoring and variation control.

export function generateSmartWeeklyPlan(ageMonths, exceptions = []) {
  const historyStats = aggregateHistory();

  // ─── Step 1-2: Get personalization-filtered menus ───────────
  const personalized = getFilteredMenus(ageMonths, exceptions);
  if (personalized.length === 0) return [];

  // ─── Step 3: Hard allergy filter (from history) ────────────
  // If a user has EVER reported an allergy to a specific menu,
  // that exact combination is permanently excluded.
  const safeMenus = personalized.filter(menu => {
    const stats = historyStats.get(menu.id);
    return !stats || stats.allergyCount === 0;
  });

  if (safeMenus.length === 0) return [];

  // ─── Step 4-5: Calculate scores and sort ───────────────────
  const scored = safeMenus.map(menu => {
    const stats = historyStats.get(menu.id);
    return {
      menu,
      score: calculateScore(stats),
      totalEaten: stats ? stats.totalEaten : 0,
      isNew: !stats || stats.totalEaten === 0,
    };
  });

  // Sort by score descending (highest preference first)
  scored.sort((a, b) => b.score - a.score);

  // ─── Step 6-7: Split into exploitation (70%) and exploration (30%) pools
  // Exploitation: menus with history, sorted by score
  // Exploration:  new/unseen menus + low-frequency menus
  const exploitPool = scored.filter(s => !s.isNew && s.score >= 0);
  const explorePool = scored.filter(s => s.isNew || s.totalEaten <= 1);
  // Fallback: menus with negative scores can still fill gaps
  const fallbackPool = scored.filter(s => s.score < 0 && !s.isNew);

  // ─── Step 8: Generate 7-day plan ───────────────────────────
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const mealSlots = ['Pagi', 'Siang', 'Malam'];
  const TOTAL_MEALS = 21;

  // Variation tracking
  const weekMenuCount = new Map();   // menuId → count this week (max 2)
  const weekCarbCount = new Map();   // carbId → count this week (max 3)
  let prevDayProteins = new Set();   // proteins used yesterday (for consecutive-day check)

  // Determine how many meals should be exploration
  const explorationTarget = Math.round(TOTAL_MEALS * 0.3); // ~6 meals
  let explorationUsed = 0;

  // Pre-shuffle pools for variety within each tier
  shuffle(exploitPool);
  shuffle(explorePool);

  const plan = days.map((day, dayIdx) => {
    const date = getWeekDate(dayIdx);
    const dayProteinTracker = new Set();
    const dayMenuTracker = new Set();

    const meals = mealSlots.map((mealSlot, mealIdx) => {
      const globalMealIdx = dayIdx * 3 + mealIdx;

      // Decide: exploitation or exploration for this slot?
      const shouldExplore = explorationUsed < explorationTarget &&
        (globalMealIdx % 3 === 2 || // Every 3rd meal tends to explore
         Math.random() < 0.3);       // 30% chance otherwise

      let chosen = null;

      if (shouldExplore && explorePool.length > 0) {
        chosen = pickFromPool(explorePool, dayMenuTracker, dayProteinTracker, prevDayProteins, weekMenuCount, weekCarbCount);
        if (chosen) explorationUsed++;
      }

      if (!chosen) {
        // Try exploitation pool first
        chosen = pickFromPool(exploitPool, dayMenuTracker, dayProteinTracker, prevDayProteins, weekMenuCount, weekCarbCount);
      }

      if (!chosen) {
        // Try exploration pool
        chosen = pickFromPool(explorePool, dayMenuTracker, dayProteinTracker, prevDayProteins, weekMenuCount, weekCarbCount);
      }

      if (!chosen) {
        // Relax constraints: fallback pool
        chosen = pickFromPool(fallbackPool, dayMenuTracker, dayProteinTracker, prevDayProteins, weekMenuCount, weekCarbCount);
      }

      if (!chosen) {
        // Pass 5: Relax weekly counts and consecutive days, but STILL enforce daily protein variety
        chosen = pickWithMinimalRules(scored, dayMenuTracker, dayProteinTracker);
      }

      if (!chosen) {
        // Pass 6: Ultimate fallback - just avoid exact menu repeat in the same day
        chosen = scored.find(s => !dayMenuTracker.has(s.menu.id)) || scored[0];
      }

      // Record usage
      const menu = chosen.menu;
      dayMenuTracker.add(menu.id);
      dayProteinTracker.add(menu.proteinData.id);
      weekMenuCount.set(menu.id, (weekMenuCount.get(menu.id) || 0) + 1);
      weekCarbCount.set(menu.carbData.id, (weekCarbCount.get(menu.carbData.id) || 0) + 1);

      return { meal: mealSlot, menu };
    });

    // Update previous-day tracker for consecutive-day protein check
    prevDayProteins = dayProteinTracker;

    return { day, date, meals };
  });

  return plan;
}

// ── PICK FROM POOL WITH VARIATION RULES ────────────────────────
// Applies all variation constraints:
//  - Max 2 times per week for any menu
//  - No same protein as consecutive day
//  - Max 3 carb uses per week
//  - No same menu in same day
//  - No same protein in same day

function pickFromPool(pool, dayMenus, dayProteins, prevDayProteins, weekMenuCount, weekCarbCount) {
  for (let i = 0; i < pool.length; i++) {
    const candidate = pool[i];
    const m = candidate.menu;

    // Same menu already today?
    if (dayMenus.has(m.id)) continue;

    // Same protein already today?
    if (dayProteins.has(m.proteinData.id)) continue;

    // Menu used ≥ 2 times this week?
    if ((weekMenuCount.get(m.id) || 0) >= 2) continue;

    // Carb used ≥ 3 times this week?
    if ((weekCarbCount.get(m.carbData.id) || 0) >= 3) continue;

    // Same protein as yesterday? (consecutive-day rule)
    if (prevDayProteins.has(m.proteinData.id)) continue;

    // Move chosen item to end of pool so we cycle through options
    pool.push(pool.splice(i, 1)[0]);

    return candidate;
  }
  return null;
}

// Minimal rules: only avoids same-day menu and protein repeat
function pickWithMinimalRules(scored, dayMenus, dayProteins) {
  return scored.find(s => !dayMenus.has(s.menu.id) && !dayProteins.has(s.menu.proteinData.id)) || null;
}

// ── HELPERS ────────────────────────────────────────────────────

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getWeekDate(dayIdx) {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0=Sun, 1=Mon...
  const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset + dayIdx);
  return monday;
}

// ── PUBLIC UTILITIES ───────────────────────────────────────────

// Get recommendation scores for all menus (useful for debug / UI display)
export function getMenuScores(ageMonths, exceptions = []) {
  const historyStats = aggregateHistory();
  const personalized = getFilteredMenus(ageMonths, exceptions);

  return personalized.map(menu => {
    const stats = historyStats.get(menu.id) || { totalEaten: 0, likeCount: 0, dislikeCount: 0, allergyCount: 0 };
    return {
      menu,
      score: calculateScore(stats),
      ...stats,
      isBlocked: stats.allergyCount > 0,
    };
  }).sort((a, b) => b.score - a.score);
}
