type MealCardProps = {
  meal: string;
  description: string;
  calories: number;
  protein: number;
};

export default function MealCard({
  meal,
  description,
  calories,
  protein,
}: MealCardProps) {
  return (
    <button className="w-full rounded-3xl border border-zinc-800 bg-zinc-900 p-5 text-left transition active:scale-[0.98]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">{meal}</h3>

          <p className="mt-1 text-zinc-400">
            {description}
          </p>
        </div>

        <span className="text-3xl">
          +
        </span>
      </div>

      <div className="mt-5 flex gap-6 text-sm text-zinc-400">
        <span>{calories} kcal</span>
        <span>{protein}g protein</span>
      </div>
    </button>
  );
}