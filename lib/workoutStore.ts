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

export type LoggedSet = {
  id: string;
  weight: string;
  reps: string;
};

export type LoggedWorkout = {
  workoutId: string;
  completedExerciseIds: string[];
  sets: Record<string, LoggedSet[]>;
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
    ],
  },
  {
    id: "pull-day",
    name: "Pull Day",
    focus: "Back and biceps",
    xpReward: 150,
    exercises: [
      { id: "lat-pulldown", name: "Lat Pulldown", sets: 4, reps: "10" },
      { id: "seated-row", name: "Seated Row", sets: 4, reps: "10" },
      { id: "single-arm-row", name: "Single Arm Row", sets: 3, reps: "10" },
      { id: "face-pulls", name: "Face Pulls", sets: 3, reps: "15" },
      { id: "bicep-curls", name: "Bicep Curls", sets: 3, reps: "12" },
    ],
  },
  {
    id: "legs-day",
    name: "Legs Day",
    focus: "Quads, hamstrings, glutes",
    xpReward: 150,
    exercises: [
      { id: "squat", name: "Squat", sets: 4, reps: "8" },
      { id: "leg-press", name: "Leg Press", sets: 4, reps: "10" },
      { id: "rdl", name: "Romanian Deadlift", sets: 3, reps: "10" },
      { id: "leg-curl", name: "Leg Curl", sets: 3, reps: "12" },
      { id: "calf-raises", name: "Calf Raises", sets: 4, reps: "15" },
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

export function createSetId() {
  return `set-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}