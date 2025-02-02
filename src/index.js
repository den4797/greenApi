import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import store from "src/slices/index";

import "./index.scss";
import "normalize.css";
import App from "./components/App.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider>
    <Provider store={store}>
      <HashRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HashRouter>
    </Provider>
  </CookiesProvider>
);
