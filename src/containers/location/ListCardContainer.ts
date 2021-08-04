import { connect, MapStateToProps } from 'react-redux';
import ListCard, { ListCardOwnProps, ListCardStateProps } from '../../components/location/ListCard';
import { RootState } from '../../reducers/RootReducer';

const mapStateToProps: MapStateToProps<ListCardStateProps, ListCardOwnProps, RootState> = (
  state: RootState,
) => {
  return {
    stations: state.station.list,
  };
};

const ListCardContainer = connect(mapStateToProps, undefined)(ListCard);

export default ListCardContainer;
