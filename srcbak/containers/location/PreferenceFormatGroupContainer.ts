import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { formatSelect } from "../../actions/FormatAction";
import PreferenceFormatGroup, {
  PreferenceFormatGroupDispatchProps,
  PreferenceFormatGroupStateProps,
} from "../../components/location/PreferenceFormatGroup";
import { RootState } from "../../reducers/RootReducer";
import { AppThunkDispatch } from "../../store";

const mapStateToProps: MapStateToProps<
  PreferenceFormatGroupStateProps,
  Record<string, never>,
  RootState
> = (state: RootState) => {
  return {
    formats: state.format.list,
    selected: state.format.selected,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  PreferenceFormatGroupDispatchProps,
  Record<string, never>
> = (dispatch: AppThunkDispatch) => {
  return {
    selectFormats: (ids: string[]) => {
      dispatch(formatSelect(ids));
    },
  };
};

const PreferenceFormatGroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PreferenceFormatGroup);

export default PreferenceFormatGroupContainer;
