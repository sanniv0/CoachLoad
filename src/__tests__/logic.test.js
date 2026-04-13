import { describe, it, expect } from 'vitest';
import { getLoadColor, getLoadStatusText, findOptimalCoach } from '../utils/logic';

describe('Coach Load Logic', () => {
  it('should return correct color for high load', () => {
    expect(getLoadColor(90)).toContain('bg-red-500');
  });

  it('should return correct color for medium load', () => {
    expect(getLoadColor(50)).toContain('bg-amber-400');
  });

  it('should return correct color for low load', () => {
    expect(getLoadColor(20)).toContain('bg-emerald-500');
  });

  it('should return correct status text', () => {
    expect(getLoadStatusText(90)).toBe('Full');
    expect(getLoadStatusText(50)).toBe('Standing');
    expect(getLoadStatusText(20)).toBe('Available');
  });

  it('should find the optimal coach (prefer green)', () => {
    const coaches = [
      { load: 90 }, // Full
      { load: 60 }, // Standing
      { load: 20 }, // Available (Green)
      { load: 15 }, // Available (Green)
    ];
    // Should find the first green one (index 2)
    expect(findOptimalCoach(coaches)).toBe(2);
  });

  it('should find yellow if no green is available', () => {
    const coaches = [
      { load: 90 },
      { load: 60 },
      { load: 95 },
    ];
    expect(findOptimalCoach(coaches)).toBe(1);
  });
});
