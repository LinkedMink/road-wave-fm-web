import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { fetchStationAction } from '../../actions/StationAction';
import ListCard, {
  ListCardDispatchProps,
  ListCardOwnProps,
  ListCardStateProps,
} from '../../components/location/ListCard';
import { RootState } from '../../reducers/RootReducer';
import { isArrayContentsEqual } from '../../shared/Collection';
import { areEqualCoordinates } from '../../shared/Math';
import { AppThunkDispatch } from '../../store';
import { StationRequest } from '../../types/Station';

const mapStateToProps: MapStateToProps<ListCardStateProps, ListCardOwnProps, RootState> = (
  state: RootState,
) => {
  const hasNewCriteria =
    state.location.search &&
    (!areEqualCoordinates(state.location.search, state.station.lastRequest) ||
      !isArrayContentsEqual(state.format.selected, state.station.lastRequest?.fmt));

  return {
    isLoading: state.station.isLoading,
    stations: state.station.list,
    searchCriteria: hasNewCriteria
      ? {
          lat: state.location.search?.lat as number,
          lng: state.location.search?.lng as number,
          fmt: state.format.selected,
        }
      : undefined,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<ListCardDispatchProps, ListCardOwnProps> = (
  dispatch: AppThunkDispatch,
) => {
  return {
    retrieveStations: (criteria: StationRequest) => dispatch(fetchStationAction(criteria)),
  };
};

const ListCardContainer = connect(mapStateToProps, mapDispatchToProps)(ListCard);

export default ListCardContainer;
