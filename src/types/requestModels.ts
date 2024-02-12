import type { StationViewModel } from "./responseModels";

export interface StationRequest {
  readonly lat: number;
  readonly lng: number;
  readonly fmt?: string[];
}

export interface StationsRequestResult {
  readonly params: StationRequest;
  readonly data: StationViewModel[];
}
