"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import AchievementsCard from "@/components/cards/AchievementsCard";
import StreakCard from "@/components/cards/StreakCard";
import XPCard from "@/components/cards/XPCard";
import BottomNav from "@/components/navigation/BottomNav";
import { defaultProfile, type UserProfile } from "@/lib/profile";
import { calculateDailyXP } from "@/lib/xp";

const meals = [
  { name: "🍳 Breakfast", calories: 493, protein: 46 },
  { name: "🍗 Chicken & Rice", calories: 333, protein: 36 },
  { name: "🥩 Mince & Rice", calories: 296, protein: 26 },
  { name: "🥣 Protein Bowl", calories: 365, protein: 51 },
  { name: "🥤 Post Workout", calories: 371, protein: 28 },
];

export default function Home() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [weight, setWeight] = useState(81);
  const [steps, setSteps] = useState(0);
  const [loggedMeals, setLoggedMeals] = useState<typeof meals>([]);
  const [loaded, setLoaded] = useState(false);

  const targetWeight = 75;
  const caloriesTarget = 2250;
  const proteinTarget = 210;
  const stepsTarget = 10000;

  useEffect(() => {
    const savedProfile = localStorage.getItem("lion-profile");
    const savedWeight = localStorage.getItem("lion-weight");
    const savedSteps = localStorage.getItem("lion-steps");
    const savedMeals = localStorage.getItem("lion-meals");

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedWeight) setWeight(Number(savedWeight));
    if (savedSteps) setSteps(Number(savedSteps));
    if (savedMeals) setLoggedMeals(JSON.parse(savedMeals));

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("lion-profile", JSON.stringify(profile));
    localStorage.setItem("lion-weight", String(weight));
    localStorage.setItem("lion-steps", String(steps));
    localStorage.setItem("lion-meals", JSON.stringify(loggedMeals));
  }, [profile, weight, steps, loggedMeals, loaded]);

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

  const dailyXP = calculateDailyXP({
    caloriesComplete,
    proteinComplete,
    stepsComplete,
    workoutComplete,
    waterComplete,
  });

  const completedObjectives = [
    caloriesComplete,
    proteinComplete,
    stepsComplete,
    workoutComplete,
    waterComplete,
  ].filter(Boolean).length;

  function addMeal(meal: (typeof meals)[0]) {
    setLoggedMeals([...loggedMeals, meal]);
  }

  function claimXP() {
    setProfile((current) => ({
      ...current,
      xp: current.xp + dailyXP,
      streak: completedObjectives === 5 ? current.streak + 1 : current.streak,
      bestStreak:
        completedObjectives === 5
          ? Math.max(current.bestStreak, current.streak + 1)
          : current.bestStreak,
      perfectDays:
        completedObjectives === 5
          ? current.perfectDays + 1
          : current.perfectDays,
    }));
  }

  function resetDay() {
    setLoggedMeals([]);
    setSteps(0);
  }

  return (
    <main className="min-h-screen bg-black text-white p-5">
      <div className="mx-auto max-w-md pb-32">
        <header className="pt-4 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl border border-yellow-500/20 bg-black shadow-[0_0_45px_rgba(250,204,21,0.22)]">
            <Image
              src="/logo.png"
              alt="Lion Coach"
              width={110}
              height={110}
              className="rounded-2xl"
              priority
            />
          </div>

          <p className="mt-5 text-sm uppercase tracking-[0.35em] text-yellow-400">
            Lion Coach
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight">
            Good Morning {profile.name}
          </h1>

          <p className="mt-2 text-zinc-500">Become The Lion</p>
        </header>

        <XPCard xp={profile.xp + dailyXP} />

        <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
                Today&apos;s XP
              </p>

              <h2 className="mt-2 text-4xl font-black">
                +{dailyXP} XP
              </h2>

              <p className="mt-1 text-zinc-400">
                {completedObjectives} / 5 objectives complete
              </p>
            </div>

            <button
              onClick={claimXP}
              disabled={dailyXP === 0}
              className="rounded-2xl bg-yellow-400 px-5 py-3 font-bold text-black disabled:opacity-40"
            >
              Claim
            </button>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Today&apos;s Objectives</h2>

          <div className="mt-4 space-y-3">
            <ObjectiveRow
              icon="🎯"
              label="Stay within calories"
              xp={50}
              complete={caloriesComplete}
            />

            <ObjectiveRow
              icon="💪"
              label="Hit protein target"
              xp={75}
              complete={proteinComplete}
            />

            <ObjectiveRow
              icon="🚶"
              label="Hit 10,000 steps"
              xp={50}
              complete={stepsComplete}
            />

            <ObjectiveRow
              icon="🏋️"
              label="Complete Push Day"
              xp={150}
              complete={workoutComplete}
            />

            <ObjectiveRow
              icon="💧"
              label="Drink 3L water"
              xp={25}
              complete={waterComplete}
            />
          </div>
        </section>

        <StreakCard
          streak={profile.streak}
          bestStreak={profile.bestStreak}
          perfectDays={profile.perfectDays}
        />

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
            You&apos;ve got {dailyXP} XP available today. Build your streak,
            hit your protein, and complete Push Day.
          </p>
        </section>

        <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Quick Log Food</h2>

          <div className="mt-4 space-y-3">
            {meals.map((meal) => (
              <button
                key={meal.name}
                onClick={() => addMeal(meal)}
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

        <AchievementsCard />

        <button
          onClick={resetDay}
          className="mt-6 w-full rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black active:scale-95"
        >
          Reset Day
        </button>
      </div>

      <BottomNav />
    </main>
  );
}

function ObjectiveRow({
  icon,
  label,
  xp,
  complete,
}: {
  icon: string;
  label: string;
  xp: number;
  complete: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-zinc-800 p-4">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>

        <div>
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-yellow-400">+{xp} XP</p>
        </div>
      </div>

      <span className={complete ? "text-green-400" : "text-zinc-500"}>
        {complete ? "✓" : "○"}
      </span>
    </div>
  );
}