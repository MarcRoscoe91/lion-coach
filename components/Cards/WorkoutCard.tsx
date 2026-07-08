export default function WorkoutCard() {
  return (
    <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold">Today’s Workout</h2>

      <div className="mt-4 rounded-2xl bg-zinc-800 p-4">
        <p className="text-xl font-bold">🏋️ Push Day</p>

        <p className="mt-1 text-sm text-zinc-400">
          Chest, shoulders, triceps + 30 min cardio
        </p>
      </div>
    </section>
  );
}