// Helper to determine color based on load
export const getLoadColor = (load) => {
  if (load >= 80) return 'bg-red-500 border-red-600 text-white'; // Red: Full
  if (load >= 40) return 'bg-amber-400 border-amber-500 text-amber-950'; // Yellow: Standing Room / Moderate
  return 'bg-emerald-500 border-emerald-600 text-white'; // Green: Seats Available
};

export const getLoadStatusText = (load) => {
  if (load >= 80) return 'Full';
  if (load >= 40) return 'Standing';
  return 'Available';
};

export const findOptimalCoach = (coaches) => {
  const greenIdx = coaches.findIndex(c => c.load < 40);
  if (greenIdx !== -1) return greenIdx;
  
  const yellowIdx = coaches.findIndex(c => c.load < 80);
  return yellowIdx !== -1 ? yellowIdx : 0;
};
