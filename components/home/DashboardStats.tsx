type DashboardStatsProps = {
  weight: number;
  steps: number;
  waterMl: number;
  calories: number;
};

export default function DashboardStats({
  weight,
  steps,
  waterMl,
  calories,
}: DashboardStatsProps) {
  return (
    <section className="mt-6 grid grid-cols-2 gap-4">
      <StatTile label="Weight" value={`${weight.toFixed(1)}kg`} icon="⚖️" />
      <StatTile label="Steps" value={steps.toLocaleString()} icon="🚶" />
      <StatTile label="Water" value={`${(waterMl / 1000).toFixed(2)}L`} icon="💧" />
      <StatTile label="Calories" value={`${calories}`} icon="🔥" />
    </section>
  );
}

function StatTile({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5">
      <div className="text-3xl">{icon}</div>
      <p className="mt-4 text-sm text-zinc-400">{label}</p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}