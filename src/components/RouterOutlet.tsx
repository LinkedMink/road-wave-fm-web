import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// import { Claim } from '../types/Account';
// import RouteAuthContainer from '../containers/RouteAuthContainer';
import LoginContainer from '../containers/pages/LoginContainer';
import LogoutContainer from '../containers/LogoutContainer';
import HomeContainer from '../containers/pages/HomeContainer';
// import SettingsContainer from '../containers/pages/SettingsContainer';
import AboutPage from './pages/AboutPage';
import MarkdownPage from './pages/MarkdownPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import SettingsPage from './pages/SettingsPage';

export interface RouterOutletOwnProps {
  defaultRedirect: string;
}

class RouterOutlet extends React.Component<RouterOutletOwnProps> {
  render = (): JSX.Element => (
    <Switch>
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path="/logout" component={LogoutContainer} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/document/:documentName" component={MarkdownPage} />
      <Route exact path="/unauthorized/:claims" component={UnauthorizedPage} />
      <Route exact path="/home" component={HomeContainer} />
      <Route exact path="/settings" component={SettingsPage} />
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
