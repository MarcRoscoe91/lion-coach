import ProgressBar from "@/components/ui/ProgressBar";

type LionScoreCardProps = {
  score: number;
};

export default function LionScoreCard({ score }: LionScoreCardProps) {
  return (
    <section className="mt-8 rounded-3xl border border-yellow-500/20 bg-yellow-400/10 p-6">
      <p className="text-sm text-yellow-400">Lion Score</p>

      <div className="mt-2 flex items-end justify-between">
        <div>
          <p className="text-6xl font-bold">{score}</p>
          <p className="mt-1 text-zinc-400">out of 100</p>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-yellow-400">
            {score >= 90 ? "Excellent" : score >= 70 ? "Good" : "Build"}
          </p>
          <p className="text-sm text-zinc-500">Today</p>
        </div>
      </div>

      <ProgressBar value={score} target={100} />
    </section>
  );
}