type StreakCardProps = {
  streak: number;
  bestStreak: number;
  perfectDays: number;
};

export default function StreakCard({
  streak,
  bestStreak,
  perfectDays,
}: StreakCardProps) {
  return (
    <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
        Streak
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl bg-zinc-800 p-4">
          <p className="text-3xl">🔥</p>
          <p className="mt-2 text-2xl font-black">{streak}</p>
          <p className="text-xs text-zinc-400">Current</p>
        </div>

        <div className="rounded-2xl bg-zinc-800 p-4">
          <p className="text-3xl">🏆</p>
          <p className="mt-2 text-2xl font-black">{bestStreak}</p>
          <p className="text-xs text-zinc-400">Best</p>
        </div>

        <div className="rounded-2xl bg-zinc-800 p-4">
          <p className="text-3xl">✅</p>
          <p className="mt-2 text-2xl font-black">{perfectDays}</p>
          <p className="text-xs text-zinc-400">Perfect</p>
        </div>
      </div>
    </section>
  );
}