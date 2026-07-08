import BottomNav from "@/components/navigation/BottomNav";

export default function NutritionPage() {
  return (
    <main className="min-h-screen bg-black p-5 text-white">
      <div className="mx-auto max-w-md pb-32">
        <h1 className="text-4xl font-black">Nutrition</h1>
        <p className="mt-2 text-zinc-400">Food tracking coming next.</p>

        <section className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">Today&apos;s Meals</h2>
          <p className="mt-3 text-zinc-400">
            Breakfast, lunch, dinner and snacks will live here.
          </p>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}