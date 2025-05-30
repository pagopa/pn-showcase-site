import { RaddOperator } from "src/model";

export function sortPointsByDistance(
  rows: RaddOperator[],
  userCoordinates: {
    latitude: number;
    longitude: number;
  }
) {
  return rows
    .map((row) => {
      if (!row.latitude || !row.longitude) return undefined;
      const toRad = (value: number) => (value * Math.PI) / 180;
      const R = 6371;

      const dLat = toRad(row.latitude - userCoordinates.latitude);
      const dLon = toRad(row.longitude - userCoordinates.longitude);

      const lat1 = toRad(userCoordinates.latitude);
      const lat2 = toRad(row.latitude);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return { ...row, distance };
    })
    .filter(
      (item): item is Exclude<typeof item, undefined> => item !== undefined
    )
    .sort((a, b) => a.distance - b.distance);
}
