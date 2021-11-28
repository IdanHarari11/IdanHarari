import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "AppRouter";
import FavoritesProvider from "context/FavoriteCTX";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <FavoritesProvider>
    <AppRouter />
    <ToastContainer theme="theme" />
  </FavoritesProvider>,
  document.querySelector("#root")
);
