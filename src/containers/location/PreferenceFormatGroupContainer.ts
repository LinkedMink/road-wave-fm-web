import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import PreferenceFormatGroup, {
  PreferenceFormatGroupDispatchProps,
  PreferenceFormatGroupStateProps,
} from '../../components/location/PreferenceFormatGroup';
import { RootState } from '../../reducers/RootReducer';

const mapStateToProps: MapStateToProps<
  PreferenceFormatGroupStateProps,
  Record<string, never>,
  RootState
> = (state: RootState) => {
  return {
    formats: state.format.list,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  PreferenceFormatGroupDispatchProps,
  Record<string, never>
> = (_dispatch: Dispatch) => {
  return {
    selectFormats: (_ids: string[]) => {
      // TODO
    },
  };
};

const PreferenceFormatGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreferenceFormatGroup);

export default PreferenceFormatGroupContainer;
