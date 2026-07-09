"use client";

import { useEffect, useMemo, useState } from "react";

import AchievementsCard from "@/components/cards/AchievementsCard";
import BottomNav from "@/components/navigation/BottomNav";

import CoachCard from "@/components/home/CoachCard";
import DashboardStats from "@/components/home/DashboardStats";
import DaySelector from "@/components/home/DaySelector";
import HomeHero from "@/components/home/HomeHero";
import StepsCard from "@/components/home/StepsCard";
import TodaysHuntCard from "@/components/home/TodaysHuntCard";
import WaterCard from "@/components/home/WaterCard";
import WeightCard from "@/components/home/WeightCard";
import WorkoutCard from "@/components/home/WorkoutCard";

import {
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
  const waterTargetMl = 3000;

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
  const waterComplete = selectedRecord.waterMl >= waterTargetMl;

  const dailyXP = calculateDailyXP({
    caloriesComplete,
    proteinComplete,
    stepsComplete,
    workoutComplete: selectedRecord.workoutComplete,
    waterComplete,
  });

  const completedObjectives = [
    caloriesComplete,
    proteinComplete,
    stepsComplete,
    selectedRecord.workoutComplete,
    waterComplete,
  ].filter(Boolean).length;

  const totalXP = Object.values(records).reduce((total, record) => {
    const day = getDay(records, record.date);
    const recordTotals = getNutritionTotals(day);

    return (
      total +
      calculateDailyXP({
        caloriesComplete:
          recordTotals.calories > 0 &&
          recordTotals.calories <= caloriesTarget,
        proteinComplete: recordTotals.protein >= proteinTarget,
        stepsComplete: day.steps >= stepsTarget,
        workoutComplete: day.workoutComplete,
        waterComplete: day.waterMl >= waterTargetMl,
      })
    );
  }, 0);

  function updateSelectedRecord(updates: Parameters<typeof updateDay>[2]) {
    setRecords((current) => updateDay(current, selectedDate, updates));
  }

  return (
    <main className="min-h-screen bg-black p-5 text-white">
      <div className="mx-auto max-w-md pb-32">
        <HomeHero totalXP={totalXP} selectedDate={selectedDate} />

        <DaySelector
          days={lastSevenDays}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        <TodaysHuntCard
          dailyXP={dailyXP}
          completedObjectives={completedObjectives}
          caloriesComplete={caloriesComplete}
          proteinComplete={proteinComplete}
          stepsComplete={stepsComplete}
          workoutComplete={selectedRecord.workoutComplete}
          waterComplete={waterComplete}
        />

        <DashboardStats
          weight={selectedRecord.weight}
          steps={selectedRecord.steps}
          waterMl={selectedRecord.waterMl}
          calories={totals.calories}
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

        <WaterCard
          waterMl={selectedRecord.waterMl}
          waterTargetMl={waterTargetMl}
          waterComplete={waterComplete}
          onDecrease={() =>
            updateSelectedRecord({
              waterMl: Math.max(0, selectedRecord.waterMl - 250),
            })
          }
          onIncrease={() =>
            updateSelectedRecord({
              waterMl: selectedRecord.waterMl + 250,
            })
          }
        />

        <WorkoutCard />

        <CoachCard dailyXP={dailyXP} />

        <AchievementsCard />
      </div>

      <BottomNav />
    </main>
  );
}