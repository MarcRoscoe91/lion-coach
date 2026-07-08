import ProgressBar from "@/components/ui/ProgressBar";

type Totals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type Targets = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type NutritionCardProps = {
  totals: Totals;
  targets: Targets;
};

export default function NutritionCard({
  totals,
  targets,
}: NutritionCardProps) {
  return (
    <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold">Nutrition</h2>

      <div className="mt-5 space-y-5">
        <MacroRow
          label="Calories"
          value={totals.calories}
          target={targets.calories}
          suffix="kcal"
        />

        <MacroRow
          label="Protein"
          value={totals.protein}
          target={targets.protein}
          suffix="g"
        />

        <MacroRow
          label="Carbs"
          value={totals.carbs}
          target={targets.carbs}
          suffix="g"
        />

        <MacroRow
          label="Fats"
          value={totals.fat}
          target={targets.fat}
          suffix="g"
        />
      </div>
    </section>
  );
}

function MacroRow({
  label,
  value,
  target,
  suffix,
}: {
  label: string;
  value: number;
  target: number;
  suffix: string;
}) {
  const remaining = Math.max(0, target - value);

  return (
    <div>
      <div className="flex justify-between">
        <p className="font-semibold">{label}</p>
        <p className="text-zinc-400">
          {value} / {target} {suffix}
        </p>
      </div>

      <ProgressBar value={value} target={target} />

      <p className="mt-1 text-sm text-zinc-500">
        {remaining} {suffix} remaining
      </p>
    </div>
  );
}