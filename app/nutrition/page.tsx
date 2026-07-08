import BottomNav from "@/components/navigation/BottomNav";
import MacroCard from "@/components/nutrition/MacroCard";
import MealCard from "@/components/nutrition/MealCard";
import NutritionHeader from "@/components/nutrition/NutritionHeader";

const nutrition = {
  calories: { current: 1845, target: 2250 },
  protein: { current: 186, target: 210 },
  carbs: { current: 175, target: 220 },
  fat: { current: 48, target: 60 },
};

const meals = [
  {
    meal: "Breakfast",
    description: "Protein bowl",
    calories: 493,
    protein: 46,
  },
  {
    meal: "Lunch",
    description: "Chicken & rice",
    calories: 333,
    protein: 36,
  },
  {
    meal: "Dinner",
    description: "Tap to add meal",
    calories: 0,
    protein: 0,
  },
  {
    meal: "Snacks",
    description: "Tap to add snacks",
    calories: 0,
    protein: 0,
  },
];

export default function NutritionPage() {
  return (
    <main className="min-h-screen bg-black p-5 text-white">
      <div className="mx-auto max-w-md pb-32">
        <NutritionHeader />

        <section className="grid grid-cols-2 gap-4">
          <MacroCard
            title="Calories"
            current={nutrition.calories.current}
            target={nutrition.calories.target}
          />

          <MacroCard
            title="Protein"
            current={nutrition.protein.current}
            target={nutrition.protein.target}
          />

          <MacroCard
            title="Carbs"
            current={nutrition.carbs.current}
            target={nutrition.carbs.target}
          />

          <MacroCard
            title="Fat"
            current={nutrition.fat.current}
            target={nutrition.fat.target}
          />
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black">Today&apos;s Meals</h2>

            <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-black">
              +325 XP
            </span>
          </div>

          <div className="space-y-4">
            {meals.map((meal) => (
              <MealCard
                key={meal.meal}
                meal={meal.meal}
                description={meal.description}
                calories={meal.calories}
                protein={meal.protein}
              />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-yellow-500/20 bg-yellow-400/10 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            Saved Meals
          </p>

          <h2 className="mt-2 text-2xl font-bold">One tap logging</h2>

          <p className="mt-2 text-zinc-300">
            Your most-used meals will appear here first so logging food stays
            fast.
          </p>

          <button className="mt-5 w-full rounded-2xl bg-yellow-400 py-4 font-bold text-black active:scale-95">
            + Create Saved Meal
          </button>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}