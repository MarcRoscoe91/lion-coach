"use client";

import { useEffect, useState } from "react";

import CoachCard from "@/components/cards/CoachCard";
import LionScoreCard from "@/components/cards/LionScoreCard";
import NutritionCard from "@/components/cards/NutritionCard";
import WeightCard from "@/components/cards/WeightCard";
import WorkoutCard from "@/components/cards/WorkoutCard";
import BottomNav from "@/components/navigation/BottomNav";

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

  const lionScore = Math.min(
    100,
    Math.round(
      (totals.calories > 0 ? 25 : 0) +
        (totals.protein >= 100 ? 25 : totals.protein > 0 ? 15 : 0) +
        (weight <= 81 ? 25 : 10) +
        15
    )
  );

  return (
    <main className="min-h-screen bg-black text-white p-5">
      <div className="mx-auto max-w-md pb-32">
        <header className="pt-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-yellow-500/30 bg-zinc-950 text-5xl shadow-2xl">
            🦁
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-yellow-400">
            Lion Coach
          </h1>

          <p className="mt-1 text-zinc-500">Fitness command centre</p>
        </header>

        <LionScoreCard score={lionScore} />

        <WeightCard
          weight={weight}
          targetWeight={targetWeight}
          onDecrease={() => setWeight(Number((weight - 0.1).toFixed(1)))}
          onIncrease={() => setWeight(Number((weight + 0.1).toFixed(1)))}
        />

        <NutritionCard totals={totals} targets={targets} />

        <WorkoutCard />

        <CoachCard weight={weight} targetWeight={targetWeight} />

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
                  {meal.calories} kcal • {meal.protein}g protein •{" "}
                  {meal.carbs}g carbs • {meal.fat}g fat
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