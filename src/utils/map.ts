import { LngLatBounds } from "maplibre-gl";
import { MapRef } from "react-map-gl/maplibre";
import { Coordinates, Point, RaddOperator } from "src/model";

/**
 * Sort an array of points by their distance from a reference point using the Haversine formula.
 *
 * The function handles two different reference points:
 * - Sorting reference: Uses targetPoint if provided, otherwise userCoordinates
 * - Distance display: Uses userCoordinates if provided, otherwise targetPoint
 *
 * @param {RaddOperator[]} rows - Array of points
 * @param {Coordinates | null} userCoordinates - The user location
 * @param {Coordinates | null} targetPoint - Optional target point for sorting reference
 * @returns {Array<RaddOperator>} A new array of points with distance values (in km),
 * sorted by proximity to the sorting reference point
 */
export function sortPointsByDistance(
  rows: RaddOperator[],
  userCoordinates: Coordinates | null,
  targetPoint: Coordinates | null = null,
  searchedAddress: Coordinates | null = null
): Array<RaddOperator> {
  const sortingReference = targetPoint || userCoordinates;
  const distanceReference = searchedAddress || userCoordinates;

  if (!sortingReference) {
    return rows;
  }

  return rows
    .map((row) => {
      const sortingDistance = calculateDistance(
        sortingReference.latitude,
        sortingReference.longitude,
        row.latitude,
        row.longitude
      );

      // Calculate distance for display (from user position if available)
      const displayDistance = distanceReference
        ? calculateDistance(
            distanceReference.latitude,
            distanceReference.longitude,
            row.latitude,
            row.longitude
          )
        : sortingDistance;

      return {
        ...row,
        distance: displayDistance,
        _sortingDistance: sortingDistance,
      };
    })
    .filter(
      (item): item is Exclude<typeof item, undefined> => item !== undefined
    )
    .sort((a, b) => a._sortingDistance - b._sortingDistance)
    .map(({ _sortingDistance, ...item }) => item);
}

/**
 * Calculates distance between two points using the Haversine formula.
 *
 * @param {number} lat1 - Latitude of the first point
 * @param {number} lon1 - Longitude of the first point
 * @param {number} lat2 - Latitude of the second point
 * @param {number} lon2 - Longitude of the second point
 * @returns {number} Distance between the two points in kilometers
 */
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const radLat1 = toRad(lat1);
  const radLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(radLat1) *
      Math.cos(radLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

/**
 * Adjusts the map viewport to include the user's position and the nearest points.
 *
 * @param {Coordinates} coordinates - The coordinates of the point to center
 * @param {RaddOperator[]} points - A list of points to consider for fitting on the map
 * @param {MapRef} map - Map reference
 * @param {number} pointsToFit - The number of nearest points to include in the view
 */
export const fitMapToPoints = (
  coordinates: Coordinates,
  points: RaddOperator[],
  map: MapRef,
  pointsToFit: number = 5
) => {
  if (!points.length) return;

  const sortedPoints = sortPointsByDistance(points, coordinates, null);
  const targetPoints = sortedPoints.slice(
    0,
    Math.min(pointsToFit, sortedPoints.length)
  );

  const distances = targetPoints.map((point) =>
    calculateDistance(
      coordinates.latitude,
      coordinates.longitude,
      point.latitude,
      point.longitude
    )
  );
  const maxDistance = Math.max(...distances);

  // Converts distance into degrees (approximation: 1° ≈ 111km) and add 10% for padding
  const radiusInDegrees = (maxDistance * 1.1) / 111;

  try {
    const bounds = new LngLatBounds();

    bounds.extend([
      coordinates.longitude - radiusInDegrees,
      coordinates.latitude - radiusInDegrees,
    ]);
    bounds.extend([
      coordinates.longitude + radiusInDegrees,
      coordinates.latitude + radiusInDegrees,
    ]);

    map.fitBounds(bounds, {
      maxZoom: 15,
      duration: 1500,
    });
  } catch (e) {
    console.error("Unable to fit map to points", e);
  }
};

/**
 * Maps a CSV row (point) to the frontend model (RaddOperator)
 *
 * @param {Point} point - The point object from the CSV
 * @returns {RaddOperator} The mapped RaddOperator object
 */
export const mapPoint = (point: Point): RaddOperator => ({
  locationId: point.locationId,
  external_codes: point.codici_esterni,
  denomination: point.descrizione,
  city: point.città,
  address: point.indirizzo,
  province: point.provincia,
  cap: point.cap,
  contacts: point.telefoni,
  latitude: Number(point.latitudine),
  longitude: Number(point.longitudine),
  monday: point.lunedi,
  tuesday: point.martedi,
  wednesday: point.mercoledi,
  thursday: point.giovedi,
  friday: point.venerdi,
  saturday: point.sabato,
  sunday: point.domenica,
  rawOpeningHours: point.orari_apertura,
  appointmentRequired: point.richiede_appuntamento === "si",
  email: point.email,
  website: point.website,
});

export const areCoordinatesEqual = (
  coordinates1: Coordinates | null,
  coordinates2: Coordinates | null
): boolean => {
  if (!coordinates1 || !coordinates2) return false;
  return (
    coordinates1.latitude === coordinates2.latitude &&
    coordinates1.longitude === coordinates2.longitude
  );
};
