import React from "react";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import Routes from "./routes";
import history from "./services/history";

import { store, persistor } from "./store";

import { ThemeProvider } from "@material-ui/styles";
import { GlobalStyle, theme } from "./components/styles";

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={4000} />
        </Router>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
