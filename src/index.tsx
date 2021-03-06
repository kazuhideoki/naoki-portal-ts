import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { ThemeProvider } from "./modules/ThemeContext";
import { StoreContextProvider } from "./modules/Store";
import * as serviceWorker from "./serviceWorker";

render(
  <ThemeProvider>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

// serviceWorker.unregister();
serviceWorker.register();
