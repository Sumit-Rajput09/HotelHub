import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import './styles/global.css'
import { BrowserRouter } from "react-router-dom";
import { HostelProvider } from "@context/HostelContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HostelProvider>
        <App />
      </HostelProvider>
    </BrowserRouter>
  </React.StrictMode>
);