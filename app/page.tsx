"use client";

import { useEffect, useState } from "react";

const meals = [
  { name: "🍳 Breakfast", calories: 493, protein: 46, carbs: 54, fat: 9 },
  { name: "🍗 Chicken & Rice", calories: 333, protein: 36, carbs: 32, fat: 4 },
  { name: "🥩 Mince & Rice", calories: 296, protein: 26, carbs: 32, fat: 5 },
  { name: "🥣 Protein Bowl", calories: 365, protein: 51, carbs: 20, fat: 7 },
  { name: "🥤 Post Workout", calories: 371, protein: 28, carbs: 55, fat: 4 },
];

export default function Home() {
  const [weight, setWeight] = useState(81);
  const [loggedMeals, setLoggedMeals] = useState<typeof meals>([]);
  const [loaded, setLoaded] = useState(false);

  const targetWeight = 75;

  const targets = {
    calories: 2250,
    protein: 210,
    carbs: 220,
    fat: 60,
  };

  useEffect(() => {
    const savedWeight = localStorage.getItem("lion-weight");
    const savedMeals = localStorage.getItem("lion-meals");

    if (savedWeight) setWeight(Number(savedWeight));
    if (savedMeals) setLoggedMeals(JSON.parse(savedMeals));

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("lion-weight", String(weight));
    localStorage.setItem("lion-meals", JSON.stringify(loggedMeals));
  }, [weight, loggedMeals, loaded]);

  const totals = loggedMeals.reduce(
    (sum, meal) => ({
      calories: sum.calories + meal.calories,
      protein: sum.protein + meal.protein,
      carbs: sum.carbs + meal.carbs,
      fat: sum.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const lionScore = Math.round(
    ((totals.calories > 0 ? 25 : 0) +
      (totals.protein >= 100 ? 25 : totals.protein > 0 ? 15 : 0) +
      (weight <= 81 ? 25 : 10) +
      15) 
  );

  return (
    <main className="min-h-screen bg-black text-white p-5">
      <div className="max-w-md mx-auto pb-32">
        <header className="text-center pt-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-yellow-500/30 bg-zinc-950 text-5xl shadow-2xl">
            🦁
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-yellow-400">
            Lion Coach
          </h1>

          <p className="mt-1 text-zinc-500">Fitness command centre</p>
        </header>

        <section className="mt-8 rounded-3xl border border-yellow-500/20 bg-yellow-400/10 p-6">
          <p className="text-sm text-yellow-400">Lion Score</p>

          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-6xl font-bold">{lionScore}</p>
              <p className="mt-1 text-zinc-400">out of 100</p>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-yellow-400">
                {lionScore >= 90 ? "Excellent" : lionScore >= 70 ? "Good" : "Build"}
              </p>
              <p className="text-sm text-zinc-500">Today</p>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all duration-500"
              style={{ width: `${lionScore}%` }}
            />
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
          <p className="text-sm text-zinc-400">Current Weight</p>

          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-6xl font-bold">{weight.toFixed(1)}kg</p>
              <p className="mt-2 text-green-400">
                {(weight - targetWeight).toFixed(1)}kg to target
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-zinc-500">Target</p>
              <p className="text-2xl font-bold text-yellow-400">
                {targetWeight}kg
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setWeight(Number((weight - 0.1).toFixed(1)))}
              className="flex-1 rounded-2xl bg-zinc-800 py-4 text-2xl font-bold active:scale-95"
            >
              -
            </button>

            <button
              onClick={() => setWeight(Number((weight + 0.1).toFixed(1)))}
              className="flex-1 rounded-2xl bg-yellow-400 py-4 text-2xl font-bold text-black active:scale-95"
            >
              +
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Nutrition</h2>

          <div className="mt-5 space-y-5">
            <MacroBar label="Calories" value={totals.calories} target={targets.calories} suffix="kcal" />
            <MacroBar label="Protein" value={totals.protein} target={targets.protein} suffix="g" />
            <MacroBar label="Carbs" value={totals.carbs} target={targets.carbs} suffix="g" />
            <MacroBar label="Fats" value={totals.fat} target={targets.fat} suffix="g" />
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Today’s Workout</h2>

          <div className="mt-4 rounded-2xl bg-zinc-800 p-4">
            <p className="text-xl font-bold">🏋️ Push Day</p>
            <p className="mt-1 text-sm text-zinc-400">
              Chest, shoulders, triceps + 30 min cardio
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-yellow-500/20 bg-yellow-400/10 p-6">
          <h2 className="text-2xl font-bold text-yellow-400">Coach’s Corner</h2>

          <p className="mt-3 leading-7 text-zinc-300">
            You’re set up for a controlled cut from {weight.toFixed(1)}kg to{" "}
            {targetWeight}kg. Keep protein high, stay consistent, and aim for
            around 0.5kg loss per week.
          </p>
        </section>

        <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Add Meal</h2>

          <div className="mt-4 space-y-3">
            {meals.map((meal) => (
              <button
                key={meal.name}
                onClick={() => setLoggedMeals([...loggedMeals, meal])}
                className="w-full rounded-2xl bg-zinc-800 p-4 text-left active:scale-[0.98]"
              >
                <div className="flex justify-between">
                  <span className="font-bold">{meal.name}</span>
                  <span className="text-yellow-400">+ Add</span>
                </div>

                <p className="mt-1 text-sm text-zinc-400">
                  {meal.calories} kcal • {meal.protein}g protein • {meal.carbs}g
                  carbs • {meal.fat}g fat
                </p>
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={() => setLoggedMeals([])}
          className="mt-6 w-full rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black active:scale-95"
        >
          Clear Meals
        </button>
      </div>

      <BottomNav />
    </main>
  );
}

function MacroBar({
  label,
  value,
  target,
  suffix,
}: {
  label: string;
  value: number;
  target: number;
  suffix: string;
}) {
  const percent = Math.min(100, (value / target) * 100);
  const remaining = Math.max(0, target - value);

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold">{label}</p>
        <p className="text-zinc-400">
          {value} / {target} {suffix}
        </p>
      </div>

      <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-yellow-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-1 text-sm text-zinc-500">
        {remaining} {suffix} remaining
      </p>
    </div>
  );
}

function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-3 backdrop-blur">
      <div className="grid grid-cols-5 text-center text-xs text-zinc-400">
        <div className="text-yellow-400">
          🏠
          <br />
          Home
        </div>
        <div>
          🍽️
          <br />
          Food
        </div>
        <div>
          🏋️
          <br />
          Train
        </div>
        <div>
          📈
          <br />
          Progress
        </div>
        <div>
          ⚙️
          <br />
          Settings
        </div>
      </div>
    </nav>
  );
}