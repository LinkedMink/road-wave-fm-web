import { MapStateToProps, connect } from "react-redux";
import Layout, { LayoutStateProps } from "../../components/layout/Layout";
import { RootState } from "../../reducers/RootReducer";

const mapStateToProps: MapStateToProps<LayoutStateProps, Record<string, never>, RootState> = (
  state: RootState
) => {
  return {
    isLoggedIn: state.session.jwtToken ? true : false,
  };
};

const LayoutContainer = connect(mapStateToProps)(Layout);

export default LayoutContainer;
