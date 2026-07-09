import { type Workout } from "@/lib/workoutStore";

type WorkoutSelectorProps = {
  workouts: Workout[];
  selectedWorkoutId: string;
  onSelectWorkout: (workoutId: string) => void;
};

export default function WorkoutSelector({
  workouts,
  selectedWorkoutId,
  onSelectWorkout,
}: WorkoutSelectorProps) {
  return (
    <section className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-4">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-yellow-400">
        Choose Workout
      </p>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {workouts.map((workout) => (
          <button
            key={workout.id}
            onClick={() => onSelectWorkout(workout.id)}
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
  );
}