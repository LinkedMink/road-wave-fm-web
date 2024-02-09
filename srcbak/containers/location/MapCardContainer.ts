import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { setSearchLocation } from "../../actions/LocationAction";
import MapCard, {
  MapCardDispatchProps,
  MapCardOwnProps,
  MapCardStateProps,
} from "../../components/location/MapCard";
import { RootState } from "../../reducers/RootReducer";
import { AppThunkDispatch } from "../../store";

const mapStateToProps: MapStateToProps<MapCardStateProps, MapCardOwnProps, RootState> = (
  state: RootState
) => {
  return {
    isMapsApiLoaded: state.map.isInitialized,
    isTrackingUser: state.location.watchId !== undefined,
    stations: state.station.list,
    userLocation: state.location.user,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<MapCardDispatchProps, MapCardOwnProps> = (
  dispatch: AppThunkDispatch
) => {
  return {
    selectLocation: (lat: number, lng: number) => dispatch(setSearchLocation({ lat, lng })),
  };
};

const MapCardContainer = connect(mapStateToProps, mapDispatchToProps)(MapCard);

export default MapCardContainer;
