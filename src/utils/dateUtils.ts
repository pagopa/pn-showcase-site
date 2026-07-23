/**
 * Utility functions for date operations
 */

/**
 * Checks if the current date is within the alert display period
 * The alert should be visible from July 22, 2026, 00:00 to July 24, 2026, 16:00
 *
 * @returns {boolean} True if the alert should be displayed, false otherwise
 */
export const isAlertVisibleWithTimezone = (): boolean => {
  const now = new Date();

  // Note: Month is 0-based in JavaScript Date constructor (July = 6)
  const startDate = new Date(2026, 6, 22, 0, 0, 0);
  const endDate = new Date(2026, 6, 24, 16, 0, 0);

  return now >= startDate && now <= endDate;
};
