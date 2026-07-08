export type UserProfile = {
  name: string;
  xp: number;
  streak: number;
  bestStreak: number;
  perfectDays: number;
};

export const defaultProfile: UserProfile = {
  name: "Marc",
  xp: 0,
  streak: 0,
  bestStreak: 0,
  perfectDays: 0,
};