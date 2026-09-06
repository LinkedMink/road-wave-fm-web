import { getEarthDistance, areEqualCoordinates, areEqualMapPos } from "./math";
import { Coordinates } from "../types/responseModels";

const NYC: Coordinates = { lat: 40.7128, lng: -74.006 };
const LA: Coordinates = { lat: 34.0522, lng: -118.2437 };

const fakeLatLng = (lat: number, lng: number) =>
  ({ lat: () => lat, lng: () => lng }) as unknown as google.maps.LatLng;

describe("getEarthDistance", () => {
  it("returns 0 for identical coordinates", () => {
    expect(getEarthDistance(NYC, NYC)).toBe(0);
  });

  it("computes the haversine distance between two cities in km", () => {
    const distance = getEarthDistance(NYC, LA);
    expect(distance).toBeGreaterThan(3920);
    expect(distance).toBeLessThan(3945);
  });
});

describe("areEqualCoordinates", () => {
  it("returns true for the same reference", () => {
    expect(areEqualCoordinates(NYC, NYC)).toBe(true);
  });

  it("returns true when either lat or lng matches", () => {
    expect(areEqualCoordinates(NYC, { lat: 40.7128, lng: -118.2437 })).toBe(true);
    expect(areEqualCoordinates(NYC, { lat: 34.0522, lng: -74.006 })).toBe(true);
  });

  it("returns false when both lat and lng differ", () => {
    expect(areEqualCoordinates(NYC, LA)).toBe(false);
  });

  it("returns true when both coordinates are undefined", () => {
    expect(areEqualCoordinates(undefined, undefined)).toBe(true);
  });
});

describe("areEqualMapPos", () => {
  it("compares literal coordinates against a LatLng instance", () => {
    expect(areEqualMapPos(NYC, fakeLatLng(40.7128, -74.006))).toBe(true);
    expect(areEqualMapPos(NYC, fakeLatLng(34.0522, -118.2437))).toBe(false);
  });
});
