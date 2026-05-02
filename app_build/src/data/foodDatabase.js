// ── Pendasi Food Database ──────────────────────────────────────
// Real, structured MPASI (complementary feeding) data for infants 6–12 months.
// All items are verified safe for Indonesian MPASI guidelines.

// ── Protein Sources ────────────────────────────────────────────
export const proteins = [
  {
    id: 'ayam',
    name: 'Ayam',
    fullName: 'Daging Ayam',
    amount: '30 g',
    ageMin: 6,
    calories: 55,
    nutrition: { protein: 10, fat: 2, fiber: 0 },
    allergen: null,
    tags: ['hewani'],
    image: '/food/ayam.jpg',
    fact: 'Daging ayam mudah dicerna oleh bayi dan merupakan sumber protein hewani yang sangat baik untuk pertumbuhan.',
  },
  {
    id: 'salmon',
    name: 'Salmon',
    fullName: 'Ikan Salmon',
    amount: '30 g',
    ageMin: 6,
    calories: 60,
    nutrition: { protein: 8, fat: 5, fiber: 0 },
    allergen: 'Ikan',
    tags: ['hewani', 'omega3'],
    image: '/food/salmon.jpg',
    fact: 'Omega-3 (DHA) pada salmon sangat penting untuk perkembangan otak dan mata si Kecil.',
  },
  {
    id: 'sapi',
    name: 'Daging Sapi',
    fullName: 'Daging Sapi Cincang',
    amount: '30 g',
    ageMin: 6,
    calories: 65,
    nutrition: { protein: 12, fat: 3, fiber: 0 },
    allergen: null,
    tags: ['hewani', 'zat-besi'],
    image: '/food/sapi.jpg',
    fact: 'Zat besi dari daging sapi (heme iron) 2-3x lebih mudah diserap tubuh bayi dibanding sumber nabati.',
  },
  {
    id: 'hati-ayam',
    name: 'Hati Ayam',
    fullName: 'Hati Ayam',
    amount: '20 g',
    ageMin: 6,
    calories: 45,
    nutrition: { protein: 8, fat: 2, fiber: 0 },
    allergen: null,
    tags: ['hewani', 'zat-besi', 'vitamin-a'],
    image: '/food/hati-ayam.jpg',
    fact: 'Hati ayam adalah sumber vitamin A dan zat besi terbaik yang terjangkau untuk MPASI.',
  },
  {
    id: 'telur',
    name: 'Telur',
    fullName: 'Telur Ayam',
    amount: '1 butir',
    ageMin: 6,
    calories: 70,
    nutrition: { protein: 6, fat: 5, fiber: 0 },
    allergen: 'Telur',
    tags: ['hewani'],
    image: '/food/telur.jpg',
    fact: 'Kuning telur kaya kolin yang penting untuk perkembangan memori dan otak bayi.',
  },
  {
    id: 'ikan-kembung',
    name: 'Ikan Kembung',
    fullName: 'Ikan Kembung',
    amount: '30 g',
    ageMin: 6,
    calories: 50,
    nutrition: { protein: 9, fat: 2, fiber: 0 },
    allergen: 'Ikan',
    tags: ['hewani', 'omega3'],
    image: '/food/ikan-kembung.jpg',
    fact: 'Ikan kembung adalah alternatif lokal yang kaya omega-3, lebih terjangkau dari salmon.',
  },
  {
    id: 'tempe',
    name: 'Tempe',
    fullName: 'Tempe Kedelai',
    amount: '25 g',
    ageMin: 7,
    calories: 48,
    nutrition: { protein: 5, fat: 2, fiber: 2 },
    allergen: 'Kedelai',
    tags: ['nabati'],
    image: '/food/tempe.jpg',
    fact: 'Fermentasi pada tempe membuat protein kedelai lebih mudah dicerna dan kaya probiotik alami.',
  },
  {
    id: 'tahu',
    name: 'Tahu',
    fullName: 'Tahu Sutra',
    amount: '50 g',
    ageMin: 6,
    calories: 35,
    nutrition: { protein: 4, fat: 2, fiber: 0 },
    allergen: 'Kedelai',
    tags: ['nabati'],
    image: '/food/tahu.jpg',
    fact: 'Tahu sutra memiliki tekstur sangat halus, ideal untuk bayi di fase awal MPASI.',
  },
  {
    id: 'udang',
    name: 'Udang',
    fullName: 'Udang Kupas',
    amount: '30 g',
    ageMin: 8,
    calories: 30,
    nutrition: { protein: 7, fat: 0.5, fiber: 0 },
    allergen: 'Udang',
    tags: ['hewani'],
    image: '/food/udang.jpg',
    fact: 'Udang mengandung selenium dan zinc yang mendukung sistem imun bayi.',
  },
  {
    id: 'ikan-nila',
    name: 'Ikan Nila',
    fullName: 'Ikan Nila',
    amount: '30 g',
    ageMin: 6,
    calories: 40,
    nutrition: { protein: 8, fat: 1, fiber: 0 },
    allergen: 'Ikan',
    tags: ['hewani'],
    image: '/food/ikan-nila.jpg',
    fact: 'Ikan nila rendah merkuri dan mudah didapat di pasar tradisional Indonesia.',
  },
];

// ── Carbohydrate Sources ───────────────────────────────────────
export const carbs = [
  {
    id: 'beras-putih',
    name: 'Beras Putih',
    fullName: 'Beras Putih',
    amount: '3 sdm',
    ageMin: 6,
    calories: 65,
    nutrition: { carbs: 15, fiber: 0.5 },
    allergen: null,
    tags: ['biji-bijian'],
    image: '/food/beras-putih.jpg',
    fact: 'Beras putih adalah sumber karbohidrat utama MPASI Indonesia, mudah dicerna dan netral rasanya.',
  },
  {
    id: 'beras-merah',
    name: 'Beras Merah',
    fullName: 'Beras Merah',
    amount: '3 sdm',
    ageMin: 7,
    calories: 60,
    nutrition: { carbs: 13, fiber: 2 },
    allergen: null,
    tags: ['biji-bijian', 'serat-tinggi'],
    image: '/food/beras-merah.jpg',
    fact: 'Beras merah kaya serat dan vitamin B, butuh air lebih banyak agar teksturnya pas untuk bayi.',
  },
  {
    id: 'kentang',
    name: 'Kentang',
    fullName: 'Kentang',
    amount: '60 g',
    ageMin: 6,
    calories: 55,
    nutrition: { carbs: 12, fiber: 1.5 },
    allergen: null,
    tags: ['umbi'],
    image: '/food/kentang.jpg',
    fact: 'Kentang mengandung potasium yang baik untuk keseimbangan cairan dan fungsi otot bayi.',
  },
  {
    id: 'ubi-jalar',
    name: 'Ubi Jalar',
    fullName: 'Ubi Jalar Oranye',
    amount: '60 g',
    ageMin: 6,
    calories: 50,
    nutrition: { carbs: 12, fiber: 2 },
    allergen: null,
    tags: ['umbi', 'vitamin-a'],
    image: '/food/ubi-jalar.jpg',
    fact: 'Ubi jalar oranye sangat kaya beta-karoten (provitamin A) yang baik untuk mata dan imunitas.',
  },
  {
    id: 'labu-kuning',
    name: 'Labu Kuning',
    fullName: 'Labu Kuning',
    amount: '60 g',
    ageMin: 6,
    calories: 25,
    nutrition: { carbs: 6, fiber: 1 },
    allergen: null,
    tags: ['sayuran', 'vitamin-a'],
    image: '/food/labu-kuning.jpg',
    fact: 'Labu kuning memiliki rasa manis alami yang disukai bayi dan kaya vitamin A.',
  },
  {
    id: 'makaroni',
    name: 'Makaroni',
    fullName: 'Makaroni',
    amount: '30 g',
    ageMin: 8,
    calories: 55,
    nutrition: { carbs: 12, fiber: 1 },
    allergen: 'Gandum',
    tags: ['biji-bijian'],
    image: '/food/makaroni.jpg',
    fact: 'Makaroni bisa menjadi variasi karbohidrat selain nasi, cocok untuk melatih tekstur kasar.',
  },
  {
    id: 'oat',
    name: 'Oat',
    fullName: 'Havermut (Oat)',
    amount: '3 sdm',
    ageMin: 6,
    calories: 55,
    nutrition: { carbs: 10, fiber: 2.5 },
    allergen: 'Gandum',
    tags: ['biji-bijian', 'serat-tinggi'],
    image: '/food/oat.jpg',
    fact: 'Oat mengandung beta-glukan yang mendukung sistem pencernaan dan imunitas bayi.',
  },
  {
    id: 'singkong',
    name: 'Singkong',
    fullName: 'Singkong',
    amount: '60 g',
    ageMin: 7,
    calories: 60,
    nutrition: { carbs: 14, fiber: 1 },
    allergen: null,
    tags: ['umbi'],
    image: '/food/singkong.jpg',
    fact: 'Singkong adalah sumber energi lokal yang mudah didapat dan mudah dihaluskan untuk bayi.',
  },
];

// ── Companion / Vegetable Suggestions ──────────────────────────
export const companions = {
  fiber: [
    'Brokoli kukus halus', 'Bayam merah cincang', 'Wortel rebus parut',
    'Buncis rebus cincang', 'Labu siam kukus', 'Kacang panjang cincang',
    'Tomat cincang matang', 'Bayam hijau kukus',
  ],
  plantProtein: [
    'Edamame rebus halus', 'Tahu sutra kukus', 'Tempe kukus',
    'Kacang merah rebus', 'Kacang hijau kupas', 'Kacang polong manis',
  ],
  healthyFat: [
    'Minyak zaitun (1 sdt)', 'Unsalted butter (1 sdt)',
    'Minyak kelapa (1 sdt)', 'Santan segar matang (1 sdm)',
    'Alpukat halus (1 sdm)', 'Minyak canola (1 sdt)',
  ],
  cookingMethod: [
    'Dikukus lalu dihaluskan', 'Direbus perlahan', 'Slow cook bubur',
    'Dikukus dan ditumbuk kasar', 'Direbus sup bening', 'Tim perlahan',
  ],
};

// ── Nutrition Categories ───────────────────────────────────────
export const nutritionCategories = [
  { id: 'carbs',    label: 'Karbohidrat',     color: '#FFB200', emoji: '🌾' },
  { id: 'protein',  label: 'Protein Hewani',  color: '#E67422', emoji: '🍗' },
  { id: 'fat',      label: 'Lemak Baik',      color: '#637725', emoji: '🥑' },
  { id: 'fiber',    label: 'Serat',           color: '#47B300', emoji: '🥬' },
];

// ── Allergy/Exception Options ──────────────────────────────────
// These are the exception names users can select during onboarding.
// They map to the `allergen` field in proteins and carbs.
export const EXCEPTION_OPTIONS = [
  'Telur', 'Susu Sapi', 'Kacang Tanah', 'Kedelai',
  'Gandum', 'Ikan', 'Udang', 'Kerang',
];

// ── Reaction Options ───────────────────────────────────────────
export const reactionOptions = [
  { key: 'suka',       label: 'Tidak alergi dan suka',          emoji: '😄', color: '#47B300', bg: '#E8F7DC' },
  { key: 'tidak_suka', label: 'Tidak alergi tetapi tidak suka', emoji: '😐', color: '#FFB200', bg: '#FFF8DC' },
  { key: 'alergi',     label: 'Alergi pada makanan ini',        emoji: '⚠️', color: '#E67422', bg: '#FFF0E3' },
];

// ── Menu Generator ─────────────────────────────────────────────
// Dynamically creates menus from [Protein] + [Carb] combinations.
// Each generated menu has a deterministic ID based on protein + carb IDs.

function hashPair(proteinId, carbId) {
  // Simple deterministic hash for consistent menu IDs
  let hash = 0;
  const str = `${proteinId}_${carbId}`;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickRandom(arr, seed) {
  return arr[seed % arr.length];
}

export function createMenu(protein, carb) {
  const id = hashPair(protein.id, carb.id);
  const ageMin = Math.max(protein.ageMin, carb.ageMin);
  const totalCalories = protein.calories + carb.calories;

  const nutrition = {
    protein: protein.nutrition.protein || 0,
    carbs: carb.nutrition.carbs || 0,
    fat: (protein.nutrition.fat || 0) + (carb.nutrition.fat || 0),
    fiber: (protein.nutrition.fiber || 0) + (carb.nutrition.fiber || 0),
  };

  // Estimate cook time based on ingredients
  const cookMinutes = protein.tags.includes('nabati') ? 20 : 30;

  // Pick companion suggestions deterministically
  const seed = id;
  const companion = {
    fiber: pickRandom(companions.fiber, seed),
    plantProtein: pickRandom(companions.plantProtein, seed + 1),
    healthyFat: pickRandom(companions.healthyFat, seed + 2),
    cookingMethod: pickRandom(companions.cookingMethod, seed + 3),
  };

  return {
    id,
    name: `${protein.name} + ${carb.name}`,
    proteinData: protein,
    carbData: carb,
    ageMin,
    ageMax: 12,
    calories: totalCalories,
    cookMinutes,
    categories: ['protein', 'carbs'],
    texture: ageMin <= 7 ? ['Halus'] : ['Halus', 'Kasar'],
    description: `Kombinasi ${protein.fullName.toLowerCase()} dan ${carb.fullName.toLowerCase()} untuk MPASI bergizi.`,
    ingredients: [
      { name: protein.fullName, amount: protein.amount, category: 'protein' },
      { name: carb.fullName,    amount: carb.amount,    category: 'carbs' },
    ],
    nutrition,
    proteinImage: protein.image,
    carbImage: carb.image,
    image: protein.image,
    fact: protein.fact,
    companion,
  };
}

// ── Generate All Valid Menus ────────────────────────────────────
export function getAllMenus() {
  const allMenus = [];
  for (const protein of proteins) {
    for (const carb of carbs) {
      allMenus.push(createMenu(protein, carb));
    }
  }
  return allMenus;
}

// ── Filter Menus Based on Age and Exceptions ───────────────────
export function getFilteredMenus(ageMonths, exceptions = []) {
  return getAllMenus().filter(menu => {
    // Age check
    if (menu.ageMin > ageMonths || menu.ageMax < ageMonths) return false;

    // Exception/allergen check
    const proteinAllergen = menu.proteinData.allergen;
    const carbAllergen = menu.carbData.allergen;

    if (proteinAllergen && exceptions.includes(proteinAllergen)) return false;
    if (carbAllergen && exceptions.includes(carbAllergen)) return false;

    return true;
  });
}

// ── Intelligent Weekly Plan Generator ──────────────────────────
// Delegates to the adaptive recommendation engine.
// The engine uses history-based scoring, allergy filtering,
// variation rules, and exploration/exploitation balancing.
export { generateSmartWeeklyPlan as generateWeeklyPlan } from './recommendationEngine.js';

// ── Utility Exports ────────────────────────────────────────────
export function getMenuById(id) {
  return getAllMenus().find(m => m.id === id) || null;
}

export function getReaction(key) {
  return reactionOptions.find(r => r.key === key);
}

// Legacy compat: export babyProfile for default
export const babyProfile = {
  name: 'Aisha',
  ageMonths: 8,
  weightKg: 7.8,
  heightCm: 68,
  birthDate: '2025-08-15',
  exceptions: [],
  feedingTexture: 'Halus',
};

// ── Seed History Data ──────────────────────────────────────────
// Generate realistic seed history from the first few available menus
const seedMenus = getFilteredMenus(8, []);
export const historyData = seedMenus.length >= 5 ? [
  {
    id: 'h1',
    date: '2026-04-26',
    menuId: seedMenus[0].id,
    meal: 'Pagi',
    reaction: 'suka',
    note: 'Makan habis! Sangat suka.',
    amount: 'Habis',
    ingredients: seedMenus[0].ingredients,
  },
  {
    id: 'h2',
    date: '2026-04-26',
    menuId: seedMenus[1].id,
    meal: 'Siang',
    reaction: 'netral',
    note: 'Makan setengah porsi.',
    amount: 'Setengah',
    ingredients: seedMenus[1].ingredients,
  },
  {
    id: 'h3',
    date: '2026-04-25',
    menuId: seedMenus[2].id,
    meal: 'Pagi',
    reaction: 'tidak_suka',
    note: 'Tidak mau makan.',
    amount: 'Sedikit',
    ingredients: seedMenus[2].ingredients,
  },
  {
    id: 'h4',
    date: '2026-04-25',
    menuId: seedMenus[3].id,
    meal: 'Siang',
    reaction: 'suka',
    note: 'Lahap sekali!',
    amount: 'Habis',
    ingredients: seedMenus[3].ingredients,
  },
  {
    id: 'h5',
    date: '2026-04-24',
    menuId: seedMenus[4].id,
    meal: 'Malam',
    reaction: 'suka',
    note: 'Habis semua.',
    amount: 'Habis',
    ingredients: seedMenus[4].ingredients,
  },
] : [];
