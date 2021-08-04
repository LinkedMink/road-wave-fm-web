import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { Dispatch } from 'redux';
import PreferenceCard, {
  PreferenceCardDispatchProps,
  PreferenceCardStateProps,
} from '../../components/location/PreferenceCard';
import { RootState } from '../../reducers/RootReducer';

const mapStateToProps: MapStateToProps<
  PreferenceCardStateProps,
  Record<string, never>,
  RootState
> = (state: RootState) => {
  return {
    formats: state.format.list,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  PreferenceCardDispatchProps,
  Record<string, never>
> = (_dispatch: Dispatch) => {
  return {
    selectFormats: (_ids: string[]) => {
      // TODO
    },
  };
};

const PreferenceCardContainer = connect(mapStateToProps, mapDispatchToProps)(PreferenceCard);

export default PreferenceCardContainer;
