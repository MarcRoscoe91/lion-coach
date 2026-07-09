"use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/navigation/BottomNav";
import {
  createSetId,
  defaultWorkouts,
  loadWorkouts,
  saveWorkouts,
  type LoggedSet,
  type LoggedWorkout,
  type Workout,
} from "@/lib/workoutStore";
import {
  getDateKey,
  getDay,
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
  const [loggedWorkout, setLoggedWorkout] = useState<LoggedWorkout>({
    workoutId: "push-day",
    completedExerciseIds: [],
    sets: {},
  });
  const [loaded, setLoaded] = useState(false);

  const [restSeconds, setRestSeconds] = useState(0);

  useEffect(() => {
    setRecords(loadDailyRecords());
    setWorkouts(loadWorkouts());

    const saved = localStorage.getItem(`lion-workout-log-${todayKey}`);

    if (saved) {
      const parsed = JSON.parse(saved);
      setLoggedWorkout(parsed);
      setSelectedWorkoutId(parsed.workoutId);
    }

    setLoaded(true);
  }, [todayKey]);

  useEffect(() => {
    if (!loaded) return;

    saveDailyRecords(records);
    saveWorkouts(workouts);
    localStorage.setItem(
      `lion-workout-log-${todayKey}`,
      JSON.stringify(loggedWorkout)
    );
  }, [records, workouts, loggedWorkout, loaded, todayKey]);

  useEffect(() => {
    if (restSeconds <= 0) return;

    const timer = setInterval(() => {
      setRestSeconds((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [restSeconds]);

  const selectedWorkout =
    workouts.find((workout) => workout.id === selectedWorkoutId) ??
    workouts[0] ??
    defaultWorkouts[0];

  const allExercisesComplete =
    selectedWorkout.exercises.length > 0 &&
    selectedWorkout.exercises.every((exercise) =>
      loggedWorkout.completedExerciseIds.includes(exercise.id)
    );

  function selectWorkout(workoutId: string) {
    setSelectedWorkoutId(workoutId);
    setLoggedWorkout({
      workoutId,
      completedExerciseIds: [],
      sets: {},
    });
    setRestSeconds(0);
  }

  function addSet(exerciseId: string, set: LoggedSet) {
    setLoggedWorkout((current) => ({
      ...current,
      sets: {
        ...current.sets,
        [exerciseId]: [...(current.sets[exerciseId] ?? []), set],
      },
    }));

    setRestSeconds(120);
  }

  function deleteSet(exerciseId: string, setId: string) {
    setLoggedWorkout((current) => ({
      ...current,
      sets: {
        ...current.sets,
        [exerciseId]: (current.sets[exerciseId] ?? []).filter(
          (set) => set.id !== setId
        ),
      },
    }));
  }

  function toggleExerciseComplete(exerciseId: string) {
    setLoggedWorkout((current) => {
      const complete = current.completedExerciseIds.includes(exerciseId);

      return {
        ...current,
        completedExerciseIds: complete
          ? current.completedExerciseIds.filter((id) => id !== exerciseId)
          : [...current.completedExerciseIds, exerciseId],
      };
    });
  }

  function completeWorkout() {
    if (!allExercisesComplete) return;

    setRecords((current) =>
      updateDay(current, todayKey, {
        workoutComplete: true,
      })
    );
  }

  const todayRecord = getDay(records, todayKey);

  return (
    <main className="min-h-screen bg-black p-5 text-white">
      <div className="mx-auto max-w-md pb-32">
        <header>
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
            Training
          </p>

          <h1 className="mt-2 text-4xl font-black">Live Workout</h1>

          <p className="mt-2 text-zinc-400">
            Log sets, track weights, and complete today&apos;s session.
          </p>
        </header>

        <section className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-4">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-yellow-400">
            Choose Workout
          </p>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {workouts.map((workout) => (
              <button
                key={workout.id}
                onClick={() => selectWorkout(workout.id)}
                className={`min-w-fit rounded-2xl px-4 py-3 text-sm font-bold ${
                  selectedWorkoutId === workout.id
                    ? "bg-yellow-400 text-black"
                    : "bg-zinc-800 text-zinc-300"
                }`}
              >
                {workout.name}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-yellow-500/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Active Workout
          </p>

          <h2 className="mt-2 text-3xl font-black">{selectedWorkout.name}</h2>

          <p className="mt-2 text-zinc-300">{selectedWorkout.focus}</p>

          <div className="mt-5 flex items-center justify-between rounded-2xl bg-black/40 p-4">
            <span className="text-zinc-400">Reward</span>

            <span className="font-bold text-yellow-400">
              +{selectedWorkout.xpReward} XP
            </span>
          </div>

          {todayRecord.workoutComplete && (
            <p className="mt-4 rounded-2xl bg-green-400/10 p-4 text-center font-bold text-green-400">
              Workout complete for today ✓
            </p>
          )}
        </section>

        <section className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Rest Timer
          </p>

          <p className="mt-3 text-5xl font-black">
            {String(Math.floor(restSeconds / 60)).padStart(2, "0")}:
            {String(restSeconds % 60).padStart(2, "0")}
          </p>

          <div className="mt-5 flex gap-3">
            <button
              onClick={() => setRestSeconds(120)}
              className="flex-1 rounded-2xl bg-yellow-400 py-3 font-bold text-black"
            >
              Start 2:00
            </button>

            <button
              onClick={() => setRestSeconds(0)}
              className="flex-1 rounded-2xl bg-zinc-800 py-3 font-bold text-zinc-300"
            >
              Reset
            </button>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">Exercises</h2>

            <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
              {loggedWorkout.completedExerciseIds.length} /{" "}
              {selectedWorkout.exercises.length}
            </span>
          </div>

          <div className="space-y-5">
            {selectedWorkout.exercises.map((exercise) => {
              const sets = loggedWorkout.sets[exercise.id] ?? [];
              const complete = loggedWorkout.completedExerciseIds.includes(
                exercise.id
              );

              return (
                <ExerciseLogger
                  key={exercise.id}
                  exerciseName={exercise.name}
                  target={`${exercise.sets} sets x ${exercise.reps}`}
                  sets={sets}
                  complete={complete}
                  onAddSet={(set) => addSet(exercise.id, set)}
                  onDeleteSet={(setId) => deleteSet(exercise.id, setId)}
                  onToggleComplete={() => toggleExerciseComplete(exercise.id)}
                />
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

function ExerciseLogger({
  exerciseName,
  target,
  sets,
  complete,
  onAddSet,
  onDeleteSet,
  onToggleComplete,
}: {
  exerciseName: string;
  target: string;
  sets: LoggedSet[];
  complete: boolean;
  onAddSet: (set: LoggedSet) => void;
  onDeleteSet: (setId: string) => void;
  onToggleComplete: () => void;
}) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  function saveSet() {
    if (!weight && !reps) return;

    onAddSet({
      id: createSetId(),
      weight,
      reps,
    });

    setWeight("");
    setReps("");
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">{exerciseName}</h3>

          <p className="mt-1 text-sm text-zinc-400">{target}</p>
        </div>

        <button
          onClick={onToggleComplete}
          className={complete ? "text-3xl text-green-400" : "text-3xl text-zinc-500"}
        >
          {complete ? "✓" : "○"}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {sets.length === 0 ? (
          <p className="text-sm text-zinc-500">No sets logged yet.</p>
        ) : (
          sets.map((set, index) => (
            <div
              key={set.id}
              className="flex items-center justify-between rounded-2xl bg-zinc-800 p-4"
            >
              <p className="font-bold">Set {index + 1}</p>

              <p className="text-zinc-300">
                {set.weight || "0"}kg x {set.reps || "0"}
              </p>

              <button
                onClick={() => onDeleteSet(set.id)}
                className="text-sm font-bold text-zinc-500"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <input
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          placeholder="Weight kg"
          inputMode="decimal"
          className="rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
        />

        <input
          value={reps}
          onChange={(event) => setReps(event.target.value)}
          placeholder="Reps"
          inputMode="numeric"
          className="rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
        />
      </div>

      <button
        onClick={saveSet}
        className="mt-4 w-full rounded-2xl bg-yellow-400 py-3 font-bold text-black active:scale-95"
      >
        Save Set
      </button>
    </div>
  );
}