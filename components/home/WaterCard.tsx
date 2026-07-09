type WaterCardProps = {
  waterMl: number;
  waterTargetMl: number;
  waterComplete: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function WaterCard({
  waterMl,
  waterTargetMl,
  waterComplete,
  onIncrease,
  onDecrease,
}: WaterCardProps) {
  return (
    <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold">Water</h2>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-5xl font-black">
            {(waterMl / 1000).toFixed(2)}L
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            Target {(waterTargetMl / 1000).toFixed(1)}L
          </p>
        </div>

        <p className={waterComplete ? "text-green-400" : "text-yellow-400"}>
          {waterComplete
            ? "Complete"
            : `${Math.max(0, waterTargetMl - waterMl)}ml left`}
        </p>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-yellow-400 transition-all duration-500"
          style={{
            width: `${Math.min(100, (waterMl / waterTargetMl) * 100)}%`,
          }}
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onDecrease}
          className="flex-1 rounded-2xl bg-zinc-800 py-4 text-xl font-bold active:scale-95"
        >
          -250ml
        </button>

        <button
          onClick={onIncrease}
          className="flex-1 rounded-2xl bg-yellow-400 py-4 text-xl font-bold text-black active:scale-95"
        >
          +250ml
        </button>
      </div>
    </section>
  );
}