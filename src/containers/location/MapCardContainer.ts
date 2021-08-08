import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { setSearchLocation } from '../../actions/LocationAction';
import MapCard, {
  MapCardDispatchProps,
  MapCardOwnProps,
  MapCardStateProps,
} from '../../components/location/MapCard';
import { RootState } from '../../reducers/RootReducer';

const mapStateToProps: MapStateToProps<MapCardStateProps, MapCardOwnProps, RootState> = (
  state: RootState,
) => {
  return {
    isMapsApiLoaded: state.map.isInitialized,
    stations: state.station.list,
    userLocation: state.location.user,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<MapCardDispatchProps, MapCardOwnProps> = (
  dispatch: Dispatch,
) => {
  return {
    selectLocation: (lat: number, lng: number) => dispatch(setSearchLocation({ lat, lng })),
  };
};

const MapCardContainer = connect(mapStateToProps, mapDispatchToProps)(MapCard);

export default MapCardContainer;
