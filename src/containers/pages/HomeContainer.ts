import { connect, MapDispatchToPropsFunction, MapStateToProps } from "react-redux";
import { RootState } from "../../reducers/RootReducer";
import HomePage from "../../components/pages/HomePage";
import { AppThunkDispatch } from "../../store";

const mapStateToProps: MapStateToProps<unknown, unknown, RootState> = (state: RootState) => {
  return {
    mapsApiKey: state.config.googleMapsApiKey,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<unknown, unknown> = (
  _dispatch: AppThunkDispatch
) => {
  return {};
};

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(HomePage);

export default HomeContainer;
