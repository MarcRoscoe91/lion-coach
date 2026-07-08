type ProgressBarProps = {
  value: number;
  target: number;
};

export default function ProgressBar({ value, target }: ProgressBarProps) {
  const percent = Math.min(100, (value / target) * 100);

  return (
    <div className="mt-2 h-3 overflow-hidden rounded-full bg-zinc-800">
      <div
        className="h-full rounded-full bg-yellow-400 transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}