/* eslint-disable react/prop-types */
import React, { FunctionComponent, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import {
  CssBaseline,
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  withStyles,
} from '@material-ui/core';
import LoadingOverlayContainer from './containers/LoadingOverlayContainer';
import FooterPanel from './components/FooterPanel';
import RouterOutlet from './components/RouterOutlet';
import HeaderPanel from './components/HeaderPanel';
import AlertDialogContainer from './containers/AlertDialogContainer';
import ConfirmDialogContainer from './containers/ConfirmDialogContainer';
import NavigationMenuContainer from './containers/NavigationMenuContainer';

type StyleClass = 'root' | 'appBarSpacer' | 'content' | 'container';

export interface AppStateProps {
  isConfigLoaded: boolean;
  isLoggedIn: boolean;
  isFormatsLoaded: boolean;
  isMapsLoaded: boolean;
}

export interface AppDispatchProps {
  getConfig: () => void;
  getAccount: () => void;
  getFormats: () => void;
  getMaps: () => void;
}

export type AppProps = AppStateProps & AppDispatchProps & StyledComponentProps<StyleClass>;

const styles: StyleRulesCallback<Theme, AppProps, StyleClass> = (theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    flex: '1 1 auto',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});

const App: FunctionComponent<AppProps> = (props) => {
  if (!props.isConfigLoaded) {
    props.getConfig();
  } else if (!props.isFormatsLoaded) {
    props.getFormats();
  } else if (!props.isMapsLoaded) {
    props.getMaps();
  }

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <CssBaseline />
      <LoadingOverlayContainer />
      <AlertDialogContainer />
      <ConfirmDialogContainer />
      <div className={props.classes?.root}>
        <HeaderPanel
          isLoggedIn={props.isLoggedIn}
          isOpen={isMenuOpen}
          onMenuOpen={() => setIsMenuOpen(true)}
        />
        <NavigationMenuContainer isOpen={isMenuOpen} onMenuClose={() => setIsMenuOpen(false)} />
        <main className={props.classes?.content}>
          <div className={props.classes?.appBarSpacer} />
          <div className={props.classes?.container}>
            <RouterOutlet defaultRedirect={'/home'} />
          </div>
          <FooterPanel />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default withStyles(styles)(App);
