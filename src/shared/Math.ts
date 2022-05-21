import { Coordinates } from '../definitions/Map';

const EARTH_RADIUS = 6371;

const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const getEarthDistance = (p1: Coordinates, p2: Coordinates): number => {
  const dLat = toRadians(p2.lat - p1.lat);
  const dLng = toRadians(p2.lng - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(p1.lat)) *
      Math.cos(toRadians(p2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
};

export const areEqualCoordinates = (p1?: Coordinates, p2?: Coordinates): boolean =>
  p1 === p2 || p1?.lat === p2?.lat || p1?.lng === p2?.lng;

export const areEqualMapPos = (literal: Coordinates, ref: google.maps.LatLng): boolean =>
  literal.lat === ref.lat() && literal.lng === ref.lng();
