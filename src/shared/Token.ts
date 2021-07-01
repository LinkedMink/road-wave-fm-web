import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/Account';
import store from '../store';

export const decodeToken = (token: string): JwtPayload | null => {
  const signerKey = store.getState().config.signerKey;

  try {
    const decodedToken = (
      signerKey ? jwt.verify(token, signerKey) : jwt.decode(token)
    ) as JwtPayload;
    decodedToken.claims = new Set(decodedToken.claims);
    return decodedToken;
  } catch {
    return null;
  }
};
