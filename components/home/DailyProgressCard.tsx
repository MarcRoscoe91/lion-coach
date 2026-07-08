type DailyProgressCardProps = {
  dailyXP: number;
  completedObjectives: number;
};

export default function DailyProgressCard({
  dailyXP,
  completedObjectives,
}: DailyProgressCardProps) {
  return (
    <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
        Today&apos;s Progress
      </p>

      <h2 className="mt-2 text-4xl font-black">+{dailyXP} XP</h2>

      <p className="mt-1 text-zinc-400">
        {completedObjectives} / 5 objectives complete
      </p>
    </section>
  );
}