export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AuthenticateResponse {
  token: string;
}

export interface AccountModel {
  email: string;
  password?: string;
  isEmailVerified: boolean;
  isLocked: boolean;
  isLockedDate?: Date;
  authenticationDates?: Date[];
  claims: string[];
}

export interface FormatViewModel {
  id: string;
  name: string;
}

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
