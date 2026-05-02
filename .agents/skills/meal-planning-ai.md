# Skill: meal-planning-ai

Purpose:
Generate personalized weekly meal plans, ingredient lists, and detailed menus based on user input.

---

## Capabilities:

### 1. Planning Feature
- Accept user inputs:
  - infant age
  - dietary preferences
  - allergies / restrictions
  - texture preferences
- Output:
  - personalized meal plan rules
  - allowed / excluded food types

---

### 2. Weekly Plan Feature
- Generate 7-day meal plan
- 3 meals per day
- Ensure:
  - variation (no repetitive meals)
  - balanced nutrition
- Output structure:
  - day → meals → menu items

---

### 3. Ingredients Feature
- Aggregate all ingredients from weekly plan
- Calculate total quantity per ingredient
- Output:
  - ingredient name
  - total quantity
  - unit (grams, ml, etc.)

---

### 4. Detail Menu Feature
- For each meal:
  - list ingredients
  - specify quantity per serving
- Optional:
  - simple preparation steps

---

## Rules:
- **Menu Naming & Composition:** All menus MUST strictly follow the `[Protein] + [Carbohydrate]` format. Do NOT include vegetables in the base menu structure.
- **Controlled Repetition:** Menus CAN and SHOULD repeat to enable meaningful history tracking and exposure learning for the infant, but repetition must be LIMITED (e.g., avoid consecutive identical meals, ensure variation across the week).
- **Dietary Restrictions:** Respect dietary restrictions and allergies strictly.
- **History Tracking:** Track each menu combination's consumption frequency and specific reactions (Tidak alergi dan suka, Tidak alergi tetapi tidak suka, Alergi pada makanan ini).
- Keep output structured and consistent (JSON-friendly).
- Prioritize simple logic (rule-based) for MVP.