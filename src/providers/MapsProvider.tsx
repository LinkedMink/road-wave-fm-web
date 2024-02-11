import { Loader } from "@googlemaps/js-api-loader";
import { FunctionComponent, createContext, useContext, useEffect, useState } from "react";
import { ConfigContext } from "../environments/ConfigContext";
import { HasChildrenProps } from "../types/reactUtilityTypes";

export type MapsApi = {
  maps: google.maps.MapsLibrary;
  places: google.maps.PlacesLibrary;
};

export const MapsContext = createContext<null | MapsApi>(null);

export const MapsProvider: FunctionComponent<HasChildrenProps> = props => {
  const config = useContext(ConfigContext);
  const [mapsApi, setMapsApi] = useState<null | MapsApi>(null);

  useEffect(() => {
    void (async () => {
      const mapsLoader = new Loader({ apiKey: config.GOOGLE_MAPS_API_KEY, libraries: ["places"] });
      const [mapsApi, placesApi] = await Promise.all([
        mapsLoader.importLibrary("maps"),
        mapsLoader.importLibrary("places"),
      ]);

      setMapsApi({
        maps: mapsApi,
        places: placesApi,
      });
    })();
  }, [config]);

  return <MapsContext.Provider value={mapsApi}>{props.children}</MapsContext.Provider>;
};
