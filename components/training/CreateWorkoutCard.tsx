"use client";

import { useState } from "react";

type CreateWorkoutCardProps = {
  onCreateWorkout: (data: {
    name: string;
    focus: string;
    xpReward: number;
  }) => void;
};

export default function CreateWorkoutCard({
  onCreateWorkout,
}: CreateWorkoutCardProps) {
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");
  const [xpReward, setXpReward] = useState("150");

  function saveWorkout() {
    if (!name.trim()) return;

    onCreateWorkout({
      name: name.trim(),
      focus: focus.trim() || "Custom workout",
      xpReward: Number(xpReward) || 150,
    });

    setName("");
    setFocus("");
    setXpReward("150");
  }

  return (
    <section className="mt-8 rounded-[2rem] border border-yellow-500/20 bg-yellow-400/10 p-6">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
        Create Workout
      </p>

      <h2 className="mt-2 text-2xl font-bold">Build your own session</h2>

      <div className="mt-5 space-y-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Workout name"
          className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
        />

        <input
          value={focus}
          onChange={(event) => setFocus(event.target.value)}
          placeholder="Focus e.g. Chest and shoulders"
          className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
        />

        <input
          value={xpReward}
          onChange={(event) => setXpReward(event.target.value)}
          placeholder="XP reward"
          inputMode="numeric"
          className="w-full rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
        />

        <button
          onClick={saveWorkout}
          className="w-full rounded-2xl bg-yellow-400 py-4 font-bold text-black active:scale-95"
        >
          Save Workout
        </button>
      </div>
    </section>
  );
}