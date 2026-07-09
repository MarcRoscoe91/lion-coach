import { type Workout } from "@/lib/workoutStore";

type ActiveWorkoutCardProps = {
  workout: Workout;
  workoutComplete: boolean;
};

export default function ActiveWorkoutCard({
  workout,
  workoutComplete,
}: ActiveWorkoutCardProps) {
  return (
    <section className="mt-8 rounded-[2rem] border border-yellow-500/20 bg-yellow-400/10 p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
        Active Workout
      </p>

      <h2 className="mt-2 text-3xl font-black">{workout.name}</h2>

      <p className="mt-2 text-zinc-300">{workout.focus}</p>

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-black/40 p-4">
        <span className="text-zinc-400">Reward</span>

        <span className="font-bold text-yellow-400">
          +{workout.xpReward} XP
        </span>
      </div>

      {workoutComplete && (
        <p className="mt-4 rounded-2xl bg-green-400/10 p-4 text-center font-bold text-green-400">
          Workout complete for today ✓
        </p>
      )}
    </section>
  );
}