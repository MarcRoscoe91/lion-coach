type MacroCardProps = {
  title: string;
  current: number;
  target: number;
};

export default function MacroCard({
  title,
  current,
  target,
}: MacroCardProps) {
  const percent = Math.min((current / target) * 100, 100);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">{title}</h3>

        <span className="text-yellow-400 font-bold">
          {current} / {target}
        </span>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-yellow-400 transition-all duration-500"
          style={{
            width: `${percent}%`,
          }}
        />
      </div>

      <p className="mt-3 text-sm text-zinc-400">
        {Math.round(percent)}% complete
      </p>
    </div>
  );
}