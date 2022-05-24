import { connect, MapStateToProps } from 'react-redux';
import LoadingOverlay, { LoadingOverlayStateProps } from '../../components/layout/LoadingOverlay';
import { RootState } from '../../reducers/RootReducer';

const mapStateToProps: MapStateToProps<
  LoadingOverlayStateProps,
  Record<string, never>,
  RootState
> = (state: RootState) => {
  return {
    isLoading: state.loading.isLoading,
    percentComplete:
      state.loading.percentComplete === null ? undefined : state.loading.percentComplete,
    message: state.loading.message,
  };
};

const LoadingOverlayContainer = connect(mapStateToProps)(LoadingOverlay);

export default LoadingOverlayContainer;
