import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  clearLocationWatchId,
  setLocation,
  setLocationFailed,
  setLocationWatchId,
} from '../../actions/LocationAction';
import PermissionCard, {
  PermissionCardDispatchProps,
  PermissionCardStateProps,
} from '../../components/location/PermissionCard';
import { RootState } from '../../reducers/RootReducer';

const MAX_POSITION_AGE = 5 * 60 * 1000;
const GET_POSITION_TIMEOUT = 0;

const mapStateToProps: MapStateToProps<
  PermissionCardStateProps,
  Record<string, never>,
  RootState
> = (state: RootState) => {
  return {
    hasPermission: !!(state.location.watchId && state.location.current),
    hasFailedGetLocation: state.location.hasFailedGetLocation,
    currentLocation: state.location.current,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  PermissionCardDispatchProps,
  Record<string, never>
> = (dispatch: Dispatch) => {
  return {
    enableLocation: () => {
      const id = navigator.geolocation.watchPosition(
        (position: GeolocationPosition) => {
          dispatch(
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          );
        },
        (positionError: GeolocationPositionError) => {
          dispatch(setLocationFailed());
          console.log(positionError);
        },
        {
          maximumAge: MAX_POSITION_AGE,
          timeout: GET_POSITION_TIMEOUT,
          enableHighAccuracy: true,
        },
      );

      dispatch(setLocationWatchId(id));
    },
    disableLocation: () => {
      dispatch(clearLocationWatchId());
    },
  };
};

const PermissionCardContainer = connect(mapStateToProps, mapDispatchToProps)(PermissionCard);

export default PermissionCardContainer;
