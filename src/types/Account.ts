export enum Claim {
  Settings = 'UserSettings',
}

export const MIN_PASSWORD_LENGTH = 8;

export interface JwtPayload {
  aud: string;
  claims: Set<Claim>;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
}

export interface TrackedEntityModel {
  id?: string;
  createdDate?: Date;
  createdBy?: string;
  modifiedDate?: Date;
  modifiedBy?: string;
}

export interface AccountModel extends TrackedEntityModel {
  email: string;
  password?: string;
  isEmailVerified: boolean;
  isLocked: boolean;
  isLockedDate?: Date;
  authenticationDates?: Date[];
  claims: string[];
}

export interface AuthenticateResponse {
  token: string
}
