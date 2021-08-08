import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { alertError } from '../../actions/AlertAction';
import {
  clearLocationWatchId,
  setLocationWatchFailed,
  setLocationWatchId,
  setSearchLocation,
  setUserLocation,
} from '../../actions/LocationAction';
import PreferenceLocationGroup, {
  PreferenceLocationGroupDispatchProps,
  PreferenceLocationGroupStateProps,
} from '../../components/location/PreferenceLocationGroup';
import { RootState } from '../../reducers/RootReducer';

const PERMISSION_GRANT_ERROR =
  'No prompt will appear to enable locaion sharing after it has been declined. Look for a button in the address bar to reenable it.';
const CLIENT_LOCATION_ERROR = '';

const mapStateToProps: MapStateToProps<
  PreferenceLocationGroupStateProps,
  Record<string, never>,
  RootState
> = (state: RootState) => {
  return {
    isLocationWatchEnabled: !!state.location.watchId,
    hasFailedGetLocation: state.location.hasFailedGetLocation,
    userLocation: state.location.user,
    searchLocation: state.location.search,
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
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }),
          );
        },
        (positionError: GeolocationPositionError) => {
          if (positionError.PERMISSION_DENIED === positionError.code) {
            dispatch(alertError(PERMISSION_GRANT_ERROR));
            dispatch(setLocationWatchFailed());
          } else if (positionError.POSITION_UNAVAILABLE === positionError.code) {
            dispatch(alertError(CLIENT_LOCATION_ERROR));
            dispatch(setLocationWatchFailed());
          }
        },
        {
          enableHighAccuracy: true,
        },
      );

      dispatch(setLocationWatchId(id));
    },
    disableLocationWatch: () => dispatch(clearLocationWatchId()),
    selectLocation: (lat: number, lng: number) => dispatch(setSearchLocation({ lat, lng })),
  };
};

const PreferenceLocationGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreferenceLocationGroup);

export default PreferenceLocationGroupContainer;
