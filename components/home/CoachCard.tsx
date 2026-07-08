type CoachCardProps = {
  dailyXP: number;
};

export default function CoachCard({ dailyXP }: CoachCardProps) {
  return (
    <section className="mt-6 rounded-[2rem] border border-yellow-500/20 bg-yellow-400/10 p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
        Coach&apos;s Corner
      </p>

      <p className="mt-4 text-lg leading-8 text-zinc-200">
        You&apos;ve earned {dailyXP} XP on this day. Complete more objectives to
        build your rank and protect your streak.
      </p>
    </section>
  );
}