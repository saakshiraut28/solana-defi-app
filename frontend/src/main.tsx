/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Router } from "react-router-dom";
import SingleCoin from "./components/singleCoin.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Route element={<SingleCoin />} path="/coin/coinId" />
    </BrowserRouter>
  </StrictMode>
);
