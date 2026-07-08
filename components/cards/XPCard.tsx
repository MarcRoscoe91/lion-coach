import {
  getLevelFromXP,
  getRank,
  getXPForCurrentLevel,
  getXPToNextLevel,
} from "@/lib/xp";

type XPCardProps = {
  xp: number;
};

export default function XPCard({ xp }: XPCardProps) {
  const level = getLevelFromXP(xp);
  const rank = getRank(level);
  const currentLevelXP = getXPForCurrentLevel(xp);
  const nextLevelXP = getXPToNextLevel(xp);
  const percent = Math.min(100, (currentLevelXP / 500) * 100);

  return (
    <section className="mt-8 rounded-[2rem] border border-yellow-500/20 bg-yellow-400/10 p-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
        Level {level}
      </p>

      <p className="mt-3 text-4xl font-black text-white">{rank}</p>

      <p className="mt-2 text-zinc-400">{xp.toLocaleString()} XP</p>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-yellow-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-zinc-400">
        {nextLevelXP} XP to next level
      </p>
    </section>
  );
}