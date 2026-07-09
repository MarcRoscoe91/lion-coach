type TodaysHuntCardProps = {
  dailyXP: number;
  completedObjectives: number;
  caloriesComplete: boolean;
  proteinComplete: boolean;
  stepsComplete: boolean;
  workoutComplete: boolean;
  waterComplete: boolean;
};

export default function TodaysHuntCard({
  dailyXP,
  completedObjectives,
  caloriesComplete,
  proteinComplete,
  stepsComplete,
  workoutComplete,
  waterComplete,
}: TodaysHuntCardProps) {
  return (
    <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Today&apos;s Hunt
          </p>

          <h2 className="mt-2 text-3xl font-black">
            {completedObjectives} / 5 Complete
          </h2>
        </div>

        <div className="rounded-2xl bg-yellow-400 px-4 py-3 font-black text-black">
          +{dailyXP} XP
        </div>
      </div>

      <div className="mt-5 grid grid-cols-5 gap-2 text-center text-xl">
        <MiniObjective complete={caloriesComplete} icon="🎯" />
        <MiniObjective complete={proteinComplete} icon="💪" />
        <MiniObjective complete={stepsComplete} icon="🚶" />
        <MiniObjective complete={workoutComplete} icon="🏋️" />
        <MiniObjective complete={waterComplete} icon="💧" />
      </div>
    </section>
  );
}

function MiniObjective({
  complete,
  icon,
}: {
  complete: boolean;
  icon: string;
}) {
  return (
    <div
      className={`rounded-2xl p-3 ${
        complete ? "bg-green-400/10 text-green-400" : "bg-zinc-800 text-zinc-500"
      }`}
    >
      <div>{icon}</div>
      <div className="mt-1 text-sm">{complete ? "✓" : "○"}</div>
    </div>
  );
}