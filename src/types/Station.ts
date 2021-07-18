import { TrackedEntityModel } from './Entity';

export interface GeoPointModel {
  type: string;
  coordinates: number[];
}

export interface StationModel extends TrackedEntityModel {
  callSign: string;
  city?: string;
  organization?: string;
  protocol?: string;
  frequency?: string;
  format?: string;
  websiteUrl?: string;
  streamUrl?: string;
  owner?: string;
  address?: string;
  phone?: string;
  regulatoryStatus?: string;
  power?: number;
  altitudeAboveAverage?: number;
  altitudeAboveGround?: number;
  altitudeAboveSeaLevel?: number;
  antennaPattern?: string;
  location: GeoPointModel;
  licenseGrantedDate?: Date;
  licenseExpiresDate?: Date;
}
