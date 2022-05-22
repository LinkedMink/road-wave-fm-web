import { Box, CssBaseline, PaletteMode, ThemeProvider, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AlertDialogContainer from '../containers/AlertDialogContainer';
import AlertSnackbarContainer from '../containers/AlertSnackbarContainer';
import ConfirmDialogContainer from '../containers/ConfirmDialogContainer';
import LoadingOverlayContainer from '../containers/LoadingOverlayContainer';
import NavigationMenuContainer from '../containers/NavigationMenuContainer';
import FooterPanel from './FooterPanel';
import HeaderPanel from './HeaderPanel';
import RouterOutlet from './RouterOutlet';

export interface AppStateProps {
  isLoggedIn: boolean;
  isConfigLoaded: boolean;
  isDependenciesLoaded: boolean;
  isInitialized: boolean;
}

export interface AppDispatchProps {
  loadDependencies(): void;
  completeInit(): void;
}

export type AppProps = AppStateProps & AppDispatchProps;

const App: FunctionComponent<AppProps> = (props) => {
  const isDarkModePrefered = useMediaQuery('(prefers-color-scheme: dark)');

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [paletteType, setPaletteType] = React.useState<PaletteMode>(
    isDarkModePrefered ? 'dark' : 'light',
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteType,
        },
      }),
    [paletteType],
  );

  useEffect(() => {
    if (props.isConfigLoaded && !props.isDependenciesLoaded) {
      return props.loadDependencies();
    }
    if (props.isInitialized) {
      return props.completeInit();
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
        <Box
          sx={{
            display: 'flex',
            overflow: 'auto',
          }}
        >
          <HeaderPanel
            isLoggedIn={props.isLoggedIn}
            isOpen={isMenuOpen}
            onMenuOpen={() => setIsMenuOpen(true)}
            isDarkMode={paletteType === 'dark'}
            onDarkModeToggle={() => setPaletteType(paletteType === 'dark' ? 'light' : 'dark')}
          />
          <NavigationMenuContainer isOpen={isMenuOpen} onMenuClose={() => setIsMenuOpen(false)} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flex: `1 1`,
              minHeight: `100vh`,
              alignItems: 'stretch',
              overflow: 'hidden',
            }}
          >
            <Box sx={theme.mixins.toolbar} />
            <Box
              sx={{
                display: 'flex',
                flex: '1 1 auto',
                alignItems: 'stretch',
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2),
                [theme.breakpoints.up('md')]: {
                  paddingTop: theme.spacing(4),
                  paddingBottom: theme.spacing(4),
                },
              }}
            >
              <RouterOutlet defaultRedirect={'/home'} />
            </Box>
            <FooterPanel />
          </Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
