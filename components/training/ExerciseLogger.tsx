"use client";

import { useState } from "react";

import { createSetId, type LoggedSet } from "@/lib/workoutStore";

type ExerciseLoggerProps = {
  exerciseName: string;
  target: string;
  sets: LoggedSet[];
  complete: boolean;
  onAddSet: (set: LoggedSet) => void;
  onDeleteSet: (setId: string) => void;
  onToggleComplete: () => void;
};

export default function ExerciseLogger({
  exerciseName,
  target,
  sets,
  complete,
  onAddSet,
  onDeleteSet,
  onToggleComplete,
}: ExerciseLoggerProps) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  function saveSet() {
    if (!weight && !reps) return;

    onAddSet({
      id: createSetId(),
      weight,
      reps,
    });

    setWeight("");
    setReps("");
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">{exerciseName}</h3>

          <p className="mt-1 text-sm text-zinc-400">{target}</p>
        </div>

        <button
          onClick={onToggleComplete}
          className={
            complete ? "text-3xl text-green-400" : "text-3xl text-zinc-500"
          }
        >
          {complete ? "✓" : "○"}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {sets.length === 0 ? (
          <p className="text-sm text-zinc-500">No sets logged yet.</p>
        ) : (
          sets.map((set, index) => (
            <div
              key={set.id}
              className="flex items-center justify-between rounded-2xl bg-zinc-800 p-4"
            >
              <p className="font-bold">Set {index + 1}</p>

              <p className="text-zinc-300">
                {set.weight || "0"}kg x {set.reps || "0"}
              </p>

              <button
                onClick={() => onDeleteSet(set.id)}
                className="text-sm font-bold text-zinc-500"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <input
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          placeholder="Weight kg"
          inputMode="decimal"
          className="rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
        />

        <input
          value={reps}
          onChange={(event) => setReps(event.target.value)}
          placeholder="Reps"
          inputMode="numeric"
          className="rounded-2xl border border-zinc-800 bg-black p-4 text-white outline-none placeholder:text-zinc-600"
        />
      </div>

      <button
        onClick={saveSet}
        className="mt-4 w-full rounded-2xl bg-yellow-400 py-3 font-bold text-black active:scale-95"
      >
        Save Set
      </button>
    </div>
  );
}