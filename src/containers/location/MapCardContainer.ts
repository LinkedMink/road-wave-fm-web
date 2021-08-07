import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { setSearchLocation } from '../../actions/LocationAction';
import MapCard, {
  MapCardDispatchProps,
  MapCardStateProps,
} from '../../components/location/MapCard';
import { RootState } from '../../reducers/RootReducer';

const mapStateToProps: MapStateToProps<MapCardStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    isMapsApiLoaded: !!state.map.api,
    stations: state.station.list,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  MapCardDispatchProps,
  Record<string, never>
> = (dispatch: Dispatch) => {
  return {
    selectLocation: (lat: number, lng: number) => {
      dispatch(setSearchLocation({ lat, lng }));
    },
  };
};

const MapCardContainer = connect(mapStateToProps, mapDispatchToProps)(MapCard);

export default MapCardContainer;
