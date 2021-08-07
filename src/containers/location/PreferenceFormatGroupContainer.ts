import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import { formatSelect } from '../../actions/FormatAction';
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
  const selected = new Set(state.format.selected);
  return {
    formats: state.format.list.map((f) => ({ ...f, isSelected: selected.has(f.id) })),
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  PreferenceFormatGroupDispatchProps,
  Record<string, never>
> = (dispatch: Dispatch) => {
  return {
    selectFormats: (ids: string[]) => {
      dispatch(formatSelect(ids));
    },
  };
};

const PreferenceFormatGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreferenceFormatGroup);

export default PreferenceFormatGroupContainer;
