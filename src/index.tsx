import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { initialize } from "./actions/InitializeAction";
import { Config } from "./config";
import AppContainer from "./containers/AppContainer";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import store from "./store";

initialize(store.dispatch);

const bodyElement = document.getElementsByTagName("body").item(0);
if (!bodyElement) {
  throw new Error("A body HTML element must exist");
}

const rootElement = document.createElement("div");
bodyElement.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
if (Config.ENABLE_SERVICE_WORKER) {
  serviceWorkerRegistration.register();
} else {
  serviceWorkerRegistration.unregister();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(Config.ENABLE_WEB_VITALS ? console.log : undefined);
