"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import AchievementsCard from "@/components/cards/AchievementsCard";
import StreakCard from "@/components/cards/StreakCard";
import XPCard from "@/components/cards/XPCard";
import BottomNav from "@/components/navigation/BottomNav";
import { calculateDailyXP } from "@/lib/xp";

const meals = [
  { name: "🍳 Breakfast", calories: 493, protein: 46 },
  { name: "🍗 Chicken & Rice", calories: 333, protein: 36 },
  { name: "🥩 Mince & Rice", calories: 296, protein: 26 },
  { name: "🥣 Protein Bowl", calories: 365, protein: 51 },
  { name: "🥤 Post Workout", calories: 371, protein: 28 },
];

type Meal = (typeof meals)[0];

type DayRecord = {
  date: string;
  weight: number;
  steps: number;
  meals: Meal[];
  workoutComplete: boolean;
  waterComplete: boolean;
};

type Records = Record<string, DayRecord>;

function getDateKey(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return date.toISOString().split("T")[0];
}

function formatDayLabel(dateKey: string, index: number) {
  const date = new Date(dateKey);

  if (index === 0) return "Today";
  if (index === 1) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function createEmptyDay(date: string): DayRecord {
  return {
    date,
    weight: 81,
    steps: 0,
    meals: [],
    workoutComplete: false,
    waterComplete: false,
  };
}

export default function Home() {
  const lastSevenDays = useMemo(
    () => Array.from({ length: 7 }, (_, index) => getDateKey(index)),
    []
  );

  const todayKey = lastSevenDays[0];

  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [records, setRecords] = useState<Records>({});
  const [loaded, setLoaded] = useState(false);

  const targetWeight = 75;
  const caloriesTarget = 2250;
  const proteinTarget = 210;
  const stepsTarget = 10000;

  useEffect(() => {
    const savedRecords = localStorage.getItem("lion-daily-records");

    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    } else {
      setRecords({
        [todayKey]: createEmptyDay(todayKey),
      });
    }

    setLoaded(true);
  }, [todayKey]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("lion-daily-records", JSON.stringify(records));
  }, [records, loaded]);

  const selectedRecord = records[selectedDate] ?? createEmptyDay(selectedDate);

  const totals = selectedRecord.meals.reduce(
    (sum, meal) => ({
      calories: sum.calories + meal.calories,
      protein: sum.protein + meal.protein,
    }),
    { calories: 0, protein: 0 }
  );

  const caloriesComplete =
    totals.calories > 0 && totals.calories <= caloriesTarget;

  const proteinComplete = totals.protein >= proteinTarget;
  const stepsComplete = selectedRecord.steps >= stepsTarget;

  const dailyXP = calculateDailyXP({
    caloriesComplete,
    proteinComplete,
    stepsComplete,
    workoutComplete: selectedRecord.workoutComplete,
    waterComplete: selectedRecord.waterComplete,
  });

  const completedObjectives = [
    caloriesComplete,
    proteinComplete,
    stepsComplete,
    selectedRecord.workoutComplete,
    selectedRecord.waterComplete,
  ].filter(Boolean).length;

  const totalXP = Object.values(records).reduce((total, record) => {
    const recordTotals = record.meals.reduce(
      (sum, meal) => ({
        calories: sum.calories + meal.calories,
        protein: sum.protein + meal.protein,
      }),
      { calories: 0, protein: 0 }
    );

    return (
      total +
      calculateDailyXP({
        caloriesComplete:
          recordTotals.calories > 0 && recordTotals.calories <= caloriesTarget,
        proteinComplete: recordTotals.protein >= proteinTarget,
        stepsComplete: record.steps >= stepsTarget,
        workoutComplete: record.workoutComplete,
        waterComplete: record.waterComplete,
      })
    );
  }, 0);

  const perfectDays = Object.values(records).filter((record) => {
    const recordTotals = record.meals.reduce(
      (sum, meal) => ({
        calories: sum.calories + meal.calories,
        protein: sum.protein + meal.protein,
      }),
      { calories: 0, protein: 0 }
    );

    const xp = calculateDailyXP({
      caloriesComplete:
        recordTotals.calories > 0 && recordTotals.calories <= caloriesTarget,
      proteinComplete: recordTotals.protein >= proteinTarget,
      stepsComplete: record.steps >= stepsTarget,
      workoutComplete: record.workoutComplete,
      waterComplete: record.waterComplete,
    });

    return xp >= 450;
  }).length;

  function updateSelectedRecord(updates: Partial<DayRecord>) {
    setRecords((current) => ({
      ...current,
      [selectedDate]: {
        ...(current[selectedDate] ?? createEmptyDay(selectedDate)),
        ...updates,
      },
    }));
  }

  function addMeal(meal: Meal) {
    updateSelectedRecord({
      meals: [...selectedRecord.meals, meal],
    });
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

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight">
            Good Morning Marc
          </h1>

          <p className="mt-2 text-zinc-500">Become The Lion</p>
        </header>

        <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-4">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-yellow-400">
            Select Day
          </p>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {lastSevenDays.map((dateKey, index) => (
              <button
                key={dateKey}
                onClick={() => setSelectedDate(dateKey)}
                className={`min-w-fit rounded-2xl px-4 py-3 text-sm font-bold ${
                  selectedDate === dateKey
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-800 text-zinc-300"
                }`}
              >
                {formatDayLabel(dateKey, index)}
              </button>
            ))}
          </div>
        </section>

        <XPCard xp={totalXP} />

        <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Today&apos;s Progress
          </p>

          <h2 className="mt-2 text-4xl font-black">+{dailyXP} XP</h2>

          <p className="mt-1 text-zinc-400">
            {completedObjectives} / 5 objectives complete
          </p>
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
              complete={selectedRecord.workoutComplete}
              onClick={() =>
                updateSelectedRecord({
                  workoutComplete: !selectedRecord.workoutComplete,
                })
              }
            />

            <ObjectiveRow
              icon="💧"
              label="Drink 3L water"
              xp={25}
              complete={selectedRecord.waterComplete}
              onClick={() =>
                updateSelectedRecord({
                  waterComplete: !selectedRecord.waterComplete,
                })
              }
            />
          </div>
        </section>

        <StreakCard
          streak={perfectDays}
          bestStreak={perfectDays}
          perfectDays={perfectDays}
        />

        <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <p className="text-sm text-zinc-400">Current Weight</p>

          <div className="mt-2 flex items-end justify-between">
            <div>
              <p className="text-6xl font-black">
                {selectedRecord.weight.toFixed(1)}kg
              </p>
              <p className="mt-2 text-green-400">
                {(selectedRecord.weight - targetWeight).toFixed(1)}kg to target
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
              onClick={() =>
                updateSelectedRecord({
                  weight: Number((selectedRecord.weight - 0.1).toFixed(1)),
                })
              }
              className="flex-1 rounded-2xl bg-zinc-800 py-4 text-2xl font-bold active:scale-95"
            >
              -
            </button>

            <button
              onClick={() =>
                updateSelectedRecord({
                  weight: Number((selectedRecord.weight + 0.1).toFixed(1)),
                })
              }
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
              <p className="text-5xl font-black">
                {selectedRecord.steps.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Target {stepsTarget.toLocaleString()} steps
              </p>
            </div>

            <p className={stepsComplete ? "text-green-400" : "text-yellow-400"}>
              {stepsComplete
                ? "Complete"
                : `${Math.max(0, stepsTarget - selectedRecord.steps)} left`}
            </p>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all duration-500"
              style={{
                width: `${Math.min(
                  100,
                  (selectedRecord.steps / stepsTarget) * 100
                )}%`,
              }}
            />
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() =>
                updateSelectedRecord({
                  steps: Math.max(0, selectedRecord.steps - 500),
                })
              }
              className="flex-1 rounded-2xl bg-zinc-800 py-4 text-xl font-bold active:scale-95"
            >
              -500
            </button>

            <button
              onClick={() =>
                updateSelectedRecord({
                  steps: selectedRecord.steps + 500,
                })
              }
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
            You&apos;ve earned {dailyXP} XP on this day. Complete more
            objectives to build your rank and protect your streak.
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
  onClick,
}: {
  icon: string;
  label: string;
  xp: number;
  complete: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="flex w-full items-center justify-between rounded-2xl bg-zinc-800 p-4 text-left disabled:cursor-default"
    >
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
    </button>
  );
}