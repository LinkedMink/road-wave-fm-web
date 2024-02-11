import { Loader } from "@googlemaps/js-api-loader";
import { FunctionComponent, createContext, useContext, useRef } from "react";
import { useAsync } from "react-use";
import { LoadingOverlay } from "../components/layout/LoadingOverlay";
import { ConfigContext } from "../environments/ConfigContext";
import { HasChildrenProps } from "../types/reactUtilityTypes";

export type MapsApi = {
  core: google.maps.CoreLibrary;
  maps: google.maps.MapsLibrary;
  marker: google.maps.MarkerLibrary;
  places: google.maps.PlacesLibrary;
};

export const MapsContext = createContext<MapsApi>({} as MapsApi);

export const MapsProvider: FunctionComponent<HasChildrenProps> = props => {
  const config = useContext(ConfigContext);
  const mapsApiRef = useRef<null | MapsApi>(null);
  const mapsApiLoadState = useAsync(async () => {
    const mapsLoader = new Loader({
      apiKey: config.GOOGLE_MAPS_API_KEY,
      libraries: ["core", "maps", "marker", "places"],
    });
    const [coreApi, mapsApi, markerApi, placesApi] = await Promise.all([
      mapsLoader.importLibrary("core"),
      mapsLoader.importLibrary("maps"),
      mapsLoader.importLibrary("marker"),
      mapsLoader.importLibrary("places"),
    ]);

    mapsApiRef.current = {
      core: coreApi,
      maps: mapsApi,
      marker: markerApi,
      places: placesApi,
    };
    return mapsApiRef.current;
  }, [config.GOOGLE_MAPS_API_KEY]);

  return !mapsApiLoadState.loading && mapsApiRef.current ? (
    <MapsContext.Provider value={mapsApiRef.current}>{props.children}</MapsContext.Provider>
  ) : (
    <LoadingOverlay isLoading={true} />
  );
};
