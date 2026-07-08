"use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/navigation/BottomNav";
import { defaultFoods, type Food } from "@/lib/foods";
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

export default function NutritionPage() {
  const todayKey = getDateKey();

  const [records, setRecords] = useState<DailyRecords>({});
  const [loaded, setLoaded] = useState(false);

  const calorieTarget = 2250;
  const proteinTarget = 210;
  const carbsTarget = 220;
  const fatTarget = 60;

  useEffect(() => {
    setRecords(loadDailyRecords());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveDailyRecords(records);
  }, [records, loaded]);

  const today = getDay(records, todayKey);
  const totals = getNutritionTotals(today);

  function addFood(food: Food) {
    setRecords((current) => addMealToDay(current, todayKey, food));
  }

  function clearMeals() {
    setRecords((current) => clearMealsFromDay(current, todayKey));
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
            Log meals and complete your nutrition objectives.
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

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">Saved Foods</h2>

            <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
              One tap
            </span>
          </div>

          <div className="space-y-4">
            {defaultFoods.map((food) => (
              <button
                key={food.id}
                onClick={() => addFood(food)}
                className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-left active:scale-[0.98]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{food.name}</h3>

                    <p className="mt-1 text-zinc-400">
                      {food.calories} kcal • {food.protein}g protein
                    </p>
                  </div>

                  <span className="text-3xl text-yellow-400">+</span>
                </div>
              </button>
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