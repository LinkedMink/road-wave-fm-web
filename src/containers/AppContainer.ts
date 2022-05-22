import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { loadDependencies } from '../actions/InitializeAction';
import { loadingEnd } from '../actions/LoadingAction';
import App, { AppDispatchProps, AppStateProps } from '../components/App';
import { RootState } from '../reducers/RootReducer';
import { AppThunkDispatch } from '../store';

const mapStateToProps: MapStateToProps<AppStateProps, Record<string, never>, RootState> = (
  state: RootState,
) => {
  return {
    isLoggedIn: state.session.jwtToken ? true : false,
    isConfigLoaded: state.config.isLoaded,
    isDependenciesLoaded: state.map.isInitialized && !!state.format.list.length,
    isInitialized: state.config.isLoaded && state.map.isInitialized,
    // TODO add condition back
    // && !!state.format.list.length
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<AppDispatchProps, Record<string, never>> = (
  dispatch: AppThunkDispatch,
) => {
  return {
    loadDependencies: () => dispatch(loadDependencies),
    completeInit: () => dispatch(loadingEnd()),
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
