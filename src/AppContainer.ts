import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { initializeAction } from './actions/InitializeAction';
import App, { AppDispatchProps, AppStateProps } from './App';
import { RootState } from './reducers/RootReducer';
import { AppThunkDispatch } from './store';

const mapStateToProps: MapStateToProps<AppStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    isLoggedIn: state.session.jwtToken ? true : false,
    isInitialized: state.config.isLoaded && state.map.isInitialized && !!state.format.list.length,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<AppDispatchProps, Record<string, never>> = (
  dispatch: AppThunkDispatch,
) => {
  return {
    initialize: () => dispatch(initializeAction),
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
