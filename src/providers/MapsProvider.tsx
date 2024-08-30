// import { Loader } from "@googlemaps/js-api-loader";
import { FunctionComponent, createContext, useContext } from "react";
import { useAsync } from "react-use";
import type { AsyncState } from "react-use/lib/useAsync";
import { ConfigContext } from "../environments/ConfigContext";
import { HasChildrenProps } from "../types/reactUtilityTypes";
import { mapsLoaderBootstrap } from "./MapsLoaderBootstrap";

export type MapsApi = {
  core: AsyncState<google.maps.CoreLibrary>;
  maps: AsyncState<google.maps.MapsLibrary>;
  marker: AsyncState<google.maps.MarkerLibrary>;
  places: AsyncState<google.maps.PlacesLibrary>;
};

export const MapsContext = createContext<MapsApi>({} as MapsApi);

export const MapsProvider: FunctionComponent<HasChildrenProps> = props => {
  const config = useContext(ConfigContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!window.google?.maps?.importLibrary) {
    mapsLoaderBootstrap({ key: config.GOOGLE_MAPS_API_KEY });
  }
  // const mapsLoader = useMemo(
  //   () =>
  //     new Loader({
  //       apiKey: config.GOOGLE_MAPS_API_KEY,
  //       libraries: ["core", "maps", "marker", "places"],
  //     }),
  //   [config.GOOGLE_MAPS_API_KEY]
  // );

  const core = useAsync(
    () => google.maps.importLibrary("core") as Promise<google.maps.CoreLibrary>,
    []
  );
  const maps = useAsync(
    () => google.maps.importLibrary("maps") as Promise<google.maps.MapsLibrary>,
    []
  );
  const marker = useAsync(
    () => google.maps.importLibrary("marker") as Promise<google.maps.MarkerLibrary>,
    []
  );
  const places = useAsync(
    () => google.maps.importLibrary("places") as Promise<google.maps.PlacesLibrary>,
    []
  );

  return (
    <MapsContext.Provider value={{ core, maps, marker, places }}>
      {props.children}
    </MapsContext.Provider>
  );
};
