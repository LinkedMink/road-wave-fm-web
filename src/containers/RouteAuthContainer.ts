import { connect, MapStateToProps } from 'react-redux';

import RouteAuth, { RouteAuthStateProps, RouteAuthOwnProps } from '../components/RouteAuth';
import { RootState } from '../reducers/RootReducer';

const mapStateToProps: MapStateToProps<RouteAuthStateProps, RouteAuthOwnProps, RootState> = (
  state: RootState,
) => {
  return {
    isLoggedIn: state.session.jwtToken ? true : false,
    claims: state.session.decodedToken?.claims,
  };
};

const RouteAuthContainer = connect(mapStateToProps)(RouteAuth);

export default RouteAuthContainer;
