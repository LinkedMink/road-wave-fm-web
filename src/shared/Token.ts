// import * as jwt from 'jsonwebtoken';
// import { JwtPayload } from '../types/Account';
// import store from '../store';
import { JWTPayload } from 'jose';

// TODO
export const decodeToken = (token: string): JWTPayload | null => {
  // const signerKey = store.getState().config.signerKey;

  // try {
  //   const decodedToken = (
  //     signerKey ? jwt.verify(token, signerKey) : jwt.decode(token)
  //   ) as JwtPayload;
  //   decodedToken.claims = new Set(decodedToken.claims);
  //   return decodedToken;
  // } catch {
  //   return null;
  // }
  return decodeToken(token);
};
