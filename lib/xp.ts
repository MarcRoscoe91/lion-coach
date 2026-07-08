export type MissionStatus = {
  caloriesComplete: boolean;
  proteinComplete: boolean;
  stepsComplete: boolean;
  workoutComplete: boolean;
  waterComplete: boolean;
};

export function calculateDailyXP(missions: MissionStatus) {
  let xp = 0;

  if (missions.caloriesComplete) xp += 50;
  if (missions.proteinComplete) xp += 75;
  if (missions.stepsComplete) xp += 50;
  if (missions.workoutComplete) xp += 150;
  if (missions.waterComplete) xp += 25;

  const allComplete =
    missions.caloriesComplete &&
    missions.proteinComplete &&
    missions.stepsComplete &&
    missions.workoutComplete &&
    missions.waterComplete;

  if (allComplete) xp += 100;

  return xp;
}

export function getLevelFromXP(xp: number) {
  return Math.floor(xp / 500) + 1;
}

export function getXPForCurrentLevel(xp: number) {
  return xp % 500;
}

export function getXPToNextLevel(xp: number) {
  return 500 - getXPForCurrentLevel(xp);
}

export function getRank(level: number) {
  if (level >= 100) return "Lion";
  if (level >= 75) return "King";
  if (level >= 50) return "Legend";
  if (level >= 35) return "Commander";
  if (level >= 20) return "Alpha";
  if (level >= 10) return "Warrior";
  if (level >= 5) return "Hunter";
  return "Cub";
}