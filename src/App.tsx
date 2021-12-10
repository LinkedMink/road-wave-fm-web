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
import { useEffect } from 'react';
import AlertSnackbarContainer from './containers/AlertSnackbarContainer';

type StyleClass = 'root' | 'appBarSpacer' | 'content' | 'container';

export interface AppStateProps {
  isLoggedIn: boolean;
  isInitialized: boolean;
}

export interface AppDispatchProps {
  initialize(): void;
}

export type AppProps = AppStateProps & AppDispatchProps & StyledComponentProps<StyleClass>;

const styles: StyleRulesCallback<Theme, AppProps, StyleClass> = (theme: Theme) => ({
  root: {
    display: 'flex',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: `1 1 calc(100vh - ${theme.spacing(4)}px)`,
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  content: {
    display: 'flex',
    flex: '1 1 auto',
    alignItems: 'stretch',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  },
});

const App: FunctionComponent<AppProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!props.isInitialized) {
      props.initialize();
    }
  });

  return (
    <BrowserRouter>
      <CssBaseline />
      <LoadingOverlayContainer />
      <AlertDialogContainer />
      <AlertSnackbarContainer />
      <ConfirmDialogContainer />
      <div className={props.classes?.root}>
        <HeaderPanel
          isLoggedIn={props.isLoggedIn}
          isOpen={isMenuOpen}
          onMenuOpen={() => setIsMenuOpen(true)}
        />
        <NavigationMenuContainer isOpen={isMenuOpen} onMenuClose={() => setIsMenuOpen(false)} />
        <div className={props.classes?.container}>
          <div className={props.classes?.appBarSpacer} />
          <main className={props.classes?.content}>
            <RouterOutlet defaultRedirect={'/home'} />
          </main>
          <FooterPanel />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default withStyles(styles)(App);
