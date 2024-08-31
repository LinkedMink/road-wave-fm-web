import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Config } from "./environments/Config";
import { App } from "./components/App";
import { ConfigContext } from "./environments/ConfigContext";
import { SessionProvider } from "./components/shared/SessionProvider";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("A HTML container element with id 'root' must exist");
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ConfigContext.Provider value={Config}>
      <SessionProvider>
        <App />
      </SessionProvider>
    </ConfigContext.Provider>
  </React.StrictMode>
);

if (Config.ENABLE_WEB_VITALS) {
  void import("web-vitals").then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
    onCLS(console.log);
    onFCP(console.log);
    onINP(console.log);
    onLCP(console.log);
    onTTFB(console.log);
  });
}
