import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Registering (rather than unregister()) opts the app into offline support
// and app-shell caching — see src/service-worker.js for the strategy.
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    // The SW calls self.skipWaiting() itself, so this mostly just makes sure
    // the page reloads once so people see the latest build right away.
    if (registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  },
});
