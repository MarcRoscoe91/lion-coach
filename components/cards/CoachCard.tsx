type CoachCardProps = {
  weight: number;
  targetWeight: number;
};

export default function CoachCard({
  weight,
  targetWeight,
}: CoachCardProps) {
  return (
    <section className="mt-6 rounded-3xl border border-yellow-500/20 bg-yellow-400/10 p-6">
      <h2 className="text-2xl font-bold text-yellow-400">Coach’s Corner</h2>

      <p className="mt-3 leading-7 text-zinc-300">
        You’re set up for a controlled cut from {weight.toFixed(1)}kg to{" "}
        {targetWeight}kg. Keep protein high, stay consistent, and aim for
        around 0.5kg loss per week.
      </p>
    </section>
  );
}