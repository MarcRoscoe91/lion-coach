export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
};

export type Workout = {
  id: string;
  name: string;
  focus: string;
  xpReward: number;
  exercises: Exercise[];
};

export const defaultWorkouts: Workout[] = [
  {
    id: "push-day",
    name: "Push Day",
    focus: "Chest, shoulders, triceps",
    xpReward: 150,
    exercises: [
      { id: "bench-press", name: "Bench Press", sets: 4, reps: "8" },
      { id: "incline-press", name: "Incline Press", sets: 3, reps: "10" },
      { id: "shoulder-press", name: "Shoulder Press", sets: 3, reps: "10" },
      { id: "lateral-raises", name: "Lateral Raises", sets: 4, reps: "12" },
      { id: "tricep-pushdown", name: "Tricep Pushdown", sets: 3, reps: "12" },
      { id: "cardio", name: "30 Min Cardio", sets: 1, reps: "Complete" },
    ],
  },
];

const STORAGE_KEY = "lion-workouts";

export function loadWorkouts(): Workout[] {
  if (typeof window === "undefined") return defaultWorkouts;

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return defaultWorkouts;

  try {
    return JSON.parse(saved);
  } catch {
    return defaultWorkouts;
  }
}

export function saveWorkouts(workouts: Workout[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
}

export function createWorkoutId(name: string) {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
}