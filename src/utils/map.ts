import { LngLatBoundsLike } from "maplibre-gl";
import { MapRef } from "react-map-gl/maplibre";
import { Coordinates, RaddOperator } from "src/model";

/**
 * Sorts an array of points by their distance from the user's coordinates using the Haversine formula.
 *
 * @param {RaddOperator[]} rows - Array of points, each with latitude and longitude properties
 * @param {{ latitude: number, longitude: number }} userCoordinates - The user's current geographic location
 * @returns {Array<RaddOperator>} A new array of points augmented with distance values, sorted by proximity to the user
 */
export function sortPointsByDistance(
  rows: RaddOperator[],
  userCoordinates: {
    latitude: number;
    longitude: number;
  }
): Array<RaddOperator> {
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

/**
 * Adjusts the map viewport to include the user's position and the nearest points.
 *
 * @param {Coordinates} userPosition - The current location of the user
 * @param {RaddOperator[]} points - A list of points to consider for fitting on the map
 * @param {MapRef} map - Map reference
 * @param {number} pointsToFit - The number of nearest points to include in the view
 */
export const fitMapToPoints = (
  userPosition: Coordinates,
  points: RaddOperator[],
  map: MapRef,
  pointsToFit: number = 5
) => {
  const sortedPoints = sortPointsByDistance(points, userPosition);

  const targetPoints = sortedPoints.slice(0, pointsToFit);

  const allCoordinates = [
    [userPosition.longitude, userPosition.latitude],
    ...targetPoints.map((point) => [point.longitude!, point.latitude!]),
  ];

  const lngs = allCoordinates.map((coord) => coord[0]);
  const lats = allCoordinates.map((coord) => coord[1]);

  const bounds: LngLatBoundsLike = [
    [Math.min(...lngs), Math.min(...lats)],
    [Math.max(...lngs), Math.max(...lats)],
  ];

  map.fitBounds(bounds, {
    padding: { top: 50, bottom: 50, left: 50, right: 50 },
    maxZoom: 15,
    duration: 1500,
    center: [userPosition.longitude, userPosition.latitude],
  });
};
