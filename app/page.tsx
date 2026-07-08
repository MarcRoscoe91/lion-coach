"use client";

import { useEffect, useMemo, useState } from "react";

import AchievementsCard from "@/components/cards/AchievementsCard";
import StreakCard from "@/components/cards/StreakCard";
import XPCard from "@/components/cards/XPCard";
import BottomNav from "@/components/navigation/BottomNav";

import CoachCard from "@/components/home/CoachCard";
import DailyProgressCard from "@/components/home/DailyProgressCard";
import DaySelector from "@/components/home/DaySelector";
import HomeHeader from "@/components/home/HomeHeader";
import NutritionActionCard from "@/components/home/NutritionActionCard";
import ObjectivesCard from "@/components/home/ObjectivesCard";
import StepsCard from "@/components/home/StepsCard";
import WeightCard from "@/components/home/WeightCard";
import WorkoutCard from "@/components/home/WorkoutCard";

import { defaultFoods } from "@/lib/foods";
import {
  addMealToDay,
  getDay,
  getLastSevenDays,
  getNutritionTotals,
  loadDailyRecords,
  saveDailyRecords,
  updateDay,
  type DailyRecords,
} from "@/lib/dailyStore";
import { calculateDailyXP } from "@/lib/xp";

export default function Home() {
  const lastSevenDays = useMemo(() => getLastSevenDays(), []);
  const todayKey = lastSevenDays[0];

  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [records, setRecords] = useState<DailyRecords>({});
  const [loaded, setLoaded] = useState(false);

  const targetWeight = 75;
  const caloriesTarget = 2250;
  const proteinTarget = 210;
  const stepsTarget = 10000;

  useEffect(() => {
    setRecords(loadDailyRecords());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    saveDailyRecords(records);
  }, [records, loaded]);

  const selectedRecord = getDay(records, selectedDate);
  const totals = getNutritionTotals(selectedRecord);

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
    const recordTotals = getNutritionTotals(record);

    return (
      total +
      calculateDailyXP({
        caloriesComplete:
          recordTotals.calories > 0 &&
          recordTotals.calories <= caloriesTarget,
        proteinComplete: recordTotals.protein >= proteinTarget,
        stepsComplete: record.steps >= stepsTarget,
        workoutComplete: record.workoutComplete,
        waterComplete: record.waterComplete,
      })
    );
  }, 0);

  const perfectDays = Object.values(records).filter((record) => {
    const recordTotals = getNutritionTotals(record);

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

  function updateSelectedRecord(updates: Parameters<typeof updateDay>[2]) {
    setRecords((current) => updateDay(current, selectedDate, updates));
  }

  return (
    <main className="min-h-screen bg-black p-5 text-white">
      <div className="mx-auto max-w-md pb-32">
        <HomeHeader selectedDate={selectedDate} />

        <DaySelector
          days={lastSevenDays}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        <XPCard xp={totalXP} />

        <DailyProgressCard
          dailyXP={dailyXP}
          completedObjectives={completedObjectives}
        />

        <ObjectivesCard
          caloriesComplete={caloriesComplete}
          proteinComplete={proteinComplete}
          stepsComplete={stepsComplete}
          workoutComplete={selectedRecord.workoutComplete}
          waterComplete={selectedRecord.waterComplete}
          onToggleWorkout={() =>
            updateSelectedRecord({
              workoutComplete: !selectedRecord.workoutComplete,
            })
          }
          onToggleWater={() =>
            updateSelectedRecord({
              waterComplete: !selectedRecord.waterComplete,
            })
          }
        />

        <StreakCard
          streak={perfectDays}
          bestStreak={perfectDays}
          perfectDays={perfectDays}
        />

        <WeightCard
          weight={selectedRecord.weight}
          targetWeight={targetWeight}
          onDecrease={() =>
            updateSelectedRecord({
              weight: Number((selectedRecord.weight - 0.1).toFixed(1)),
            })
          }
          onIncrease={() =>
            updateSelectedRecord({
              weight: Number((selectedRecord.weight + 0.1).toFixed(1)),
            })
          }
        />

        <StepsCard
          steps={selectedRecord.steps}
          stepsTarget={stepsTarget}
          stepsComplete={stepsComplete}
          onDecrease={() =>
            updateSelectedRecord({
              steps: Math.max(0, selectedRecord.steps - 500),
            })
          }
          onIncrease={() =>
            updateSelectedRecord({
              steps: selectedRecord.steps + 500,
            })
          }
        />

        <WorkoutCard />

        <CoachCard dailyXP={dailyXP} />

        <NutritionActionCard
          onLogBreakfast={() =>
            setRecords((current) =>
              addMealToDay(current, selectedDate, defaultFoods[3])
            )
          }
        />

        <AchievementsCard />
      </div>

      <BottomNav />
    </main>
  );
}