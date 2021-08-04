import { Coordinates } from './Location';

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
