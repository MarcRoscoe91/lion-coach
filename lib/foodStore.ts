import { defaultFoods, type Food } from "@/lib/foods";

const STORAGE_KEY = "lion-saved-foods";

export type MealCategory = "Breakfast" | "Lunch" | "Dinner" | "Snacks";

export type SavedFood = Food & {
  favourite?: boolean;
  category?: MealCategory;
};

export function loadFoods(): SavedFood[] {
  if (typeof window === "undefined") return defaultFoods;

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return defaultFoods;

  try {
    return JSON.parse(saved);
  } catch {
    return defaultFoods;
  }
}

export function saveFoods(foods: SavedFood[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(foods));
}

export function createFoodId(name: string) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
}

export function createFood({
  name,
  calories,
  protein,
  carbs,
  fat,
  category,
}: {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: MealCategory;
}): SavedFood {
  return {
    id: createFoodId(name),
    name,
    calories,
    protein,
    carbs,
    fat,
    category,
    favourite: false,
  };
}

export function toggleFavourite(foods: SavedFood[], foodId: string) {
  return foods.map((food) =>
    food.id === foodId ? { ...food, favourite: !food.favourite } : food
  );
}

export function deleteFood(foods: SavedFood[], foodId: string) {
  return foods.filter((food) => food.id !== foodId);
}

export function updateFood(
  foods: SavedFood[],
  foodId: string,
  updates: Partial<SavedFood>
) {
  return foods.map((food) =>
    food.id === foodId ? { ...food, ...updates } : food
  );
}

export function sortFoods(foods: SavedFood[]) {
  return [...foods].sort((a, b) => {
    if (a.favourite && !b.favourite) return -1;
    if (!a.favourite && b.favourite) return 1;

    return a.name.localeCompare(b.name);
  });
}