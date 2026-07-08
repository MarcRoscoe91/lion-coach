type NutritionActionCardProps = {
  onLogBreakfast: () => void;
};

export default function NutritionActionCard({
  onLogBreakfast,
}: NutritionActionCardProps) {
  return (
    <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Nutrition
          </p>

          <h2 className="mt-2 text-2xl font-bold">Log today&apos;s food</h2>

          <p className="mt-1 text-zinc-400">
            Track meals to complete calories and protein objectives.
          </p>
        </div>

        <div className="text-4xl">🍽️</div>
      </div>

      <button
        onClick={onLogBreakfast}
        className="mt-5 w-full rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black active:scale-95"
      >
        + Log Breakfast
      </button>
    </section>
  );
}