import { Loader } from "@googlemaps/js-api-loader";
import { AppThunkAction } from "../store";
import { MapAction, MapActionType } from "../definitions/Actions";

export function mapInit(): MapAction {
  return {
    type: MapActionType.Init,
    payload: null,
  };
}

export const fetchMapsApi: AppThunkAction = async (dispatch, getState) => {
  const apiKey = getState().config.googleMapsApiKey;
  const mapsLoader = new Loader({ apiKey, libraries: ["places"] });
  await mapsLoader.load();
  dispatch(mapInit());
};
