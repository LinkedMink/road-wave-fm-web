import { Coordinates } from '../types/Map';

export const getDistance = (_p1: Coordinates, _p2: Coordinates): number => {
  return 0; // TODO
};

export const areEqualCoordinates = (p1?: Coordinates, p2?: Coordinates): boolean =>
  p1 === p2 || p1?.lat === p2?.lat || p1?.lng === p2?.lng;

export const areEqualMapPos = (literal: Coordinates, ref: google.maps.LatLng): boolean =>
  literal.lat === ref.lat() && literal.lng === ref.lng();
