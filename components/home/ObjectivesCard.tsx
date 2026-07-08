type ObjectivesCardProps = {
  caloriesComplete: boolean;
  proteinComplete: boolean;
  stepsComplete: boolean;
  workoutComplete: boolean;
  waterComplete: boolean;
  onToggleWorkout: () => void;
  onToggleWater: () => void;
};

export default function ObjectivesCard({
  caloriesComplete,
  proteinComplete,
  stepsComplete,
  workoutComplete,
  waterComplete,
  onToggleWorkout,
  onToggleWater,
}: ObjectivesCardProps) {
  return (
    <section className="mt-6 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-2xl font-bold">Today&apos;s Objectives</h2>

      <div className="mt-4 space-y-3">
        <ObjectiveRow
          icon="🎯"
          label="Stay within calories"
          xp={50}
          complete={caloriesComplete}
        />

        <ObjectiveRow
          icon="💪"
          label="Hit protein target"
          xp={75}
          complete={proteinComplete}
        />

        <ObjectiveRow
          icon="🚶"
          label="Hit 10,000 steps"
          xp={50}
          complete={stepsComplete}
        />

        <ObjectiveRow
          icon="🏋️"
          label="Complete Push Day"
          xp={150}
          complete={workoutComplete}
          onClick={onToggleWorkout}
        />

        <ObjectiveRow
          icon="💧"
          label="Drink 3L water"
          xp={25}
          complete={waterComplete}
          onClick={onToggleWater}
        />
      </div>
    </section>
  );
}

function ObjectiveRow({
  icon,
  label,
  xp,
  complete,
  onClick,
}: {
  icon: string;
  label: string;
  xp: number;
  complete: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className="flex w-full items-center justify-between rounded-2xl bg-zinc-800 p-4 text-left disabled:cursor-default"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>

        <div>
          <p className="font-semibold">{label}</p>
          <p className="text-sm text-yellow-400">+{xp} XP</p>
        </div>
      </div>

      <span className={complete ? "text-green-400" : "text-zinc-500"}>
        {complete ? "✓" : "○"}
      </span>
    </button>
  );
}