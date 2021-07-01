import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import { Claim } from '../types/Account';
// import RouteAuthContainer from '../containers/RouteAuthContainer';
import LoginContainer from '../containers/pages/LoginContainer';
import LogoutContainer from '../containers/LogoutContainer';
import PasswordResetContainer from '../containers/pages/PasswordResetContainer';
import SetPasswordContainer from '../containers/pages/SetPasswordContainer';
import RegisterContainer from '../containers/pages/RegisterContainer';
import HomeContainer from '../containers/pages/HomeContainer';
// import SettingsContainer from '../containers/pages/SettingsContainer';
import AboutScreen from './pages/AboutPage';
import UnauthorizedScreen from './pages/UnauthorizedPage';

export interface RouterOutletOwnProps {
  defaultRedirect: string;
}

class RouterOutlet extends React.Component<RouterOutletOwnProps> {
  render = (): JSX.Element => (
    <Switch>
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/logout" component={LogoutContainer} />
      <Route exact path="/register" component={RegisterContainer} />
      <Route exact path="/password-reset" component={PasswordResetContainer} />
      <Route exact path="/set-password/:email/:token" component={SetPasswordContainer} />
      <Route exact path="/about" component={AboutScreen} />
      <Route exact path="/unauthorized/:claims" component={UnauthorizedScreen} />
      <Route exact path="/home" component={HomeContainer} />
      {/* <RouteAuthContainer
        requiredClaim={Claim.Settings}
        exact
        path="/account"
        component={SettingsContainer}
      /> */}
      <Redirect from="/" to={this.props.defaultRedirect} />
    </Switch>
  );
}

export default RouterOutlet;
