import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App.tsx";
import { UserProvider } from "./stores/user/contexts/UserContext.tsx";
import { RoutesProvider } from "@/stores/router/contexts/RoutesContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { RootServicesProvider } from "./providers/root-services-provider.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootServicesProvider>
      <UserProvider>
        <I18nextProvider i18n={i18n}>
          <RoutesProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </RoutesProvider>
        </I18nextProvider>
      </UserProvider>
    </RootServicesProvider>
  </React.StrictMode>
);
