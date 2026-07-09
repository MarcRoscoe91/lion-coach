"use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/navigation/BottomNav";
import {
  createFood,
  deleteFood,
  loadFoods,
  saveFoods,
  sortFoods,
  toggleFavourite,
  updateFood,
  type MealCategory,
  type SavedFood,
} from "@/lib/foodStore";
import {
  addMealToDay,
  clearMealsFromDay,
  getDay,
  getDateKey,
  getNutritionTotals,
  loadDailyRecords,
  saveDailyRecords,
  type DailyRecords,
} from "@/lib/dailyStore";

const categories: MealCategory[] = ["Breakfast", "Lunch", "Dinner", "Snacks"];

export default function NutritionPage() {
  const todayKey = getDateKey();

  const [records, setRecords] = useState<DailyRecords>({});
  const [foods, setFoods] = useState<SavedFood[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [mealName, setMealName] = useState("");
  const [category, setCategory] = useState<MealCategory>("Breakfast");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");

  const calorieTarget = 2250;
  const proteinTarget = 210;
  const carbsTarget = 220;
  const fatTarget = 60;

  useEffect(() => {
    setRecords(loadDailyRecords());
    setFoods(loadFoods());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    saveDailyRecords(records);
    saveFoods(foods);
  }, [records, foods, loaded]);

  const today = getDay(records, todayKey);
  const totals = getNutritionTotals(today);
  const sortedFoods = sortFoods(foods);

  function resetForm() {
    setEditingId(null);
    setMealName("");
    setCategory("Breakfast");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  }

  function addFood(food: SavedFood) {
    setRecords((current) => addMealToDay(current, todayKey, food));
  }

  function clearMeals() {
    setRecords((current) => clearMealsFromDay(current, todayKey));
  }

  function saveMeal() {
    if (!mealName.trim()) return;

    const payload = {
      name: mealName,
      calories: Number(calories) || 0,
      protein: Number(protein) || 0,
      carbs: Number(carbs) || 0,
      fat: Number(fat) || 0,
      category,
    };

    if (editingId) {
      setFoods((current) => updateFood(current, editingId, payload));
    } else {
      setFoods((current) => [createFood(payload), ...current]);
    }

    resetForm();
  }

  function startEditing(food: SavedFood) {
    setEditingId(food.id);
    setMealName(food.name);
    setCategory(food.category ?? "Breakfast");
    setCalories(String(food.calories));
    setProtein(String(food.protein));
    setCarbs(String(food.carbs));
    setFat(String(food.fat));
  }

  return (
    <main className="min-h-screen bg-black p-5 text-white">
      <div className="mx-auto max-w-md pb-32">
        <header>
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
            Nutrition
          </p>

          <h1 className="mt-2 text-4xl font-black">Fuel The Lion</h1>

          <p className="mt-2 text-zinc-400">
            Create meals, favourite them, and log food in one tap.
          </p>
        </header>

        <section className="mt-8 grid grid-cols-2 gap-4">
          <MacroCard title="Calories" current={totals.calories} target={calorieTarget} />
          <MacroCard title="Protein" current={totals.protein} target={proteinTarget} />
          <MacroCard title="Carbs" current={totals.carbs} target={carbsTarget} />
          <MacroCard title="Fat" current={totals.fat} target={fatTarget} />
        </section>

        <section className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
                Today&apos;s Meals
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {today.meals.length} logged
              </h2>
            </div>

            <button
              onClick={clearMeals}
              className="rounded-2xl bg-zinc-800 px-4 py-3 text-sm font-bold text-zinc-300"
            >
              Clear
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {today.meals.length === 0 ? (
              <p className="text-zinc-500">No meals logged yet.</p>
            ) : (
              today.meals.map((meal, index) => (
                <div
                  key={`${meal.id}-${index}`}
                  className="rounded-2xl bg-zinc-800 p-4"
                >
                  <div className="flex justify-between">
                    <p className="font-bold">{meal.name}</p>
                    <p className="text-yellow-400">{meal.calories} kcal</p>
                  </div>

                  <p className="mt-1 text-sm text-zinc-400">
                    {meal.protein}g protein • {meal.carbs}g carbs •{" "}
                    {meal.fat}g fat
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-yellow-500/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            {editingId ? "Edit Meal" : "Create Meal"}
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            {editingId ? "Update your meal" : "Add your own meal"}
          </h2>

          <div className="mt-5 space-y-3">
            <input
              value={mealName}
              onChange={(event) => setMealName(event.target.value)}
              placeholder="Meal name"
              className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as MealCategory)}
              className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <div className="grid grid-cols-2 gap-3">
              <input value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Calories" inputMode="numeric" className="rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600" />
              <input value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="Protein" inputMode="numeric" className="rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600" />
              <input value={carbs} onChange={(e) => setCarbs(e.target.value)} placeholder="Carbs" inputMode="numeric" className="rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600" />
              <input value={fat} onChange={(e) => setFat(e.target.value)} placeholder="Fat" inputMode="numeric" className="rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600" />
            </div>

            <button
              onClick={saveMeal}
              className="w-full rounded-2xl bg-yellow-400 py-4 font-bold text-black active:scale-95"
            >
              {editingId ? "Save Changes" : "Save Meal"}
            </button>

            {editingId && (
              <button
                onClick={resetForm}
                className="w-full rounded-2xl bg-zinc-800 py-4 font-bold text-zinc-300"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">My Meals</h2>

            <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
              One tap
            </span>
          </div>

          <div className="space-y-4">
            {sortedFoods.map((food) => (
              <div
                key={food.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <button
                    onClick={() => addFood(food)}
                    className="flex-1 text-left active:scale-[0.98]"
                  >
                    <h3 className="text-xl font-bold">
                      {food.favourite ? "⭐ " : ""}
                      {food.name}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      {food.category ?? "Meal"}
                    </p>

                    <p className="mt-2 text-zinc-400">
                      {food.calories} kcal • {food.protein}g protein •{" "}
                      {food.carbs}g carbs • {food.fat}g fat
                    </p>
                  </button>

                  <button
                    onClick={() =>
                      setFoods((current) => toggleFavourite(current, food.id))
                    }
                    className="rounded-2xl bg-zinc-800 px-3 py-2 text-lg"
                  >
                    {food.favourite ? "⭐" : "☆"}
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <button
                    onClick={() => addFood(food)}
                    className="rounded-2xl bg-yellow-400 py-3 font-bold text-black"
                  >
                    Log
                  </button>

                  <button
                    onClick={() => startEditing(food)}
                    className="rounded-2xl bg-zinc-800 py-3 font-bold text-zinc-300"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      setFoods((current) => deleteFood(current, food.id))
                    }
                    className="rounded-2xl bg-zinc-800 py-3 font-bold text-zinc-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}

function MacroCard({
  title,
  current,
  target,
}: {
  title: string;
  current: number;
  target: number;
}) {
  const percent = Math.min(100, (current / target) * 100);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <p className="text-sm text-zinc-400">{title}</p>
      <h2 className="mt-2 text-3xl font-black">{current}</h2>
      <p className="mt-1 text-sm text-zinc-500">of {target}</p>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-yellow-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}