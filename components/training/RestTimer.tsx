type RestTimerProps = {
  restSeconds: number;
  onStart: () => void;
  onReset: () => void;
};

export default function RestTimer({
  restSeconds,
  onStart,
  onReset,
}: RestTimerProps) {
  return (
    <section className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
        Rest Timer
      </p>

      <p className="mt-3 text-5xl font-black">
        {String(Math.floor(restSeconds / 60)).padStart(2, "0")}:
        {String(restSeconds % 60).padStart(2, "0")}
      </p>

      <div className="mt-5 flex gap-3">
        <button
          onClick={onStart}
          className="flex-1 rounded-2xl bg-yellow-400 py-3 font-bold text-black"
        >
          Start 2:00
        </button>

        <button
          onClick={onReset}
          className="flex-1 rounded-2xl bg-zinc-800 py-3 font-bold text-zinc-300"
        >
          Reset
        </button>
      </div>
    </section>
  );
}