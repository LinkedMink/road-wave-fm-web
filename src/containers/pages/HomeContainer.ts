
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers/RootReducer';
import { alertInfo } from '../../actions/AlertAction';
import HomePage from '../../components/pages/HomePage';
import { Routes, Services } from '../../types/Service';
import { HttpMethods, getJsonResponse } from '../../shared/RequestFactory';

const mapStateToProps: MapStateToProps<unknown, unknown, RootState> = (
  state: RootState,
) => {
  return {
    mapsApiKey: state.config.googleMapsApiKey
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  unknown,
  unknown
> = (dispatch: Dispatch) => {
  return {
    query: () => {

    },
  };
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomeContainer;
