import React from "react";
import ReactDOM from "react-dom/client";
import { AppRouter } from "./router/AppRouter";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
