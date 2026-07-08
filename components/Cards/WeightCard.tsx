type WeightCardProps = {
  weight: number;
  targetWeight: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function WeightCard({
  weight,
  targetWeight,
  onIncrease,
  onDecrease,
}: WeightCardProps) {
  return (
    <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
      <p className="text-sm text-zinc-400">Current Weight</p>

      <div className="mt-2 flex items-end justify-between">
        <div>
          <p className="text-6xl font-bold">{weight.toFixed(1)}kg</p>

          <p className="mt-2 text-green-400">
            {(weight - targetWeight).toFixed(1)}kg to target
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-zinc-500">Target</p>

          <p className="text-2xl font-bold text-yellow-400">
            {targetWeight}kg
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onDecrease}
          className="flex-1 rounded-2xl bg-zinc-800 py-4 text-2xl font-bold"
        >
          -
        </button>

        <button
          onClick={onIncrease}
          className="flex-1 rounded-2xl bg-yellow-400 py-4 text-2xl font-bold text-black"
        >
          +
        </button>
      </div>
    </section>
  );
}