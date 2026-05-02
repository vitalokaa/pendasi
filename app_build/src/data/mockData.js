// ── Mock Data – Legacy Compatibility Layer ─────────────────────
// Re-exports from the new food database for backward compatibility.
// All data is now sourced from foodDatabase.js.

export {
  babyProfile,
  nutritionCategories,
  reactionOptions,
  historyData,
  generateWeeklyPlan,
  getMenuById,
  getReaction,
  getAllMenus,
  getFilteredMenus,
  proteins,
  carbs,
  EXCEPTION_OPTIONS,
} from './foodDatabase.js';

// For components that import `menus` directly, provide the full list
import { getAllMenus } from './foodDatabase.js';
export const menus = getAllMenus();
