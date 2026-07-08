import { type Food } from "@/lib/foods";

export type DayRecord = {
  date: string;
  weight: number;
  steps: number;
  meals: Food[];
  workoutComplete: boolean;
  waterComplete: boolean;
};

export type DailyRecords = Record<string, DayRecord>;

const STORAGE_KEY = "lion-daily-records";

export function getDateKey(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString().split("T")[0];
}

export function createEmptyDay(date: string): DayRecord {
  return {
    date,
    weight: 81,
    steps: 0,
    meals: [],
    workoutComplete: false,
    waterComplete: false,
  };
}

export function loadDailyRecords(): DailyRecords {
  if (typeof window === "undefined") return {};

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    const today = getDateKey();

    return {
      [today]: createEmptyDay(today),
    };
  }

  return JSON.parse(saved);
}

export function saveDailyRecords(records: DailyRecords) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function getDay(records: DailyRecords, date: string): DayRecord {
  return records[date] ?? createEmptyDay(date);
}

export function updateDay(
  records: DailyRecords,
  date: string,
  updates: Partial<DayRecord>
): DailyRecords {
  return {
    ...records,
    [date]: {
      ...(records[date] ?? createEmptyDay(date)),
      ...updates,
    },
  };
}

export function addMealToDay(
  records: DailyRecords,
  date: string,
  meal: Food
): DailyRecords {
  const day = getDay(records, date);

  return updateDay(records, date, {
    meals: [...day.meals, meal],
  });
}

export function clearMealsFromDay(
  records: DailyRecords,
  date: string
): DailyRecords {
  return updateDay(records, date, {
    meals: [],
  });
}

export function getNutritionTotals(day: DayRecord) {
  return day.meals.reduce(
    (sum, meal) => ({
      calories: sum.calories + meal.calories,
      protein: sum.protein + meal.protein,
      carbs: sum.carbs + meal.carbs,
      fat: sum.fat + meal.fat,
    }),
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    }
  );
}

export function getLastSevenDays() {
  return Array.from({ length: 7 }, (_, index) => getDateKey(index));
}