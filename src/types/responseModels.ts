export interface MessageResponse {
  readonly message: string;
}

export interface Coordinates {
  readonly lat: number;
  readonly lng: number;
}

export interface AuthenticateResponse {
  readonly token: string;
}

export interface AccountModel {
  readonly email: string;
  readonly password?: string;
  readonly isEmailVerified: boolean;
  readonly isLocked: boolean;
  readonly isLockedDate?: Date;
  readonly authenticationDates?: Date[];
  readonly claims: string[];
}

export interface FormatViewModel {
  readonly id: string;
  readonly name: string;
}

export interface StationViewModel {
  readonly id: string;
  readonly callSign: string;
  readonly protocol: string;
  readonly frequency: number;
  readonly format: string;
  readonly location: Coordinates;
  readonly distance?: number;
  readonly signalStrength?: number;
}
