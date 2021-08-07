import { Coordinates } from './Map';

export interface StationViewModel {
  id: string;
  callSign: string;
  protocol: string;
  frequency: number;
  format: string;
  location: Coordinates;
  distance?: number;
  signalStrength?: number;
}

export interface StationRequest {
  lat: number;
  lng: number;
  fmt: string[];
}
