"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [steps, setSteps] = useState(0);
  const [loggedMeals, setLoggedMeals] = useState<typeof meals>([]);
  const [loaded, setLoaded] = useState(false);

  const targetWeight = 75;
  const caloriesTarget = 2250;
  const proteinTarget = 210;
  const stepsTarget = 10000;

  useEffect(() => {
    const savedWeight = localStorage.getItem("lion-weight");
    const savedSteps = localStorage.getItem("lion-steps");
    const savedMeals = localStorage.getItem("lion-meals");

    if (savedWeight) setWeight(Number(savedWeight));
    if (savedSteps) setSteps(Number(savedSteps));
    if (savedMeals) setLoggedMeals(JSON.parse(savedMeals));

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("lion-weight", String(weight));
    localStorage.setItem("lion-steps", String(steps));
    localStorage.setItem("lion-meals", JSON.stringify(loggedMeals));
  }, [weight, steps, loggedMeals, loaded]);

  const totals = loggedMeals.reduce(
    (sum, meal) => ({
      calories: sum.calories + meal.calories,
      protein: sum.protein + meal.protein,
    }),
    { calories: 0, protein: 0 }
  );

  const caloriesComplete =
    totals.calories > 0 && totals.calories <= caloriesTarget;

  const proteinComplete = totals.protein >= proteinTarget;
  const stepsComplete = steps >= stepsTarget;
  const workoutComplete = false;
  const waterComplete = false;

  const completedMissions = [
    caloriesComplete,
    proteinComplete,
    stepsComplete,
    workoutComplete,
    waterComplete,
  ].filter(Boolean).length;

  const lionScore =
    (caloriesComplete ? 20 : totals.calories > 0 ? 12 : 0) +
    (proteinComplete ? 20 : totals.protein > 0 ? 12 : 0) +
    (stepsComplete ? 20 : steps > 0 ? 10 : 0) +
    (workoutComplete ? 25 : 0) +
    (waterComplete ? 10 : 0) +
    5;

  return (
    <main className="min-h-screen bg-black text-white p-5">
      <div className="mx-auto max-w-md pb-32">
        <header className="pt-5 text-center">
          <Image
            src="/logo.png"
            alt="Lion Coach"
            width={150}
            height={150}
            className="mx-auto drop-shadow-[0_0_35px_rgba(250,204,21,0.25)]"
            priority
          />

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
            Good Morning, Marc
          </h1>

          <p className="mt-2 text-zinc-500">Become The Lion</p>
        </header>

        <section className="mt-8 rounded-[2rem] border border-yellow-500/20 bg-yellow-400/10 p-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Lion Score
          </p>

          <p className="mt-4 text-7xl font-black">{lionScore}</p>

          <p className="mt-2 text-xl font-bold text-yellow-400">
            {lionScore >= 90 ? "Excellent" : lionScore >= 70 ? "Good" : "Build"}
          </p>

          <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all duration-500"
              style={{ width: `${Math.min(100, lionScore)}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-zinc-400">
            {completedMissions} / 5 missions complete
          </p>
        </section>

        <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-400">Current Weight</p>

          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-6xl font-black">{weight.toFixed(1)}kg</p>
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

        <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Steps</h2>

          <div className="mt-4 flex items-end justify-between">
            <div>
              <p className="text-5xl font-black">{steps.toLocaleString()}</p>
              <p className="mt-1 text-sm text-zinc-400">
                Target {stepsTarget.toLocaleString()} steps
              </p>
            </div>

            <p className={stepsComplete ? "text-green-400" : "text-yellow-400"}>
              {stepsComplete ? "Complete" : `${stepsTarget - steps} left`}
            </p>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all duration-500"
              style={{
                width: `${Math.min(100, (steps / stepsTarget) * 100)}%`,
              }}
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setSteps(Math.max(0, steps - 500))}
              className="flex-1 rounded-2xl bg-zinc-800 py-4 text-xl font-bold active:scale-95"
            >
              -500
            </button>

            <button
              onClick={() => setSteps(steps + 500)}
              className="flex-1 rounded-2xl bg-yellow-400 py-4 text-xl font-bold text-black active:scale-95"
            >
              +500
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Today&apos;s Mission</h2>

          <div className="mt-4 space-y-3">
            <MissionRow icon="🎯" label="Stay within calories" complete={caloriesComplete} />
            <MissionRow icon="💪" label="Hit protein target" complete={proteinComplete} />
            <MissionRow icon="🚶" label="Hit 10,000 steps" complete={stepsComplete} />
            <MissionRow icon="🏋️" label="Complete Push Day" complete={workoutComplete} />
            <MissionRow icon="💧" label="Drink 3L water" complete={waterComplete} />
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Today&apos;s Workout</h2>

          <div className="mt-4 rounded-2xl bg-zinc-800 p-4">
            <p className="text-xl font-bold">🏋️ Push Day</p>
            <p className="mt-1 text-sm text-zinc-400">
              Chest, shoulders, triceps + 30 min cardio
            </p>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-yellow-500/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Coach&apos;s Corner
          </p>

          <p className="mt-4 text-lg leading-8 text-zinc-200">
            You&apos;re on pace to reach {targetWeight}kg. Today&apos;s focus:
            hit your protein target, build your steps, and complete Push Day.
          </p>
        </section>

        <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Quick Log Food</h2>

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
                  {meal.calories} kcal • {meal.protein}g protein
                </p>
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={() => {
            setLoggedMeals([]);
            setSteps(0);
          }}
          className="mt-6 w-full rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black active:scale-95"
        >
          Reset Day
        </button>
      </div>

      <BottomNav />
    </main>
  );
}

function MissionRow({
  icon,
  label,
  complete,
}: {
  icon: string;
  label: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-zinc-800 p-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-semibold">{label}</span>
      </div>

      <span className={complete ? "text-green-400" : "text-zinc-500"}>
        {complete ? "✓" : "○"}
      </span>
    </div>
  );
}