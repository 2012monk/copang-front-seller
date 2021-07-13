import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouteMain from "./RouteMain";

import Reducer from "./_reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import GlobalStyles from "./globalStyle.js";
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);
//App.js 수정 다시함 또다시함
const App = () => {
  return (
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <Router>
        <RouteMain />
      </Router>
    </Provider>
  );
};

export default App;
