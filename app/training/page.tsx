"use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/navigation/BottomNav";
import ActiveWorkoutCard from "@/components/training/ActiveWorkoutCard";
import AddExerciseCard from "@/components/training/AddExerciseCard";
import CreateWorkoutCard from "@/components/training/CreateWorkoutCard";
import ExerciseLogger from "@/components/training/ExerciseLogger";
import RestTimer from "@/components/training/RestTimer";
import WorkoutSelector from "@/components/training/WorkoutSelector";
import {
  addExerciseToWorkout,
  createExercise,
  createWorkout,
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

  const todayRecord = getDay(records, todayKey);

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

    const exercise = selectedWorkout.exercises.find(
      (item) => item.id === exerciseId
    );

    setRestSeconds(exercise?.restSeconds ?? 120);
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

  function handleCreateWorkout(data: {
    name: string;
    focus: string;
    xpReward: number;
  }) {
    const workout = createWorkout(data);

    setWorkouts((current) => [workout, ...current]);
    selectWorkout(workout.id);
  }

  function handleAddExercise(data: {
    name: string;
    sets: number;
    reps: string;
    restSeconds: number;
  }) {
    const exercise = createExercise(data);

    setWorkouts((current) =>
      addExerciseToWorkout(current, selectedWorkout.id, exercise)
    );
  }

  return (
    <main className="min-h-screen bg-black p-5 text-white">
      <div className="mx-auto max-w-md pb-32">
        <header>
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
            Training
          </p>

          <h1 className="mt-2 text-4xl font-black">Live Workout</h1>

          <p className="mt-2 text-zinc-400">
            Build workouts, log sets, and complete today&apos;s session.
          </p>
        </header>

        <WorkoutSelector
          workouts={workouts}
          selectedWorkoutId={selectedWorkoutId}
          onSelectWorkout={selectWorkout}
        />

        <ActiveWorkoutCard
          workout={selectedWorkout}
          workoutComplete={todayRecord.workoutComplete}
        />

        <RestTimer
          restSeconds={restSeconds}
          onStart={() => setRestSeconds(120)}
          onReset={() => setRestSeconds(0)}
        />

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">Exercises</h2>

            <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
              {loggedWorkout.completedExerciseIds.length} /{" "}
              {selectedWorkout.exercises.length}
            </span>
          </div>

          <div className="space-y-5">
            {selectedWorkout.exercises.length === 0 ? (
              <p className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-zinc-400">
                No exercises yet. Add your first exercise below.
              </p>
            ) : (
              selectedWorkout.exercises.map((exercise) => {
                const sets = loggedWorkout.sets[exercise.id] ?? [];
                const complete = loggedWorkout.completedExerciseIds.includes(
                  exercise.id
                );

                return (
                  <ExerciseLogger
                    key={exercise.id}
                    exerciseName={exercise.name}
                    target={`${exercise.sets} sets x ${exercise.reps} • ${exercise.restSeconds}s rest`}
                    sets={sets}
                    complete={complete}
                    onAddSet={(set) => addSet(exercise.id, set)}
                    onDeleteSet={(setId) => deleteSet(exercise.id, setId)}
                    onToggleComplete={() => toggleExerciseComplete(exercise.id)}
                  />
                );
              })
            )}
          </div>
        </section>

        <button
          onClick={completeWorkout}
          disabled={!allExercisesComplete}
          className="mt-8 w-full rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black disabled:opacity-40 active:scale-95"
        >
          {allExercisesComplete ? "Complete Workout" : "Finish All Exercises"}
        </button>

        <CreateWorkoutCard onCreateWorkout={handleCreateWorkout} />

        <AddExerciseCard onAddExercise={handleAddExercise} />
      </div>

      <BottomNav />
    </main>
  );
}