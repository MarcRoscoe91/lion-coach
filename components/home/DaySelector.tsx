type DaySelectorProps = {
  days: string[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

function formatDayLabel(dateKey: string, index: number) {
  const date = new Date(dateKey);

  if (index === 0) return "Today";
  if (index === 1) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function DaySelector({
  days,
  selectedDate,
  onSelectDate,
}: DaySelectorProps) {
  return (
    <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-4">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-yellow-400">
        Select Day
      </p>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((dateKey, index) => (
          <button
            key={dateKey}
            onClick={() => onSelectDate(dateKey)}
            className={`min-w-fit rounded-2xl px-4 py-3 text-sm font-bold ${
              selectedDate === dateKey
                ? "bg-yellow-400 text-black"
                : "bg-zinc-800 text-zinc-300"
            }`}
          >
            {formatDayLabel(dateKey, index)}
          </button>
        ))}
      </div>
    </section>
  );
}