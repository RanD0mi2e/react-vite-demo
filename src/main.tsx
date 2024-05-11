import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import App from './App.tsx'
import {UserProvider} from './stores/user/contexts/UserContext.tsx'
import {RoutesProvider} from "@/stores/router/contexts/RoutesContext.tsx";
import {BrowserRouter} from "react-router-dom";
import { RootServicesProvider } from './providers/root-services-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RootServicesProvider>
            <UserProvider>
                <RoutesProvider>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </RoutesProvider>
            </UserProvider>
        </RootServicesProvider>
    </React.StrictMode>,
)
