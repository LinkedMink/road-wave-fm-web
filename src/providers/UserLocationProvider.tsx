import { FunctionComponent, createContext, useCallback, useContext, useState } from "react";
import { HasChildrenProps } from "../types/reactUtilityTypes";
import { Coordinates } from "../types/responseModels";
import { AlertContext } from "./AlertProvider";
import { AlertActionType } from "../definitions/alertConstants";

const PERMISSION_DENIED_MESSAGE =
  "You declined to allow using your location. No prompt will appear to enable location sharing after it has been declined. Look for a button in the address bar to reenable it.";
const POSITION_UNAVAILABLE_MESSAGE = "Your device failed to get your location.";

export type UserLocationState = {
  isTrackingEnabled: boolean;
  enableTracking: () => void;
  disableTracking: () => void;
  coordinates?: Coordinates;
};

type InternalState = {
  watchId?: number;
  coordinates?: Coordinates;
};

export const UserLocationContext = createContext<UserLocationState>({
  isTrackingEnabled: false,
  enableTracking: () => {},
  disableTracking: () => {},
});

export const UserLocationProvider: FunctionComponent<HasChildrenProps> = props => {
  const [internalState, setInternalState] = useState<InternalState>({});
  const [_, alertDispatch] = useContext(AlertContext);

  const enableTracking = useCallback(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        setInternalState({
          watchId,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        });
      },
      (positionError: GeolocationPositionError) => {
        // TODO Check TIMEOUT error conditions
        if (positionError.PERMISSION_DENIED === positionError.code) {
          alertDispatch({ type: AlertActionType.INFO, payload: PERMISSION_DENIED_MESSAGE });
        } else if (positionError.POSITION_UNAVAILABLE === positionError.code) {
          alertDispatch({ type: AlertActionType.WARN, payload: POSITION_UNAVAILABLE_MESSAGE });
        }
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, [alertDispatch]);

  const disableTracking = useCallback(() => {
    if (!internalState.watchId) {
      console.error("Attempted to disable location tracking without a watch ID");
      return;
    }

    navigator.geolocation.clearWatch(internalState.watchId);
    setInternalState({
      watchId: undefined,
      coordinates: undefined,
    });
  }, [internalState.watchId]);

  return (
    <UserLocationContext.Provider
      value={{
        isTrackingEnabled: !!internalState.watchId,
        enableTracking,
        disableTracking,
        coordinates: internalState.coordinates,
      }}
    >
      {props.children}
    </UserLocationContext.Provider>
  );
};
