import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { App } from './App.tsx'
import { UserProvider } from './stores/user/contexts/UserContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
