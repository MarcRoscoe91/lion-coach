import Image from "next/image";
import {
  getLevelFromXP,
  getRank,
  getXPForCurrentLevel,
  getXPToNextLevel,
} from "@/lib/xp";

type HomeHeroProps = {
  totalXP: number;
  selectedDate: string;
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function formatDate(dateKey: string) {
  return new Date(dateKey).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function HomeHero({ totalXP, selectedDate }: HomeHeroProps) {
  const level = getLevelFromXP(totalXP);
  const rank = getRank(level);
  const currentLevelXP = getXPForCurrentLevel(totalXP);
  const xpToNextLevel = getXPToNextLevel(totalXP);
  const progress = Math.min(100, (currentLevelXP / 500) * 100);

  return (
    <section className="rounded-[2rem] border border-yellow-500/20 bg-yellow-400/10 p-6 text-center">
      <Image
        src="/logo.png"
        alt="Lion Coach"
        width={95}
        height={95}
        className="mx-auto rounded-2xl"
        priority
      />

      <h1 className="mt-5 text-3xl font-black">
        {getGreeting()}, Marc
      </h1>

      <p className="mt-1 text-zinc-400">{formatDate(selectedDate)}</p>

      <div className="mt-6 rounded-3xl bg-black/40 p-5">
        <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
          Level {level}
        </p>

        <h2 className="mt-2 text-4xl font-black">{rank}</h2>

        <p className="mt-2 text-zinc-400">{totalXP.toLocaleString()} XP</p>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-yellow-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-zinc-400">
          {xpToNextLevel} XP to next level
        </p>
      </div>
    </section>
  );
}