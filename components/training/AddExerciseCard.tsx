"use client";

import { useState } from "react";

type AddExerciseCardProps = {
  onAddExercise: (data: {
    name: string;
    sets: number;
    reps: string;
    restSeconds: number;
  }) => void;
};

export default function AddExerciseCard({
  onAddExercise,
}: AddExerciseCardProps) {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("3");
  const [reps, setReps] = useState("10");
  const [restSeconds, setRestSeconds] = useState("120");

  function saveExercise() {
    if (!name.trim()) return;

    onAddExercise({
      name,
      sets: Number(sets) || 3,
      reps,
      restSeconds: Number(restSeconds) || 120,
    });

    setName("");
    setSets("3");
    setReps("10");
    setRestSeconds("120");
  }

  return (
    <section className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
        Add Exercise
      </p>

      <h2 className="mt-2 text-2xl font-bold">Add to selected workout</h2>

      <div className="mt-5 space-y-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Exercise name"
          className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
        />

        <div className="grid grid-cols-3 gap-3">
          <input
            value={sets}
            onChange={(event) => setSets(event.target.value)}
            placeholder="Sets"
            inputMode="numeric"
            className="rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
          />

          <input
            value={reps}
            onChange={(event) => setReps(event.target.value)}
            placeholder="Reps"
            inputMode="numeric"
            className="rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
          />

          <input
            value={restSeconds}
            onChange={(event) => setRestSeconds(event.target.value)}
            placeholder="Rest"
            inputMode="numeric"
            className="rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
          />
        </div>

        <button
          onClick={saveExercise}
          className="w-full rounded-2xl bg-yellow-400 py-4 font-bold text-black active:scale-95"
        >
          Add Exercise
        </button>
      </div>
    </section>
  );
}