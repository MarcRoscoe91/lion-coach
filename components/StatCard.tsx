function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  const numericValue = Number(value.replace("g", ""));
  const target = title === "Calories" ? 2250 : 210;
  const remaining = Math.max(0, numericValue);
  const used = target - remaining;
  const percent = Math.min(100, Math.max(0, (used / target) * 100));

  return (
    <div className="rounded-3xl bg-zinc-900 p-5 shadow-lg">
      <p className="text-zinc-400 text-sm">{title}</p>

      <h2 className="text-4xl font-bold mt-2">{value}</h2>

      <p className="text-zinc-500 mt-1">{subtitle}</p>

      <div className="mt-4 h-3 rounded-full bg-zinc-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-yellow-400 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}