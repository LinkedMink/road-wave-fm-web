import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/RootReducer';
import HomePage from '../../components/pages/HomePage';

const mapStateToProps: MapStateToProps<unknown, unknown, RootState> = (state: RootState) => {
  return {
    mapsApiKey: state.config.googleMapsApiKey,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<unknown, unknown> = (_dispatch: Dispatch) => {
  return {};
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomeContainer;
