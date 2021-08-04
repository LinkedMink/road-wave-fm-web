import { connect, MapStateToProps } from 'react-redux';
import MapCard, { MapCardStateProps } from '../../components/location/MapCard';
import { RootState } from '../../reducers/RootReducer';

const mapStateToProps: MapStateToProps<MapCardStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    stations: state.station.list,
  };
};

const MapCardContainer = connect(mapStateToProps)(MapCard);

export default MapCardContainer;
