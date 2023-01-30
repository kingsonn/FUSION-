import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "../src/utils/store"
import App from "./App";
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initalState";
import reducer from "./context/reducer";

ReactDOM.render(
  <Router>
     <StateProvider initialState={initialState} reducer={reducer}>
    <Provider store={store}>
      <App />
    </Provider>
    </StateProvider>
  </Router>,
  document.getElementById("root")
);
