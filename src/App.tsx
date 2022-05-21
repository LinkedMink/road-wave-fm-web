import {
  CssBaseline,
  PaletteType,
  StyledComponentProps,
  StyleRulesCallback,
  Theme,
  ThemeProvider,
  useMediaQuery,
  withStyles,
} from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import FooterPanel from './components/FooterPanel';
import HeaderPanel from './components/HeaderPanel';
import RouterOutlet from './components/RouterOutlet';
import AlertDialogContainer from './containers/AlertDialogContainer';
import AlertSnackbarContainer from './containers/AlertSnackbarContainer';
import ConfirmDialogContainer from './containers/ConfirmDialogContainer';
import LoadingOverlayContainer from './containers/LoadingOverlayContainer';
import NavigationMenuContainer from './containers/NavigationMenuContainer';

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
    flex: `1 1`,
    minHeight: `100vh`,
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
  const isDarkModePrefered = useMediaQuery('(prefers-color-scheme: dark)');

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [paletteType, setPaletteType] = React.useState<PaletteType>(
    isDarkModePrefered ? 'dark' : 'light',
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: paletteType,
        },
      }),
    [paletteType],
  );

  useEffect(() => {
    if (!props.isInitialized) {
      return props.initialize();
    }
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
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
            isDarkMode={paletteType === 'dark'}
            onDarkModeToggle={() => setPaletteType(paletteType === 'dark' ? 'light' : 'dark')}
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
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default withStyles(styles)(App);
