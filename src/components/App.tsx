import { FunctionComponent, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutContainer from "../containers/layout/LayoutContainer";
import LogoutContainer from "../containers/LogoutContainer";
import HomeContainer from "../containers/pages/HomeContainer";
import LoginContainer from "../containers/pages/LoginContainer";
import AboutPage from "./pages/AboutPage";
import MarkdownPage from "./pages/MarkdownPage";
import SettingsPage from "./pages/SettingsPage";

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

const commontRoutes = [
  <Route
    key={0}
    path="about"
    element={<AboutPage />}
  />,
  <Route
    key={1}
    path="document/:documentName"
    element={<MarkdownPage />}
  />,
];

const authenticatedRoutes = [
  <Route
    key={2}
    index
    element={<HomeContainer />}
  />,
  <Route
    key={3}
    path="logout"
    element={<LogoutContainer />}
  />,
  <Route
    key={4}
    path="settings"
    element={<SettingsPage />}
  />,
  <Route
    key={5}
    path="*"
    element={<HomeContainer />}
  />,
];

const unauthenticatedRoutes = [
  <Route
    key={2}
    index
    element={<LoginContainer />}
  />,
  <Route
    key={3}
    path="*"
    element={<LoginContainer />}
  />,
];

const App: FunctionComponent<AppProps> = props => {
  useEffect(() => {
    if (props.isConfigLoaded && !props.isDependenciesLoaded) {
      return props.loadDependencies();
    }
    if (props.isInitialized) {
      return props.completeInit();
    }
  });

  const allRoutes = [
    ...commontRoutes,
    ...(props.isLoggedIn ? authenticatedRoutes : unauthenticatedRoutes),
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LayoutContainer />}
        >
          {allRoutes}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
