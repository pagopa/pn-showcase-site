/**
 * Utility functions for date operations
 */

/**
 * Checks if the current date is within the alert display period
 * The alert should be visible from August 14, 2026, 00:00 to August 25, 2026, 23:59
 *
 * @returns {boolean} True if the alert should be displayed, false otherwise
 */
export const isAlertVisibleWithTimezone = (): boolean => {
  const now = new Date();

  // Note: Month is 0-based in JavaScript Date constructor (August = 7)
  const startDate = new Date(2026, 7, 14, 0, 0, 0);
  const endDate = new Date(2026, 7, 25, 23, 59, 59);

  return now >= startDate && now <= endDate;
};
