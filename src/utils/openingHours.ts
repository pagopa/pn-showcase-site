import { OpeningDays } from "src/model";

export const OPENING_DAYS: (keyof OpeningDays)[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const formatHours = (openingHours?: string): string | null => {
  if (!openingHours) return null;
  return openingHours.replaceAll("_", " / ");
};
