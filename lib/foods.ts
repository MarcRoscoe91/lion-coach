export type Food = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

export const savedFoods: Food[] = [
  { id: "protein-bowl", name: "🥣 Protein Bowl", calories: 365, protein: 51, carbs: 20, fat: 7 },
  { id: "chicken-rice", name: "🍗 Chicken & Rice", calories: 333, protein: 36, carbs: 32, fat: 4 },
  { id: "mince-rice", name: "🥩 Mince & Rice", calories: 296, protein: 26, carbs: 32, fat: 5 },
  { id: "breakfast", name: "🍳 Breakfast", calories: 493, protein: 46, carbs: 54, fat: 9 },
  { id: "post-workout", name: "🥤 Post Workout", calories: 371, protein: 28, carbs: 55, fat: 4 },
];