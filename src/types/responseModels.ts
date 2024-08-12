/**
 * TODO export/import API
 */
export interface ValidationErrorDto {
  readonly formErrors: string[];
  readonly fieldErrors: Record<string, string[]>;
}

export interface RpcErrorResponse {
  readonly error: {
    readonly message: string;
    readonly code: number;
    readonly data: {
      readonly code: string;
      readonly httpStatus: number;
      readonly stack: string;
      readonly path: string;
    };
  };
}

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
  readonly id: number;
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

export interface StationLocationViewModel {
  readonly id: number;
  readonly callSign: string;
  readonly protocol: string;
  readonly frequency: number;
  readonly format: string;
  readonly formatId: number;
  readonly coordinates: [number, number];
  readonly distance: number;
  readonly signalStrength?: number;
}

export interface JwtPayload {
  readonly iss: string;
  readonly sub: string;
  readonly aud: string;
  readonly jti?: string;
  readonly nbf?: number;
  readonly exp?: number;
  readonly iat?: number;
}
