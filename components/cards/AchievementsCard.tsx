export default function AchievementsCard() {
  return (
    <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Achievements
          </p>

          <h2 className="mt-2 text-2xl font-bold">0 / 50 Unlocked</h2>

          <p className="mt-1 text-zinc-400">
            Badges coming soon.
          </p>
        </div>

        <div className="text-5xl">🏆</div>
      </div>
    </section>
  );
}