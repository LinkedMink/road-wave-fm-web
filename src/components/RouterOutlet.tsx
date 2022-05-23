import React, { FunctionComponent } from 'react';
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
  isAuthenticated: boolean;
}

const RouterOutlet: FunctionComponent<RouterOutletOwnProps> = (props) => {
  const authenticatedRoutes = [
    <Route key={0} exact path="/logout" component={LogoutContainer} />,
    <Route key={1} exact path="/home" component={HomeContainer} />,
    <Route key={2} exact path="/settings" component={SettingsPage} />,
  ];

  const unauthenticatedRoutes = [<Route key={0} exact path="/login" component={LoginContainer} />];

  return (
    <Switch>
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/document/:documentName" component={MarkdownPage} />
      <Route exact path="/unauthorized/:claims" component={UnauthorizedPage} />
      {props.isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}
      {/* <RouteAuthContainer
      requiredClaim={Claim.Settings}
      exact
      path="/account"
      component={SettingsContainer}
    /> */}
      <Redirect from="/" to={props.isAuthenticated ? '/home' : '/login'} />
    </Switch>
  );
};

export default RouterOutlet;
