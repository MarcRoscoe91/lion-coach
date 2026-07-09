"use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/navigation/BottomNav";
import {
  defaultWorkouts,
  loadWorkouts,
  saveWorkouts,
  type Workout,
} from "@/lib/workoutStore";
import {
  getDateKey,
  loadDailyRecords,
  saveDailyRecords,
  updateDay,
  type DailyRecords,
} from "@/lib/dailyStore";

export default function TrainingPage() {
  const todayKey = getDateKey();

  const [records, setRecords] = useState<DailyRecords>({});
  const [workouts, setWorkouts] = useState<Workout[]>(defaultWorkouts);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("push-day");
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRecords(loadDailyRecords());
    setWorkouts(loadWorkouts());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    saveDailyRecords(records);
    saveWorkouts(workouts);
  }, [records, workouts, loaded]);

  const selectedWorkout =
    workouts.find((workout) => workout.id === selectedWorkoutId) ??
    workouts[0] ??
    defaultWorkouts[0];

  const allExercisesComplete =
    selectedWorkout.exercises.length > 0 &&
    completedExercises.length === selectedWorkout.exercises.length;

  function toggleExercise(exerciseId: string) {
    setCompletedExercises((current) =>
      current.includes(exerciseId)
        ? current.filter((id) => id !== exerciseId)
        : [...current, exerciseId]
    );
  }

  function completeWorkout() {
    if (!allExercisesComplete) return;

    setRecords((current) =>
      updateDay(current, todayKey, {
        workoutComplete: true,
      })
    );
  }

  return (
    <main className="min-h-screen bg-black p-5 text-white">
      <div className="mx-auto max-w-md pb-32">
        <header>
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
            Training
          </p>

          <h1 className="mt-2 text-4xl font-black">Today&apos;s Workout</h1>

          <p className="mt-2 text-zinc-400">
            Complete your session and earn workout XP.
          </p>
        </header>

        <section className="mt-8 rounded-[2rem] border border-yellow-500/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Active Plan
          </p>

          <h2 className="mt-2 text-3xl font-black">{selectedWorkout.name}</h2>

          <p className="mt-2 text-zinc-300">{selectedWorkout.focus}</p>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-black/40 p-4">
            <span className="text-zinc-400">Reward</span>
            <span className="font-bold text-yellow-400">
              +{selectedWorkout.xpReward} XP
            </span>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">Exercises</h2>

            <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
              {completedExercises.length} / {selectedWorkout.exercises.length}
            </span>
          </div>

          <div className="space-y-4">
            {selectedWorkout.exercises.map((exercise) => {
              const complete = completedExercises.includes(exercise.id);

              return (
                <button
                  key={exercise.id}
                  onClick={() => toggleExercise(exercise.id)}
                  className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-left active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{exercise.name}</h3>

                      <p className="mt-1 text-zinc-400">
                        {exercise.sets} sets x {exercise.reps}
                      </p>
                    </div>

                    <span
                      className={
                        complete ? "text-3xl text-green-400" : "text-3xl text-zinc-500"
                      }
                    >
                      {complete ? "✓" : "○"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <button
          onClick={completeWorkout}
          disabled={!allExercisesComplete}
          className="mt-8 w-full rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black disabled:opacity-40 active:scale-95"
        >
          {allExercisesComplete ? "Complete Workout" : "Finish All Exercises"}
        </button>
      </div>

      <BottomNav />
    </main>
  );
}