import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import {
  clearLocationWatchId,
  setLocation,
  setLocationFailed,
  setLocationWatchId,
} from '../../actions/LocationAction';
import PreferenceLocationGroup, {
  PreferenceLocationGroupDispatchProps,
  PreferenceLocationGroupStateProps,
} from '../../components/location/PreferenceLocationGroup';
import { RootState } from '../../reducers/RootReducer';

const MAX_POSITION_AGE = 5 * 60 * 1000;
const GET_POSITION_TIMEOUT = 0;

const mapStateToProps: MapStateToProps<
  PreferenceLocationGroupStateProps,
  Record<string, never>,
  RootState
> = (state: RootState) => {
  return {
    isLocationWatchEnabled: !!(state.location.watchId && state.location.current),
    hasFailedGetLocation: state.location.hasFailedGetLocation,
    currentLocation: state.location.current,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  PreferenceLocationGroupDispatchProps,
  Record<string, never>
> = (dispatch: Dispatch) => {
  return {
    enableLocationWatch: () => {
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
    disableLocationWatch: () => {
      dispatch(clearLocationWatchId());
    },
  };
};

const PreferenceLocationGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreferenceLocationGroup);

export default PreferenceLocationGroupContainer;
