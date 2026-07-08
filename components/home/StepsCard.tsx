type StepsCardProps = {
  steps: number;
  stepsTarget: number;
  stepsComplete: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function StepsCard({
  steps,
  stepsTarget,
  stepsComplete,
  onIncrease,
  onDecrease,
}: StepsCardProps) {
  return (
    <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold">Steps</h2>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-5xl font-black">{steps.toLocaleString()}</p>

          <p className="mt-1 text-sm text-zinc-400">
            Target {stepsTarget.toLocaleString()} steps
          </p>
        </div>

        <p className={stepsComplete ? "text-green-400" : "text-yellow-400"}>
          {stepsComplete ? "Complete" : `${Math.max(0, stepsTarget - steps)} left`}
        </p>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-yellow-400 transition-all duration-500"
          style={{
            width: `${Math.min(100, (steps / stepsTarget) * 100)}%`,
          }}
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onDecrease}
          className="flex-1 rounded-2xl bg-zinc-800 py-4 text-xl font-bold active:scale-95"
        >
          -500
        </button>

        <button
          onClick={onIncrease}
          className="flex-1 rounded-2xl bg-yellow-400 py-4 text-xl font-bold text-black active:scale-95"
        >
          +500
        </button>
      </div>
    </section>
  );
}